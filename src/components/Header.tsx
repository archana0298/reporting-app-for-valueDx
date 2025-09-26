import React from 'react';
import { Avatar, Badge, Button } from 'antd';
import { BellOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const Header: React.FC = () => {
  const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};
  return (
    <div className="bg-white shadow-sm px-6 py-2 mb-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-800 mb-0">
         {getGreeting()}, John Doe...
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            type="text" 
            icon={<QuestionCircleOutlined />} 
            size="large"
            className="text-gray-500 hover:text-gray-700"
          />
          
          <Badge count={3} size="small">
            <Button 
              type="text" 
              icon={<BellOutlined />} 
              size="large"
              className="text-gray-500 hover:text-gray-700"
            />
          </Badge>
          
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <Avatar 
              size="large" 
              src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150"
              className="border-2 border-blue-100"
            />
            <div>
              <div className="text-sm font-medium text-gray-800">John Doe</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;