import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Search } from 'react-feather';
import './style.css';

// 模拟商品数据
const MOCK_PRODUCTS = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `iPhone ${index + 1} Pro Max`,
  price: Math.floor(Math.random() * 2000) + 3000,
  image: `https://picsum.photos/400/400?random=${index}`,
  category: ['手机', '平板', '笔记本', '配件'][Math.floor(Math.random() * 4)],
  description: '最新一代智能手机，搭载强大的处理器和专业的相机系统。',
  specs: {
    screen: '6.7英寸 OLED',
    cpu: 'A17 Pro',
    camera: '48MP 主摄',
    battery: '4500mAh'
  },
  stock: Math.floor(Math.random() * 100) + 1
}));

const Products = () => {
  const [products] = useState(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const categories = ['全部', ...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const addToCart = (product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="products-page">
      <header className="products-header">
        <div className="header-content">
          <h1>商品展示</h1>
          <div className="header-right">
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="搜索商品..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Link to="/cart" className="cart-icon">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </Link>
          </div>
        </div>
        <div className="categories">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </header>

      <div className="products-grid">
        {currentProducts.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <button className="favorite-btn">
                <Heart size={20} />
              </button>
            </div>
            <div className="product-info">
              <Link to={`/product/${product.id}`} className="product-name">
                <h3>{product.name}</h3>
              </Link>
              <p className="product-category">{product.category}</p>
              <p className="product-price">¥{product.price.toLocaleString()}</p>
              <p className="product-stock">库存: {product.stock}件</p>
              <div className="product-actions">
                <Link to={`/product/${product.id}`} className="view-details">
                  查看详情
                </Link>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart(product)}
                >
                  加入购物车
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          上一页
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          下一页
        </button>
      </div>
    </div>
  );
};

export default Products; 