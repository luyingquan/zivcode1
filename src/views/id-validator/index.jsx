import React, { useState } from 'react';
import { validateIdCard } from '../../utils/idCardValidator';
import './style.css';

const IdValidator = () => {
  const [idCard, setIdCard] = useState('');
  const [validationResult, setValidationResult] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showRegex, setShowRegex] = useState(false);

  const handleValidate = (e) => {
    e.preventDefault();
    setIsAnimating(true);
    
    setTimeout(() => {
      const result = validateIdCard(idCard);
      setValidationResult(result);
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="id-validator-container">
      <div className="validator-box">
        <h1>身份证号验证</h1>
        <form onSubmit={handleValidate}>
          <div className="input-group">
            <input
              type="text"
              value={idCard}
              onChange={(e) => setIdCard(e.target.value)}
              placeholder="请输入18位身份证号"
              maxLength="18"
            />
            <button type="submit" disabled={isAnimating}>
              {isAnimating ? '验证中...' : '验证'}
            </button>
          </div>
        </form>

        {validationResult && (
          <div className={`result-box ${validationResult.isValid ? 'valid' : 'invalid'}`}>
            <div className="result-header">
              <span className="status-icon">
                {validationResult.isValid ? '✓' : '✕'}
              </span>
              <h3>{validationResult.message}</h3>
            </div>

            {validationResult.isValid && (
              <div className="info-grid">
                <div className="info-item">
                  <label>性别</label>
                  <span>{validationResult.info.gender}</span>
                </div>
                <div className="info-item">
                  <label>出生日期</label>
                  <span>{validationResult.info.birth}</span>
                </div>
                <div className="info-item">
                  <label>年龄</label>
                  <span>{validationResult.info.age}岁</span>
                </div>
                <div className="info-item">
                  <label>省份</label>
                  <span>{validationResult.info.province}</span>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="validator-tips">
          <h3>验证说明：</h3>
          <ul>
            <li>身份证号必须是18位</li>
            <li>前17位必须是数字，最后一位可以是数字或X</li>
            <li>出生日期必须是有效的日期</li>
            <li>省份代码必须是有效的行政区划代码</li>
            <li>最后一位校验码必须符合GB11643-1999标准</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IdValidator; 