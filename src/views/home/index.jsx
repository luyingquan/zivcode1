import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('年度招标');
  
  // 公告数据
  const announcements = [
    { id: 1, title: '【资源】沙钢非常规产品资源情况', date: '11-23', type: '资源' },
    { id: 2, title: '【加工】轧花公司加工用板切头板', date: '11-23', type: '加工' },
    { id: 3, title: '玖隆钢铁物流有限公司仓储库存钢', date: '10-31' },
    { id: 4, title: '张家港浦项不锈钢新供应商招募', date: '09-05' }
  ];

  // 招标数据
  const tenders = [
    { id: 1, title: '抚顺特钢销售公司废旧物资、副产品' },
    { id: 2, title: '安阳永兴废旧物资2024年11月' },
    { id: 3, title: '东北特殊钢集团股份有限公司2023' },
    { id: 4, title: '抚顺特钢销售公司废旧物资、副产品' }
  ];

  return (
    <div className="e9656-container">
      {/* 顶部工具栏 */}
      <div className="top-toolbar">
        <div className="toolbar-content">
          <div className="left-links">
            <a href="/">玖隆在线</a>
            <a href="/user">我的玖隆</a>
            <a href="/trading">交易大厅</a>
            <a href="/cart">购物车</a>
            <a href="/supplier">供应商中心</a>
            <a href="/help">帮助中心</a>
          </div>
          <div className="right-info">
            <img src="/images/phone-icon.png" alt="电话" className="phone-icon" />
            <span>客服电话：400-828-9656</span>
          </div>
        </div>
      </div>

      {/* 主导航 */}
      <header className="main-header">
        <div className="header-content">
          <div className="logo">
            <img src="/images/logo.png" alt="玖隆在线" />
          </div>
          <nav className="main-nav">
            <a href="/" className="active">
              <img src="/images/icons/home.png" alt="" />
              首页
            </a>
            <a href="/trading">
              <img src="/images/icons/trading.png" alt="" />
              交易大厅
            </a>
            <a href="/purchase">
              <img src="/images/icons/purchase.png" alt="" />
              采购中心
            </a>
            <a href="/processing">
              <img src="/images/icons/processing.png" alt="" />
              加工中心
            </a>
            <a href="/storage">
              <img src="/images/icons/storage.png" alt="" />
              仓储中心
            </a>
            <a href="/logistics">
              <img src="/images/icons/logistics.png" alt="" />
              物流中心
            </a>
            <a href="/mall">
              <img src="/images/icons/mall.png" alt="" />
              钢材商城
            </a>
          </nav>
        </div>
      </header>

      {/* 主要内容区 */}
      <main className="main-content">
        {/* 指数展示 */}
        <div className="indices-banner">
          <div className="index-item">
            <span className="index-label">玖隆在线结算指数</span>
            <span className="index-value">4526.39</span>
            <span className="index-change up">+12.5</span>
          </div>
          <div className="index-item">
            <span className="index-label">钢厂订货价格指数</span>
            <span className="index-value">121.58</span>
            <span className="index-change down">-0.8</span>
          </div>
        </div>

        <div className="content-grid">
          {/* 左侧面板 */}
          <div className="left-panel">
            {/* 平台公告 */}
            <section className="platform-notice">
              <div className="section-header">
                <h2>平台公告</h2>
                <a href="/notices" className="more-link">更多 &gt;</a>
              </div>
              <ul className="notice-list">
                {announcements.map(notice => (
                  <li key={notice.id}>
                    <a href={`/notice/${notice.id}`}>
                      <span className="notice-title">{notice.title}</span>
                      <span className="notice-date">{notice.date}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {/* 询比价计划公示 */}
            <section className="tender-notice">
              <div className="section-header">
                <h2>询比价计划公示</h2>
                <div className="tab-switch">
                  <button 
                    className={activeTab === '年度招标' ? 'active' : ''}
                    onClick={() => setActiveTab('年度招标')}
                  >
                    年度招标
                  </button>
                  <button 
                    className={activeTab === '月度招标' ? 'active' : ''}
                    onClick={() => setActiveTab('月度招标')}
                  >
                    月度招标
                  </button>
                </div>
              </div>
              <ul className="tender-list">
                {tenders.map(tender => (
                  <li key={tender.id}>
                    <a href={`/tender/${tender.id}`}>{tender.title}</a>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* 右侧产品展示 */}
          <div className="right-panel">
            <h2 className="product-title">产品资源</h2>
            <div className="product-grid">
              {[
                { name: '线材', amount: 0, unit: '吨' },
                { name: '螺纹钢', amount: 0, unit: '吨' },
                { name: '宽厚板', amount: 0, unit: '吨' },
                { name: '热轧卷', amount: 0, unit: '吨' },
                { name: '冷轧卷', amount: 0, unit: '吨' },
                { name: '其他产品', amount: 0, unit: '吨' }
              ].map((product, index) => (
                <div key={index} className="product-card">
                  <h3>{product.name}</h3>
                  <div className="product-data">
                    <span className="amount">{product.amount}</span>
                    <span className="unit">{product.unit}</span>
                  </div>
                  <button className="bid-btn">竞 价</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-links">
            <div className="link-group">
              <h3>交易指南</h3>
              <ul>
                <li><a href="/guide/faq">交易常见问题</a></li>
                <li><a href="/guide/rules">挂牌交易规则</a></li>
                <li><a href="/guide/auction">竞价交易规则</a></li>
                <li><a href="/guide/matching">撮合交易规则</a></li>
              </ul>
            </div>
            <div className="link-group">
              <h3>采购指南</h3>
              <ul>
                <li><a href="/purchase/faq">采购常见问题</a></li>
                <li><a href="/purchase/rules">采购规则</a></li>
                <li><a href="/purchase/training">培训资料</a></li>
              </ul>
            </div>
            <div className="link-group">
              <h3>相关下载</h3>
              <ul>
                <li><a href="/download/auth">管理员授权委托书</a></li>
                <li><a href="/download/password">密码恢复申请函</a></li>
                <li><a href="/download/manual">撮合交易操作手册</a></li>
                <li><a href="/download/supplier">供应商操作报价流程</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-info">
            <p>客服热线：400-828-9656 客服邮箱：jlwl@e9656.com</p>
            <p>地址：江苏省张家港市锦丰镇兴业路2号</p>
            <p>苏ICP备13045919号-1 苏B1-20140026</p>
            <p>版权所有©张家港市玖隆电子商务有限公司</p>
            <p>苏公网安备 32058202010497号</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 