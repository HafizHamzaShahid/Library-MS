const express = require("express");
const router = express.Router();
const { FashionProduct } = require("../fashionDb");

// Helper to safely parse numbers
const toNumber = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
};

// 1.5 - Add a product (all 9 fields)
router.post("/add-product", async (req, res) => {
  try {
    const {
      productCategory,
      productName,
      unitsSold,
      returns,
      revenue,
      customerRating,
      stockLevel,
      season,
      trendScore,
    } = req.body;

    // Basic validation
    if (
      !productCategory ||
      !productName ||
      unitsSold === undefined ||
      returns === undefined ||
      revenue === undefined ||
      customerRating === undefined ||
      stockLevel === undefined ||
      !season ||
      trendScore === undefined
    ) {
      return res
        .status(400)
        .json({ message: "All 9 fields are required to add a product." });
    }

    const doc = await FashionProduct.create({
      productCategory: productCategory.trim(),
      productName: productName.trim(),
      unitsSold: toNumber(unitsSold),
      returns: toNumber(returns),
      revenue: toNumber(revenue),
      customerRating: toNumber(customerRating),
      stockLevel: toNumber(stockLevel),
      season: season.trim(),
      trendScore: toNumber(trendScore),
    });

    res.status(201).json(doc);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Failed to add product", error: err.message });
  }
});

// 1.6 - Update a single record for a given Product Name
router.post("/update-product", async (req, res) => {
  try {
    const {
      productName,
      productCategory,
      unitsSold,
      returns,
      revenue,
      customerRating,
      stockLevel,
      season,
      trendScore,
    } = req.body;

    if (!productName) {
      return res.status(400).json({ message: "productName is required to update." });
    }

    const update = {};
    if (productCategory !== undefined) update.productCategory = productCategory.trim();
    if (unitsSold !== undefined) update.unitsSold = toNumber(unitsSold);
    if (returns !== undefined) update.returns = toNumber(returns);
    if (revenue !== undefined) update.revenue = toNumber(revenue);
    if (customerRating !== undefined)
      update.customerRating = toNumber(customerRating);
    if (stockLevel !== undefined) update.stockLevel = toNumber(stockLevel);
    if (season !== undefined) update.season = season.trim();
    if (trendScore !== undefined) update.trendScore = toNumber(trendScore);

    const doc = await FashionProduct.findOneAndUpdate(
      { productName: productName.trim() },
      update,
      { new: true }
    );

    if (!doc) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(doc);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Failed to update product", error: err.message });
  }
});

// 1.7 - Delete a record for a given Product Name
router.post("/delete-product", async (req, res) => {
  try {
    const { productName } = req.body;

    if (!productName) {
      return res.status(400).json({ message: "productName is required to delete." });
    }

    const result = await FashionProduct.deleteOne({
      productName: productName.trim(),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
});

// 1.8 - Totals for a given Season
router.get("/season-totals", async (req, res) => {
  try {
    const { season } = req.query;
    if (!season) {
      return res.status(400).json({ message: "season query parameter is required." });
    }

    const [result] = await FashionProduct.aggregate([
      { $match: { season: season.trim() } },
      {
        $group: {
          _id: "$season",
          totalUnitsSold: { $sum: "$unitsSold" },
          totalReturns: { $sum: "$returns" },
          totalRevenue: { $sum: "$revenue" },
        },
      },
    ]);

    if (!result) {
      return res.status(404).json({ message: "No data found for that season." });
    }

    res.json({
      season: result._id,
      totalUnitsSold: result.totalUnitsSold,
      totalReturns: result.totalReturns,
      totalRevenue: result.totalRevenue,
    });
  } catch (err) {
    console.error("Error getting season totals:", err);
    res
      .status(500)
      .json({ message: "Failed to get season totals", error: err.message });
  }
});

// 1.9 - First 10 records where Units Sold > value for a given season
router.get("/top-units", async (req, res) => {
  try {
    const { season, minUnits } = req.query;
    if (!season || minUnits === undefined) {
      return res
        .status(400)
        .json({ message: "season and minUnits query parameters are required." });
    }

    const min = toNumber(minUnits);
    if (min === null) {
      return res.status(400).json({ message: "minUnits must be a valid number." });
    }

    const docs = await FashionProduct.find({
      season: season.trim(),
      unitsSold: { $gt: min },
    })
      .sort({ unitsSold: -1 })
      .limit(10)
      .lean();

    res.json(docs);
  } catch (err) {
    console.error("Error getting top units:", err);
    res
      .status(500)
      .json({ message: "Failed to get records", error: err.message });
  }
});

// 1.10 - All products where average Customer Rating for a given Season meets a condition
router.get("/rating-condition", async (req, res) => {
  try {
    const { season, operator = "gte", value } = req.query;
    if (!season || value === undefined) {
      return res.status(400).json({
        message: "season and value query parameters are required.",
      });
    }

    const threshold = toNumber(value);
    if (threshold === null) {
      return res.status(400).json({ message: "value must be a valid number." });
    }

    const [agg] = await FashionProduct.aggregate([
      { $match: { season: season.trim() } },
      {
        $group: {
          _id: "$season",
          avgCustomerRating: { $avg: "$customerRating" },
          products: { $push: "$$ROOT" },
        },
      },
    ]);

    if (!agg) {
      return res.status(404).json({ message: "No data found for that season." });
    }

    const avg = agg.avgCustomerRating;
    let conditionMet = false;
    switch (operator) {
      case "gt":
        conditionMet = avg > threshold;
        break;
      case "lte":
        conditionMet = avg <= threshold;
        break;
      case "lt":
        conditionMet = avg < threshold;
        break;
      case "gte":
      default:
        conditionMet = avg >= threshold;
        break;
    }

    if (!conditionMet) {
      return res.json({
        season: agg._id,
        averageCustomerRating: avg,
        conditionMet: false,
        products: [],
      });
    }

    res.json({
      season: agg._id,
      averageCustomerRating: avg,
      conditionMet: true,
      products: agg.products,
    });
  } catch (err) {
    console.error("Error getting rating condition:", err);
    res.status(500).json({
      message: "Failed to get rating condition data",
      error: err.message,
    });
  }
});

module.exports = router;


