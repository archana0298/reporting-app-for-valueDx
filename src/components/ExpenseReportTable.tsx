import React, { useState, useMemo } from 'react';
import { Card, Table, Button, Input, Select, Modal, Form, InputNumber, DatePicker } from 'antd';
import { PlusOutlined, SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import { ExpenseData } from '../data/mockData';


interface ExpenseReportTableProps {
  data: ExpenseData[];
  onDataChange: (newData: ExpenseData[]) => void;
}

const { Option } = Select;

const ExpenseReportTable: React.FC<ExpenseReportTableProps> = ({ data, onDataChange }) => {
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<string>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = 
        item.type.toLowerCase().includes(searchText.toLowerCase()) ||
        item.date.includes(searchText);
      
      const matchesType = !filterType || item.type === filterType;
      
      return matchesSearch && matchesType;
    });
  }, [data, searchText, filterType]);

  const uniqueTypes = [...new Set(data.map(item => item.type))];

  const columns: ColumnsType<ExpenseData> = [
    {
      title: 'Sr. No',
      dataIndex: 'slNo',
      key: 'slNo',
      width: 80,
      sorter: (a, b) => a.slNo - b.slNo
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type.localeCompare(b.type)
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => (
        <span className="text-red-500 flex items-center">
          <span className="mr-1">↓</span>
          ₹{price.toFixed(2)}
        </span>
      ),
      sorter: (a, b) => a.price - b.price
    },
    {
      title: 'Total Price (Rs.)',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: number) => `₹${price.toFixed(2)}`,
      sorter: (a, b) => a.totalPrice - b.totalPrice
    }
  ];

  const handleAddExpense = (values: any) => {
    const newExpense: ExpenseData = {
      id: data.length + 1,
      slNo: data.length + 1,
      date: values.date.format('DD/MM/YY'),
      type: values.type,
      price: values.price,
      totalPrice: values.totalPrice || values.price
    };
    
    onDataChange([...data, newExpense]);
    setIsModalVisible(false);
    form.resetFields();
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Expense Report');
    XLSX.writeFile(workbook, 'expense_report.xlsx');
  };

const exportToPDF = () => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(14);
  doc.text('Expense Report', 20, 15);

  // Prepare table head + body
  const headers = [['Sr. No', 'Date', 'Type', 'Price', 'Total Price']];
  const body = filteredData.map(item => [
    item.slNo,
    item.date,
    item.type,
    `Rs.${item.price.toFixed(2)}`,
    `Rs.${item.totalPrice.toFixed(2)}`
  ]);

  // Use autoTable correctly
  autoTable(doc, {
    head: headers,
    body: body,
    startY: 25,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] }, // nice blue
    styles: { fontSize: 10 },
  });

  // Save file
  doc.save('expense_report.pdf');
};


  return (
    <Card 
      title="Expense Report" 
      className="mb-6 shadow-sm hover:shadow-md transition-shadow duration-300"
      extra={
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => setIsModalVisible(true)}
          className="bg-blue-500 hover:bg-blue-600 border-blue-500 hover:border-blue-600"
        >
          Expenses
        </Button>
      }
    >
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search expenses..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="max-w-sm"
        />
        
        <Select
          placeholder="Filter by type"
          style={{ width: 200 }}
          allowClear
          value={filterType}
          onChange={setFilterType}
        >
          {uniqueTypes.map(type => (
            <Option key={type} value={type}>{type}</Option>
          ))}
        </Select>
        
        <div className="flex gap-2 ml-auto">
          <Button 
            icon={<DownloadOutlined />} 
            onClick={exportToExcel}
            className="hover:text-green-600 hover:border-green-600"
          >
            Excel
          </Button>
          <Button 
            icon={<DownloadOutlined />} 
            onClick={exportToPDF}
            className="hover:text-red-600 hover:border-red-600"
          >
            PDF
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{
          pageSize: 5,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
        }}
        className="custom-table"
        rowClassName="hover:bg-gray-50 transition-colors duration-200"
      />

      <Modal
        title="Add New Expense"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        className="expense-modal"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddExpense}
          className="mt-4"
        >
          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select date!' }]}
          >
            <DatePicker style={{ width: '100%' }} format="DD/MM/YY" />
          </Form.Item>
          
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please enter expense type!' }]}
          >
            <Input placeholder="e.g., Electric Bill, Water Bill" />
          </Form.Item>
          
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price!' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="0.00"
              min={0}
              precision={2}
              formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value:any) => value!.replace(/₹\s?|(,*)/g, '')}
            />
          </Form.Item>
          
          <Form.Item
            name="totalPrice"
            label="Total Price"
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder="0.00"
              min={0}
              precision={2}
              formatter={(value) => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value:any) => value!.replace(/₹\s?|(,*)/g, '')}
            />
          </Form.Item>

          <div className="flex justify-end space-x-2 pt-4">
            <Button onClick={() => setIsModalVisible(false)}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" className="bg-blue-500 hover:bg-blue-600">
              Add Expense
            </Button>
          </div>
        </Form>
      </Modal>
    </Card>
  );
};

export default ExpenseReportTable;