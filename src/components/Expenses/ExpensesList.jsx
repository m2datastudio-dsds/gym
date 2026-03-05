import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Table, Input, Space, DatePicker, Popconfirm, message, notification } from 'antd';
import { FaDownload, FaUpload, FaPlus } from 'react-icons/fa';
import { SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import AddExpense from './AddExpense';
import EditExpense from './EditExpense';
import { getallExpenses, deleteExpense } from '../../Services/data.services';
import moment from 'moment';

const { RangePicker } = DatePicker;

const ExpensesList = () => {
  const [view, setView] = useState('expenseslist');
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [dateRange, setDateRange] = useState([]);
  const [pageSize, setPageSize] = useState(8);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const isSmallScreen = useMediaQuery({ query: '(max-width: 576px)' });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const data = await getallExpenses();
      const formattedExpenses = data.expenses.map((expense) => ({
        ...expense,
        expenseDate: moment(expense.expenseDate).format('DD-MM-YYYY'),
      }));
      setExpenses(formattedExpenses);
      setFilteredData(formattedExpenses);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.message || 'Failed to fetch expense',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    setSelectedExpenseId(id);
    setView('editexpense');
  };

  const filterData = (searchValue, dateRangeValue) => {
    const filtered = expenses.filter((data) => {
      const matchesSearch = Object.values(data).some((field) =>
        String(field).toLowerCase().includes(searchValue.toLowerCase())
      );
      const matchesDateRange =
        !dateRangeValue.length ||
        (moment(data.expenseDate, 'DD-MM-YYYY').isSameOrAfter(dateRangeValue[0], 'day') &&
          moment(data.expenseDate, 'DD-MM-YYYY').isSameOrBefore(dateRangeValue[1], 'day'));
      return matchesSearch && matchesDateRange;
    });
    setFilteredData(filtered);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setDateRange([]);
    setFilteredData(expenses);
  };

  const confirmDelete = async (id) => {
    try {
      setLoading(true);
      await deleteExpense(id);
      notification.success({
        message: 'Success',
        description: 'Expense deleted successfully!',
      });
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      setExpenses(updatedExpenses);
      setFilteredData(updatedExpenses);
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.message || 'Failed to delete expense',
      });
    } finally {
      setLoading(false);
    }
  };

  const paginationConfig = {
    pageSize: pageSize,
    showSizeChanger: true,
    pageSizeOptions: ['8', '16', '24', '32'],
    onShowSizeChange: (current, size) => setPageSize(size),
  };

  const getColumns = () => {
    const columns = [
      { title: 'Expense Type', dataIndex: 'expenseType', key: 'expenseType' },
      { title: 'Description', dataIndex: 'description', key: 'description' },
      { title: 'Amount', dataIndex: 'amount', key: 'amount' },
    ];

    if (isSmallScreen) {
      return [
        ...columns,
        {
          title: 'Actions',
          key: 'actions',
          width: '10%',
          render: (text, record) => (
            <Space size="middle">
              <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record.id)} />
              <Popconfirm
                title="Are you sure to delete this record?"
                onConfirm={() => confirmDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </Space>
          ),
        },
      ];
    } else {
      return [
        { title: 'No', key: 'index', render: (text, record, index) => index + 1, width: '5%' },
        { title: 'Expense Type', dataIndex: 'expenseType', key: 'expenseType', width: '20%' },
        { title: 'Description', dataIndex: 'description', key: 'description', width: '20%' },
        { title: 'Payment Mode', dataIndex: 'paymentMode', key: 'paymentMode', width: '20%' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', width: '20%' },
        { title: 'Expense Date', dataIndex: 'expenseDate', key: 'expenseDate', width: '15%' },
        {
          title: 'Actions',
          key: 'actions',
          width: '10%',
          render: (text, record) => (
            <Space size="middle">
              <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record.id)} />
              <Popconfirm
                title="Are you sure to delete this record?"
                onConfirm={() => confirmDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </Space>
          ),
        },
      ];
    }
  };

  return (
    <div style={{ marginTop: '-10px', marginRight: '-8px', marginLeft: '-5px' }}>
      {view === 'expenseslist' && (
        <>
          <h2 style={{ marginBottom: '20px' }}>Expenses</h2>

          <Row gutter={[16, 16]} style={{ marginBottom: '20px', alignItems: 'center' }}>
            <Col xs={24} sm={12} md={6} lg={4}>
              <Input
                placeholder="Search text"
                value={searchTerm}
                className="search-input"
                onChange={(e) => filterData(e.target.value, dateRange)}
                prefix={<SearchOutlined style={{ color: '#ccc' }} />}
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} sm={12} md={10} lg={8}>
              <Space direction={isSmallScreen ? 'horizontal' : 'horizontal'}>
                <RangePicker
                  value={dateRange}
                  onChange={(dates) => filterData(searchTerm, dates)}
                  style={{ width: isSmallScreen ? '100%' : 'auto' }}
                />
                <Button type="default" onClick={handleClearSearch}>
                  Clear
                </Button>
              </Space>
            </Col>
            <Col xs={24} sm={24} md={8} lg={12} style={{ textAlign: isSmallScreen ? 'center' : 'right', marginTop: isSmallScreen ? '10px' : 0 }}>
              <Space direction={isSmallScreen ? 'horizontal' : 'horizontal'}>
              <Button type="primary">
                  <FaDownload style={{ marginRight: '5px' }} />
                  Download
                </Button>
                <Button type="primary">
                  <FaUpload style={{ marginRight: '5px' }} />
                  Upload
                </Button>
                <Button type="primary" icon={<FaPlus />} onClick={() => setView('addexpense')}>
                  ADD
                </Button>
              </Space>
            </Col>
          </Row>

          <Table
            dataSource={filteredData}
            loading={loading}
            bordered
            pagination={paginationConfig}
            columns={getColumns()}
            tableLayout="auto"
          />
        </>
      )}

      {view === 'addexpense' && <AddExpense onBack={() => setView('expenseslist')} />}
      {view === 'editexpense' && <EditExpense onBack={() => setView('expenseslist')} expenseId={selectedExpenseId} />}
    </div>
  );
};

export default ExpensesList;
