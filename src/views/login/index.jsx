import React, { useState } from 'react';
import './style.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('提交的数据:', formData);
  };

  return (
    <div className="login-container">
      <div className="background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="login-box">
        <div className="login-header">
          <h2>{isLogin ? '登录' : '注册'}</h2>
          <div className="toggle-container">
            <button
              className={`toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              登录
            </button>
            <button
              className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              注册
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="text"
              name="username"
              required
            />
            <label>用户名</label>
            <i></i>
          </div>
          {!isLogin && (
            <div className="form-group">
              <input
                type="email"
                name="email"
                required
              />
              <label>电子邮箱</label>
              <i></i>
            </div>
          )}
          <div className="form-group">
            <input
              type="password"
              name="password"
              required
            />
            <label>密码</label>
            <i></i>
          </div>
          <button type="submit" className="submit-btn">
            {isLogin ? '登录' : '注册'}
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 