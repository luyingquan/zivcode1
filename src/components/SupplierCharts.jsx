import React from 'react';
import ReactECharts from 'echarts-for-react';

const SupplierCharts = ({ supplier }) => {
  // 供应商等级分布
  const getLevelDistributionOption = () => ({
    title: {
      text: '供应商等级分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    series: [
      {
        name: '供应商等级',
        type: 'pie',
        radius: ['50%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside'
        },
        data: [
          { value: 40, name: 'A级' },
          { value: 30, name: 'B级' },
          { value: 20, name: 'C级' },
          { value: 10, name: 'D级' }
        ]
      }
    ]
  });

  // 财务趋势图
  const getFinancialTrendOption = () => ({
    title: {
      text: '财务趋势分析',
      left: 'center'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['营业额', '净利润', '纳税额'],
      bottom: 0
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value',
      name: '金额（万元）'
    },
    series: [
      {
        name: '营业额',
        type: 'line',
        smooth: true,
        data: [1200, 1320, 1500, 1380, 1600, 1450]
      },
      {
        name: '净利润',
        type: 'line',
        smooth: true,
        data: [230, 250, 280, 260, 300, 270]
      },
      {
        name: '纳税额',
        type: 'line',
        smooth: true,
        data: [80, 85, 95, 88, 102, 92]
      }
    ]
  });

  // 供应商类型分布
  const getTypeDistributionOption = () => ({
    title: {
      text: '供应商类型分布',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          { value: 35, name: '钢铁制造' },
          { value: 30, name: '贸易公司' },
          { value: 25, name: '金属加工' },
          { value: 10, name: '物流运输' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  });

  return (
    <div className="charts-container">
      <div className="chart-row">
        <div className="chart-item">
          <ReactECharts option={getLevelDistributionOption()} style={{ height: '300px' }} />
        </div>
        <div className="chart-item">
          <ReactECharts option={getTypeDistributionOption()} style={{ height: '300px' }} />
        </div>
      </div>
      <div className="chart-row">
        <div className="chart-item full-width">
          <ReactECharts option={getFinancialTrendOption()} style={{ height: '300px' }} />
        </div>
      </div>
    </div>
  );
};

export default SupplierCharts; 