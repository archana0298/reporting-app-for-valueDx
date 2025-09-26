import React from 'react';
import { Menu, MenuProps } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  FileTextOutlined,
  CalendarOutlined,
  BookOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  LogoutOutlined
} from '@ant-design/icons';

interface SidebarProps {
  collapsed: boolean;
}

type MenuItem = Required<MenuProps>['items'][number];
const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const menuItems: MenuItem[] = [
    {
      key: 'main',
      label: 'Main',
      type: 'group',
      children: [
        {
          key: 'dashboard',
          icon: <DashboardOutlined />,
          label: 'Dashboard'
        },
        {
          key: 'students',
          icon: <UserOutlined />,
          label: 'Students'
        },
        {
          key: 'reports',
          icon: <FileTextOutlined />,
          label: 'Reports'
        },
       
        {
          key: 'events',
          icon: <CalendarOutlined />,
          label: 'Events & Notice'
        },
        {
          key: 'rules',
          icon: <BookOutlined />,
          label: 'Rules & Regulations'
        }
      ]
    },
    {
      key: 'other',
      type: 'group',
      children: [
        {
          key: 'setting',
          icon: <SettingOutlined />,
          label: 'Setting'
        },
        {
          key: 'supports',
          icon: <QuestionCircleOutlined />,
          label: 'Supports'
        }
      ]
    }
  ];

  return (
    <div className={`h-full bg-white shadow-sm transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className={`p-6 border-b border-gray-100 ${collapsed ? 'px-4' : ''}`}>
        <div className="text-xl font-bold text-blue-600">
          {collapsed ? 'RM' : 'ReportMaster'}
        </div>
      </div>
      
      <div className="p-4">
        <Menu
          mode="inline"
          defaultSelectedKeys={['reports']}
          items={menuItems}
          className="border-0"
          inlineIndent={16}
        />
        
        <div className="mt-8 pt-4 border-t border-gray-100">
          <Menu
            mode="inline"
            items={[
              {
                key: 'logout',
                icon: <LogoutOutlined />,
                label: 'Logout',
                className: 'text-red-500 hover:text-red-600'
              }
            ]}
            className="border-0"
            inlineIndent={16}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;