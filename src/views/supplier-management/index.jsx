import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, Check, Filter } from 'react-feather';
import './style.css';
import AMapComponent from '../../components/AMapComponent';
import SupplierCharts from '../../components/SupplierCharts';

const SupplierManagement = () => {
  // 模拟供应商数据
  const initialSuppliers = [
    {
      id: 1,
      code: 'SUP001',
      name: '江苏钢铁有限公司',
      type: '钢铁制造',
      level: 'A',
      contact: '张经理',
      phone: '13812345678',
      address: '江苏省南京市江宁区钢铁大道1号',
      status: '已认证',
      createTime: '2023-01-15',
      detailInfo: {
        registeredCapital: '5000万元',
        establishDate: '2010-05-15',
        legalRepresentative: '张三',
        businessScope: '钢铁制品生产、加工、销售；金属材料销售；货物进出口...',
        location: {
          latitude: 31.9642,
          longitude: 120.8942,
          address: '江苏省南京市江宁区钢铁大道1号'
        },
        employees: [
          { id: 1, name: '张三', position: '总经理', phone: '13812345678' },
          { id: 2, name: '李四', position: '销售总监', phone: '13912345678' },
          { id: 3, name: '王五', position: '生产主管', phone: '13712345678' }
        ],
        shareholders: [
          { name: '张三', ratio: '40%', investment: '2000万' },
          { name: '李四', ratio: '35%', investment: '1750万' },
          { name: '王五', ratio: '25%', investment: '1250万' }
        ],
        certificates: [
          { name: '营业执照', number: '91320000MA1ABCDE2F' },
          { name: 'ISO9001认证', number: 'ISO9001-2023-001' },
          { name: '安全生产许可证', number: '(苏)WH安许证字[2023]000123' }
        ],
        financialInfo: {
          annualRevenue: '1.2亿',
          netProfit: '2300万',
          taxPaid: '800万',
          creditRating: 'AA'
        }
      }
    },
    {
      id: 2,
      code: 'SUP002',
      name: '上海物资贸易有限公司',
      type: '贸易公司',
      level: 'B',
      contact: '李总',
      phone: '13912345678',
      address: '上海市浦东新区陆家嘴金融贸易区',
      status: '已认证',
      createTime: '2023-02-20',
      detailInfo: {
        registeredCapital: '3000万元',
        establishDate: '2008-03-10',
        legalRepresentative: '李总',
        businessScope: '物资贸易、仓储、物流、供应链管理...',
        location: {
          latitude: 31.2304,
          longitude: 121.4737,
          address: '上海市浦东新区陆家嘴金融贸易区'
        },
        employees: [
          { id: 1, name: '李总', position: '总经理', phone: '13912345678' },
          { id: 2, name: '张三', position: '销售总监', phone: '13812345678' },
          { id: 3, name: '王五', position: '生产主管', phone: '13712345678' }
        ],
        shareholders: [
          { name: '李总', ratio: '50%', investment: '1500万' },
          { name: '张三', ratio: '30%', investment: '900万' },
          { name: '王五', ratio: '20%', investment: '600万' }
        ],
        certificates: [
          { name: '营业执照', number: '91310000MA1ABCDE2F' },
          { name: 'ISO9001认证', number: 'ISO9001-2023-002' },
          { name: '安全生产许可证', number: '(沪)WH安许证字[2023]000124' }
        ],
        financialInfo: {
          annualRevenue: '8000万',
          netProfit: '1500万',
          taxPaid: '500万',
          creditRating: 'AA'
        }
      }
    },
    {
      id: 3,
      code: 'SUP003',
      name: '广州金属材料有限公司',
      type: '金属加工',
      level: 'A',
      contact: '王经理',
      phone: '13612345678',
      address: '广州市黄埔区开发区金属工业园',
      status: '待审核',
      createTime: '2023-03-10',
      detailInfo: {
        registeredCapital: '2000万元',
        establishDate: '2012-07-20',
        legalRepresentative: '王经理',
        businessScope: '金属材料加工、销售；货物进出口...',
        location: {
          latitude: 23.1291,
          longitude: 113.2644,
          address: '广州市黄埔区开发区金属工业园'
        },
        employees: [
          { id: 1, name: '王经理', position: '总经理', phone: '13612345678' },
          { id: 2, name: '张三', position: '销售总监', phone: '13812345678' },
          { id: 3, name: '李四', position: '生产主管', phone: '13712345678' }
        ],
        shareholders: [
          { name: '王经理', ratio: '50%', investment: '1000万' },
          { name: '张三', ratio: '30%', investment: '600万' },
          { name: '李四', ratio: '20%', investment: '400万' }
        ],
        certificates: [
          { name: '营业执照', number: '91440000MA1ABCDE2F' },
          { name: 'ISO9001认证', number: 'ISO9001-2023-003' },
          { name: '安全生产许可证', number: '(粤)WH安许证字[2023]000125' }
        ],
        financialInfo: {
          annualRevenue: '6000万',
          netProfit: '1200万',
          taxPaid: '400万',
          creditRating: 'AA'
        }
      }
    }
  ];

  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [filterType, setFilterType] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedSupplierDetail, setSelectedSupplierDetail] = useState(null);

  // 供应商类型选项
  const supplierTypes = ['钢铁制造', '贸易公司', '金属加工', '物流运输'];
  const supplierLevels = ['A', 'B', 'C', 'D'];
  const statusOptions = ['已认证', '待审核', '未认证'];

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: '',
    level: '',
    contact: '',
    phone: '',
    address: '',
    status: ''
  });

  // 处理搜索
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // 处理筛选
  const handleFilter = (type) => {
    setFilterType(type);
  };

  // 获取筛选后的数据
  const filteredSuppliers = suppliers.filter(supplier => {
    const matchesSearch = (
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesType = filterType === 'all' || supplier.type === filterType;
    return matchesSearch && matchesType;
  });

  // 处理添加供应商
  const handleAdd = () => {
    setModalMode('add');
    setFormData({
      code: `SUP${String(suppliers.length + 1).padStart(3, '0')}`,
      name: '',
      type: '',
      level: '',
      contact: '',
      phone: '',
      address: '',
      status: '未认证'
    });
    setIsModalOpen(true);
  };

  // 处理编辑供应商
  const handleEdit = (supplier) => {
    setModalMode('edit');
    setSelectedSupplier(supplier);
    setFormData(supplier);
    setIsModalOpen(true);
  };

  // 处理删除供应商
  const handleDelete = (id) => {
    if (window.confirm('确定要删除这个供应商吗？')) {
      setSuppliers(suppliers.filter(s => s.id !== id));
    }
  };

  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newSupplier = {
        ...formData,
        id: suppliers.length + 1,
        createTime: new Date().toISOString().split('T')[0]
      };
      setSuppliers([...suppliers, newSupplier]);
    } else {
      setSuppliers(suppliers.map(s => 
        s.id === selectedSupplier.id ? { ...s, ...formData } : s
      ));
    }
    setIsModalOpen(false);
  };

  // 添加查看详情处理函数
  const handleViewDetail = (supplier) => {
    setSelectedSupplierDetail(supplier);
    setShowDetailModal(true);
  };

  return (
    <div className="supplier-management">
      <div className="top-bar">
        <h1>供应商管理系统</h1>
      </div>

      <div className="content-wrapper">
        <div className="toolbar">
          <div className="search-box">
            <Search size={20} />
            <input
              type="text"
              placeholder="搜索供应商..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <div className="filter-section">
            <Filter size={20} />
            <select
              value={filterType}
              onChange={(e) => handleFilter(e.target.value)}
            >
              <option value="all">所有类型</option>
              {supplierTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <button className="add-btn" onClick={handleAdd}>
            <Plus size={20} />
            添加供应商
          </button>
        </div>

        <div className="data-grid">
          <table>
            <thead>
              <tr>
                <th>供应商编码</th>
                <th>供应商名称</th>
                <th>类型</th>
                <th>等级</th>
                <th>联系人</th>
                <th>联系电话</th>
                <th>状态</th>
                <th>创建时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map(supplier => (
                <tr key={supplier.id} onClick={() => handleViewDetail(supplier)} style={{ cursor: 'pointer' }}>
                  <td>{supplier.code}</td>
                  <td>{supplier.name}</td>
                  <td>{supplier.type}</td>
                  <td>
                    <span className={`level-badge level-${supplier.level}`}>
                      {supplier.level}
                    </span>
                  </td>
                  <td>{supplier.contact}</td>
                  <td>{supplier.phone}</td>
                  <td>
                    <span className={`status-badge status-${supplier.status}`}>
                      {supplier.status}
                    </span>
                  </td>
                  <td>{supplier.createTime}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(supplier)}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(supplier.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{modalMode === 'add' ? '添加供应商' : '编辑供应商'}</h2>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label>供应商编码</label>
                  <input
                    type="text"
                    value={formData.code}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label>供应商名称</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>类型</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    required
                  >
                    <option value="">请选择类型</option>
                    {supplierTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>等级</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({...formData, level: e.target.value})}
                    required
                  >
                    <option value="">请选择等级</option>
                    {supplierLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>联系人</label>
                  <input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>联系电话</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group full-width">
                  <label>地址</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>状态</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    required
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setIsModalOpen(false)}>
                  取消
                </button>
                <button type="submit" className="submit-btn">
                  <Check size={16} />
                  确认
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDetailModal && selectedSupplierDetail && (
        <div className="modal-overlay">
          <div className="modal detail-modal">
            <div className="modal-header">
              <h2>{selectedSupplierDetail.name} - 详细信息</h2>
              <button className="close-btn" onClick={() => setShowDetailModal(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="detail-content">
              <div className="detail-section">
                <h3>基本信息</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>注册资本</label>
                    <span>{selectedSupplierDetail.detailInfo.registeredCapital}</span>
                  </div>
                  <div className="info-item">
                    <label>成立日期</label>
                    <span>{selectedSupplierDetail.detailInfo.establishDate}</span>
                  </div>
                  <div className="info-item">
                    <label>法定代表人</label>
                    <span>{selectedSupplierDetail.detailInfo.legalRepresentative}</span>
                  </div>
                  <div className="info-item full-width">
                    <label>经营范围</label>
                    <span>{selectedSupplierDetail.detailInfo.businessScope}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>员工信息</h3>
                <div className="detail-table">
                  <table>
                    <thead>
                      <tr>
                        <th>姓名</th>
                        <th>职位</th>
                        <th>联系电话</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedSupplierDetail.detailInfo.employees.map(employee => (
                        <tr key={employee.id}>
                          <td>{employee.name}</td>
                          <td>{employee.position}</td>
                          <td>{employee.phone}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="detail-section">
                <h3>股东信息</h3>
                <div className="detail-table">
                  <table>
                    <thead>
                      <tr>
                        <th>股东姓名</th>
                        <th>持股比例</th>
                        <th>出资金额</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedSupplierDetail.detailInfo.shareholders.map((shareholder, index) => (
                        <tr key={index}>
                          <td>{shareholder.name}</td>
                          <td>{shareholder.ratio}</td>
                          <td>{shareholder.investment}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="detail-section">
                <h3>资质证书</h3>
                <div className="certificates-grid">
                  {selectedSupplierDetail.detailInfo.certificates.map((cert, index) => (
                    <div key={index} className="certificate-item">
                      <span className="cert-name">{cert.name}</span>
                      <span className="cert-number">{cert.number}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h3>财务信息</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>年营业额</label>
                    <span>{selectedSupplierDetail.detailInfo.financialInfo.annualRevenue}</span>
                  </div>
                  <div className="info-item">
                    <label>净利润</label>
                    <span>{selectedSupplierDetail.detailInfo.financialInfo.netProfit}</span>
                  </div>
                  <div className="info-item">
                    <label>纳税额</label>
                    <span>{selectedSupplierDetail.detailInfo.financialInfo.taxPaid}</span>
                  </div>
                  <div className="info-item">
                    <label>信用等级</label>
                    <span>{selectedSupplierDetail.detailInfo.financialInfo.creditRating}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>地理位置</h3>
                <div className="location-map">
                  <AMapComponent location={selectedSupplierDetail.detailInfo.location} />
                </div>
              </div>

              <div className="detail-section">
                <h3>数据分析</h3>
                <SupplierCharts supplier={selectedSupplierDetail} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierManagement; 