import React, { useState, useMemo } from 'react';
import { Card, Table, Button, Input, Select, Tag, Avatar, Dropdown, Checkbox } from 'antd';
import { SearchOutlined, DownloadOutlined, SettingOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export interface AnalysisData {
  id: number;
  date: string;
  type: string;
  name: string;
  price: number;
  status: 'Profit' | 'Expenses';
}

interface AnalysisTableProps {
  data: AnalysisData[];
}

const { Option } = Select;

const AnalysisTable: React.FC<AnalysisTableProps> = ({ data }) => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>();
  const [typeFilter, setTypeFilter] = useState<string>();
  const [dateFilter, setDateFilter] = useState<string>();
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'date',
    'type',
    'name',
    'price',
    'status',
  ]);

  // --- filtering logic ---
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.type.toLowerCase().includes(searchText.toLowerCase());

      const matchesStatus = !statusFilter || item.status === statusFilter;
      const matchesType = !typeFilter || item.type === typeFilter;
      const matchesDate = !dateFilter || item.date.includes(dateFilter);

      return matchesSearch && matchesStatus && matchesType && matchesDate;
    });
  }, [data, searchText, statusFilter, typeFilter, dateFilter]);

  const uniqueTypes = [...new Set(data.map(item => item.type))];
  const uniqueYears = [...new Set(data.map(item => item.date.split('/')[2]))];

  // --- all available columns ---
  const allColumns: ColumnsType<AnalysisData> = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: AnalysisData) => {
        // Generate initials fallback
        const initials = name
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase();

        // Map types to unique avatar images
        const avatarMap: Record<string, string> = {
          Admission: 'https://randomuser.me/api/portraits/men/11.jpg',
          'Water Bill': 'https://randomuser.me/api/portraits/women/12.jpg',
          'Electric Bill': 'https://randomuser.me/api/portraits/men/13.jpg',
          Salary: 'https://randomuser.me/api/portraits/women/14.jpg',
          Paper: 'https://randomuser.me/api/portraits/men/15.jpg',
          Construction: 'https://randomuser.me/api/portraits/women/16.jpg',
          'Car Bill': 'https://randomuser.me/api/portraits/men/17.jpg',
        };

        const avatarUrl = avatarMap[record.type] || `https://ui-avatars.com/api/?name=${initials}&background=random`;

        return (
          <div className="flex items-center space-x-2">
            <Avatar size="small" src={avatarUrl}>
              {initials}
            </Avatar>
            <span>{name}</span>
          </div>
        );
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `Rs. ${price.toFixed(2)}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'Profit' | 'Expenses') => (
        <Tag color={status === 'Profit' ? 'green' : 'red'}>{status}</Tag>
      ),
      filters: [
        { text: 'Profit', value: 'Profit' },
        { text: 'Expenses', value: 'Expenses' },
      ],
      onFilter: (value, record) => record.status === value,
    },
  ];

  // filter by visible columns
  const columns = allColumns.filter(col => visibleColumns.includes(col.key as string));

  // --- export functions ---
  const exportToExcel = () => {
    const dataForExport = filteredData.map(item => {
      const row: any = {};
      visibleColumns.forEach(col => {
        if (col === 'date') row.Date = item.date;
        if (col === 'type') row.Type = item.type;
        if (col === 'name') row.Name = item.name;
        if (col === 'price') row.Price = item.price;
        if (col === 'status') row.Status = item.status;
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(dataForExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Analysis Report');
    XLSX.writeFile(workbook, 'analysis_report.xlsx');
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text("Analysis Report", 20, 10);

    const headers = visibleColumns
      .filter((col) => col !== "action")
      .map((col) => col.charAt(0).toUpperCase() + col.slice(1));

    const body = filteredData.map((item) =>
      visibleColumns
        .filter((col) => col !== "action")
        .map((col) => {
          if (col === "date") return item.date;
          if (col === "type") return item.type;
          if (col === "name") return item.name;
          if (col === "price") return `Rs. ${item.price.toFixed(2)}`;
          if (col === "status") return item.status;
          return "";
        })
    );

    autoTable(doc, {
      head: [headers],
      body,
      startY: 20,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save("analysis_report.pdf");
  };

  return (
    <Card
      title="Analysis"
      className="shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="mb-4 flex flex-col lg:flex-row gap-4">
        <Input
          placeholder="Search by name or type..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="max-w-sm"
        />

        <Select
          placeholder="Filter by status"
          style={{ width: 150 }}
          allowClear
          value={statusFilter}
          onChange={setStatusFilter}
        >
          <Option value="Profit">Profit</Option>
          <Option value="Expenses">Expenses</Option>
        </Select>

        <Select
          placeholder="Filter by type"
          style={{ width: 150 }}
          allowClear
          value={typeFilter}
          onChange={setTypeFilter}
        >
          {uniqueTypes.map(type => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>

        <Select
          placeholder="Filter by year"
          style={{ width: 120 }}
          allowClear
          value={dateFilter}
          onChange={setDateFilter}
        >
          {uniqueYears.map(year => (
            <Option key={year} value={year}>
              {year}
            </Option>
          ))}
        </Select>

        <div className="flex gap-2 ml-auto">
          <Dropdown
            overlay={
              <Checkbox.Group
                value={visibleColumns}
                onChange={(checked) => {
                  // Ensure locked columns are always present
                  const withLocked = Array.from(
                    new Set([...checked, 'date', 'type', 'name'])
                  );
                  setVisibleColumns(withLocked);
                }}
                className="flex flex-col bg-white"
              >
                <Checkbox value="date" disabled>Date</Checkbox>
                <Checkbox value="type" disabled>Type</Checkbox>
                <Checkbox value="name" disabled>Name</Checkbox>

                <Checkbox value="price">Price</Checkbox>
                <Checkbox value="status">Status</Checkbox>
              </Checkbox.Group>
            }
            trigger={['click']}
          >
            <Button icon={<SettingOutlined />}>Columns</Button>
          </Dropdown>

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
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
        className="custom-table"
        rowClassName="hover:bg-gray-50 transition-colors duration-200"
      />
    </Card>
  );
};

export default AnalysisTable;
