const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const { connectFashionDb, FashionProduct } = require("../fashionDb");

// Usage:
//   node scripts/importFashionCsv.js path/to/fashion_shop.csv
// If no path is provided, it will look for ../fashion_shop.csv

const csvFilePath =
  process.argv[2] || path.join(__dirname, "..", "fashion_shop.csv");

const parseNumber = (value) => {
  const n = Number(
    typeof value === "string" ? value.replace(/,/g, "").trim() : value
  );
  return Number.isFinite(n) ? n : 0;
};

async function main() {
  try {
    await connectFashionDb();
    console.log("Connected to MongoDB via Mongoose");
    console.log(`Reading CSV from: ${csvFilePath}`);

    if (!fs.existsSync(csvFilePath)) {
      console.error(`CSV file not found at: ${csvFilePath}`);
      process.exit(1);
    }

    const docs = [];

    await new Promise((resolve, reject) => {
      fs.createReadStream(csvFilePath)
        .pipe(csv())
        .on("data", (row) => {
          // Assumes CSV headers match the coursework:
          // Product Category, Product Name, Units Sold, Returns, Revenue,
          // Customer Rating, Stock Level, Season, Trend Score
          docs.push({
            productCategory: String(row["Product Category"] || "").trim(),
            productName: String(row["Product Name"] || "").trim(),
            unitsSold: parseNumber(row["Units Sold"]),
            returns: parseNumber(row["Returns"]),
            revenue: parseNumber(row["Revenue"]),
            customerRating: parseNumber(row["Customer Rating"]),
            stockLevel: parseNumber(row["Stock Level"]),
            season: String(row["Season"] || "").trim(),
            trendScore: parseNumber(row["Trend Score"]),
          });
        })
        .on("end", () => {
          console.log(`Finished reading CSV. Rows found: ${docs.length}`);
          resolve();
        })
        .on("error", (err) => {
          reject(err);
        });
    });

    if (docs.length === 0) {
      console.error("No rows found in CSV. Nothing to import.");
      process.exit(1);
    }

    // Best-effort: drop any legacy unique index on productName so duplicates are allowed
    try {
      await FashionProduct.collection.dropIndex("productName_1");
      console.log('Dropped index "productName_1" on FashionShopData.');
    } catch (indexErr) {
      if (indexErr.code === 27) {
        // Index not found, safe to ignore
        console.log('Index "productName_1" not found (nothing to drop).');
      } else {
        console.warn("Could not drop productName_1 index:", indexErr.message);
      }
    }

    // Optional: clear existing data so you can re-import easily
    await FashionProduct.deleteMany({});
    console.log("Cleared existing FashionShopData collection");

    // Use the underlying MongoDB collection to bypass Mongoose validation
    // so that all CSV rows are imported, even if some fields are missing / dirty.
    let insertedCount = 0;
    try {
      const result = await FashionProduct.collection.insertMany(docs, {
        ordered: false,
      });
      insertedCount = result.insertedCount || 0;
    } catch (err) {
      // With ordered:false, bulk write errors may still be thrown,
      // but partial inserts will have been committed.
      if (err.result && err.result.result && err.result.result.nInserted != null) {
        insertedCount = err.result.result.nInserted;
      } else if (err.insertedDocs) {
        insertedCount = err.insertedDocs.length;
      } else {
        throw err;
      }
      console.warn("Import completed with some row errors:", err.message);
    }

    console.log(
      `Imported ${insertedCount} documents into FashionShopData out of ${docs.length} CSV rows.`
    );

    process.exit(0);
  } catch (err) {
    console.error("Error importing CSV:", err);
    process.exit(1);
  }
}

main();


