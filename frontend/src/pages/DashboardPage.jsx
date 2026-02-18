function DashboardPage() {
  return (
    <div className="page">
      <h1>Fashion Shop Analytics Dashboard</h1>
      <p className="page-subtitle">
        Use the navigation on the left to add, update, and analyse fashion products
        stored in MongoDB through your REST API.
      </p>
      <ul className="page-subtitle">
        <li>Add and maintain products in the FashionShopData collection.</li>
        <li>View seasonal totals for units sold, returns, and revenue.</li>
        <li>Explore top selling products and rating-based insights.</li>
      </ul>
    </div>
  )
}

export default DashboardPage


