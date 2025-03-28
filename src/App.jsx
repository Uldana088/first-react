import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from "react-router-dom";
import "./styles.css";

const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Network response was not ok");
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredProducts = products
    .filter(product => 
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(product => 
      category ? product.category === category : true
    )
    .sort((a, b) => 
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <h1 className="page-title">Product Catalog</h1>
      
      <div className="filter-controls">
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
        
        <div className="sort-buttons">
          <button
            className={`sort-btn ${sortOrder === "asc" ? "active" : ""}`}
            onClick={() => setSortOrder("asc")}
          >
            Price: Low to High
          </button>
          <button
            className={`sort-btn ${sortOrder === "desc" ? "active" : ""}`}
            onClick={() => setSortOrder("desc")}
          >
            Price: High to Low
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-products">No products found</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
              <img src={product.image} alt={product.title} className="product-image" />
              <div className="product-info">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <p className="product-category">{product.category}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; Back
      </button>
      
      <div className="product-detail-container">
        <div className="product-image-wrapper">
          <img src={product.image} alt={product.title} className="detail-image" />
        </div>
        
        <div className="product-details">
          <h1 className="detail-title">{product.title}</h1>
          <div className="product-meta">
            <span className="detail-price">${product.price.toFixed(2)}</span>
            <span className="detail-category">{product.category}</span>
            <div className="detail-rating">
              Rating: {product.rating.rate} ({product.rating.count} reviews)
            </div>
          </div>
          <p className="detail-description">{product.description}</p>
          <button className="add-to-cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
