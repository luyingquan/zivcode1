import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft } from 'react-feather';
import './style.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // 模拟获取商品详情
  const product = {
    id: parseInt(id),
    name: `iPhone ${id} Pro Max`,
    price: 8999,
    images: [
      `https://picsum.photos/800/600?random=${id}`,
      `https://picsum.photos/800/600?random=${id + 1}`,
      `https://picsum.photos/800/600?random=${id + 2}`,
    ],
    category: '手机',
    description: '最新一代智能手机，搭载强大的处理器和专业的相机系统。',
    specs: {
      screen: '6.7英寸 OLED',
      cpu: 'A17 Pro',
      camera: '48MP 主摄',
      battery: '4500mAh'
    },
    stock: 50,
    reviews: [
      { id: 1, user: '用户1', rating: 5, comment: '非常好用的手机！' },
      { id: 2, user: '用户2', rating: 4, comment: '性能很强，但价格偏高。' },
    ]
  };

  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const handleQuantityChange = (delta) => {
    setQuantity(prev => Math.max(1, Math.min(prev + delta, product.stock)));
  };

  const handleAddToCart = () => {
    // 这里添加购物车逻辑
    console.log(`添加到购物车：${product.name}，数量：${quantity}`);
  };

  const handleBuyNow = () => {
    // 这里添加立即购买逻辑
    console.log(`立即购买：${product.name}，数量：${quantity}`);
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          返回
        </button>
      </div>

      <div className="product-detail-content">
        <div className="product-gallery">
          <div className="main-image">
            <img src={selectedImage} alt={product.name} />
          </div>
          <div className="thumbnail-list">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${selectedImage === image ? 'active' : ''}`}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt={`${product.name} - ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="category">{product.category}</p>
          <p className="price">¥{product.price.toLocaleString()}</p>
          <div className="stock-info">库存：{product.stock}件</div>

          <div className="quantity-selector">
            <span>数量：</span>
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <input type="number" value={quantity} readOnly />
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart" onClick={handleAddToCart}>
              <ShoppingCart size={20} />
              加入购物车
            </button>
            <button className="buy-now" onClick={handleBuyNow}>
              立即购买
            </button>
            <button className="favorite">
              <Heart size={20} />
            </button>
          </div>

          <div className="product-tabs">
            <div className="tab-buttons">
              <button
                className={activeTab === 'description' ? 'active' : ''}
                onClick={() => setActiveTab('description')}
              >
                商品描述
              </button>
              <button
                className={activeTab === 'specs' ? 'active' : ''}
                onClick={() => setActiveTab('specs')}
              >
                规格参数
              </button>
              <button
                className={activeTab === 'reviews' ? 'active' : ''}
                onClick={() => setActiveTab('reviews')}
              >
                用户评价
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'description' && (
                <div className="description-tab">
                  <p>{product.description}</p>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="specs-tab">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="spec-item">
                      <span className="spec-label">{key}：</span>
                      <span className="spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="reviews-tab">
                  {product.reviews.map(review => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <span className="review-user">{review.user}</span>
                        <div className="review-rating">
                          {'★'.repeat(review.rating)}
                          {'☆'.repeat(5 - review.rating)}
                        </div>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 