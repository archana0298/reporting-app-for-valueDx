import React from 'react';
import { Card } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { MetricData } from '../data/mockData';

interface MetricsCardsProps {
  data: MetricData[]; // note the array []
}


const MetricsCards: React.FC<MetricsCardsProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {data.map((metric, index) => (
        <Card 
          key={index}
          className={`${metric.color} border hover:shadow-md transition-all duration-300 transform hover:scale-105`}
          bodyStyle={{ padding: '8px' }}
        >
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-600">
              {metric.title}
            </div>
            <div className="text-2xl font-bold text-gray-800">
              {metric.value}
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className={`flex items-center space-x-1 ${
                metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                <span>{metric.change}</span>
              </div>
              <span className="text-gray-500">{metric.period}</span>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MetricsCards;