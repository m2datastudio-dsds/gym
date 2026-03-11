import React, { useState, useRef } from 'react';
import { 
  Button, 
  Form, 
  Input, 
  DatePicker, 
  Select, 
  Upload, 
  Table, 
  Row, 
  Col, 
  message, 
  Modal, 
  Alert, 
  Grid,
  notification 
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Webcam from 'react-webcam';
import { saveExpense } from '../../Services/data.services';
const { Option } = Select;
const { useBreakpoint } = Grid;

const AddExpense = ({ onBack }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm(); // Create a form instance
  const [editingImage, setEditingImage] = useState(null); 
  const [showWebcam, setShowWebcam] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [loading, setLoading] = useState(false); // Track loading state
  const webcamRef = useRef(null);
  const screens = useBreakpoint(); 

  const handleUpload = ({ file, fileList }) => {
    if (fileList.length > 5) {
      message.error('You can only upload up to 5 images.');
      return;
    }

    const mappedFiles = fileList.map(file => ({
      uid: file.uid,
      name: file.name,
      thumbUrl: URL.createObjectURL(file.originFileObj),
      originFileObj: file.originFileObj,
      size: file.size,
      type: file.type,
    }));

    setFileList(mappedFiles);
  };

  const handleRemove = (file) => {
    setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setFileList((prevList) => {
        if (prevList.length >= 5) {
          message.error('You can only upload up to 5 images.');
          return prevList;
        }
        const imageFile = {
          uid: `photo-${prevList.length + 1}`,
          name: `Photo_${prevList.length + 1}.png`,
          thumbUrl: imageSrc,
          originFileObj: dataURItoBlob(imageSrc),
          size: imageSrc.length,
          type: 'image/png',
        };
        return [...prevList, imageFile];
      });
      setShowWebcam(false);
    }
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const handlePreview = (imageSrc) => {
    setPreviewImage(imageSrc);
    Modal.info({
      title: 'Image Preview',
      content: <img src={imageSrc} alt="Preview" style={{ width: '100%' }} />,
      onOk: () => setPreviewImage(''),
    });
  };

  const saveImageName = (uid, newName) => {
    setFileList((prevList) =>
      prevList.map((item) => (item.uid === uid ? { ...item, name: newName } : item))
    );
    setEditingImage(null);
  };

  const getTableColumns = () => {
    const commonColumns = [
      {
        title: 'Image',
        dataIndex: 'thumbUrl',
        key: 'image',
        render: (text, record) => (
          <img
            src={record.thumbUrl}
            alt="thumb"
            style={{ width: '50px', cursor: 'pointer' }}
            onClick={() => handlePreview(record.thumbUrl)}
          />
        ),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          if (editingImage === record.uid) {
            return (
              <Input
                defaultValue={text}
                onPressEnter={(e) => saveImageName(record.uid, e.target.value)}
                onBlur={(e) => saveImageName(record.uid, e.target.value)}
                autoFocus
              />
            );
          }
          return (
            <div onClick={() => setEditingImage(record.uid)} style={{ cursor: 'pointer' }}>
              {text}
            </div>
          );
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Button 
            type="link" 
            onClick={() => handleRemove(record)}
          >
            Delete
          </Button>
        ),
      },
    ];

    if (!screens.xs) {
      return [
        ...commonColumns,
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
        {
          title: 'Size',
          dataIndex: 'size',
          key: 'size',
          render: (size) => `${(size / 1024).toFixed(2)} KB`,
        },
      ];
    }
    return commonColumns;
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields(); // Validate form values
      setLoading(true);
  
      // Prepare expense data
      const formData = new FormData();
      formData.append('expenseDate', values.expenseDate.format('YYYY-MM-DD'));
      formData.append('expenseType', values.expenseType);
      formData.append('description', values.description || '');
      formData.append('amount', values.amount);
      formData.append('paymentMode', values.paymentMode);
      formData.append('remarks', values.remarks || '');
  
      // Append files to formData
      fileList.forEach((file, index) => {
        formData.append('receiptFile', file.originFileObj || file);
      });
  
      // Call saveExpense API
      const response = await saveExpense(formData);
      notification.success({
        message: 'Success',
        description: 'Expense saved successfully',
      });
      onBack(); // Navigate back to the list
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.message || 'Failed to save expense',
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div style={{ marginTop: '-10px' }}>
      <h1>Expenses</h1>
      <Button type="primary" onClick={onBack} style={{ marginBottom: '10px', marginTop: '10px' }}>
        Back to List
      </Button>

      <Form form={form} layout="vertical">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item 
              label="Expense Date" 
              name="expenseDate" 
              rules={[{ required: true, message: 'Expense Date is required' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item 
              label="Expense Type" 
              name="expenseType" 
              rules={[{ required: true, message: 'Expense Type is required' }]}
            >
              <Select
                placeholder="Select Expense Type"
                style={{ width: '100%' }}
                showSearch
              >
                <Option value="Telephone Expenses">Telephone Expenses</Option>
                <Option value="Travelling Expenses">Travelling Expenses</Option>
                <Option value="Office Equipment and Supplies">Office Equipment and Supplies</Option>
                <Option value="Utility Expenses">Utility Expenses</Option>
                <Option value="Property Tax">Property Tax</Option>
                <Option value="Legal Expenses">Legal Expenses</Option>
                <Option value="Bank Charges">Bank Charges</Option>
                <Option value="Repair and Maintenance Expenses">Repair and Maintenance Expenses</Option>
                <Option value="Insurance Expenses">Insurance Expenses</Option>
                <Option value="Advertising Expenses">Advertising Expenses</Option>
                <Option value="Research Expenses">Research Expenses</Option>
                <Option value="Entertainment Expenses">Entertainment Expenses</Option>
                <Option value="Sales Expenses">Sales Expenses</Option>
                <Option value="Other Expenses">Other Expenses</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <Form.Item label="Description" name="description">
              <Input style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Form.Item 
              label="Amount" 
              name="amount" 
              rules={[{ required: true, message: 'Amount is required' }]}
            >
              <Input 
                style={{ width: '100%' }} 
                type="number" // Set input type to number
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item 
              label="Payment Mode" 
              name="paymentMode" 
              rules={[{ required: true, message: 'Payment Mode is required' }]}
            >
              <Select
                placeholder="Select Payment Mode"
                style={{ width: '100%' }}
                showSearch
              >
                <Option value="Cash">Cash</Option>
                <Option value="Credit card">Credit card</Option>
                <Option value="Debit card">Debit card</Option>
                <Option value="Cheque">Cheque</Option>
                <Option value="Internet banking">Internet Banking</Option>
                <Option value="Paytm">Paytm</Option>
                <Option value="Googlepay">Google Pay</Option>
                <Option value="Phonepe">Phonepe</Option>
                <Option value="BHIM App">BHIM App</Option>
                <Option value="Others">Others</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <Form.Item label="Remarks" name="remarks">
              <Input.TextArea rows={1} style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Select images of Receipt to upload">
          <Upload
            multiple
            fileList={fileList}
            onChange={handleUpload}
            onRemove={handleRemove}
            beforeUpload={() => false}
            listType="picture"
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>Choose Files</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            onClick={() => setShowWebcam(true)} 
          >
            Take Photo
          </Button>
        </Form.Item>

        {showWebcam && (
          <div style={{ marginBottom: '20px' }}>
            <Webcam
              key="add-expense-webcam"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              width={320}
              height={240}
              videoConstraints={{ width: 320, height: 240, facingMode: 'user' }}
            />
            <div style={{ marginTop: '10px' }}>
              <Button type="primary" onClick={capturePhoto} style={{ marginRight: '10px' }}>
                Capture
              </Button>
              <Button type="default" onClick={() => setShowWebcam(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        <Alert
          message="You can edit the image name directly in the table by clicking on it. Click on the image thumbnail to preview."
          type="info"
          showIcon
          style={{ marginBottom: '20px' }}
        />

        <Table
          dataSource={fileList}
          rowKey="uid"
          pagination={false}
          columns={getTableColumns()}
          style={{ minHeight: fileList.length === 0 ? '50px' : 'auto', marginTop: '-10px' }}
        />

        <div style={{ marginTop: '20px' }}>
          <Button 
            type="primary" 
            onClick={handleSave}
            loading={loading} 
            style={{ marginRight: '10px' }}
          >
            Save
          </Button>
          <Button type="default" onClick={onBack}>
            Cancel
          </Button>
        </div>

      </Form>
    </div>
  );
};

export default AddExpense;
