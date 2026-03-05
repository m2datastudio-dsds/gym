import React, { useState, useEffect, useRef } from 'react';
import {
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  Upload,
  Row,
  Col,
  message,
  Modal,
  notification
} from 'antd';
import { UploadOutlined, CameraOutlined } from '@ant-design/icons';
import { getExpensebyId, updateExpense } from '../../Services/data.services';
import moment from 'moment';
import Webcam from 'react-webcam';

const { Option } = Select;

const EditExpense = ({ onBack, expenseId }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [webcamVisible, setWebcamVisible] = useState(false);
  const webcamRef = useRef(null);

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const data = await getExpensebyId(expenseId);
        const { expense } = data;

        // Set form fields with fetched data
        form.setFieldsValue({
          expenseDate: moment(expense.expenseDate),
          expenseType: expense.expenseType,
          description: expense.description,
          amount: expense.amount,
          paymentMode: expense.paymentMode,
          remarks: expense.remarks,
        });

        // Set file list for receipt images
        const receiptFiles = JSON.parse(expense.receiptFile).map((url, index) => ({
          uid: `file-${index}`,
          name: `Receipt_${index + 1}`,
          thumbUrl: url,
          url,
        }));

        setFileList(receiptFiles);
      } catch (error) {
        notification.error({
          message: 'Error',
          description: error.message || 'Failed to fetch expense details',
        });
      }
    };

    fetchExpense();
  }, [expenseId, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Ensure all required fields are present
      if (!expenseId || !values.expenseDate || !values.expenseType || !values.amount || !values.paymentMode) {
        throw new Error('Expense ID, expenseDate, expenseType, amount, and paymentMode are required.');
      }

      // Prepare the updated expense data
      const updatedExpense = new FormData();
      updatedExpense.append('id', expenseId);
      updatedExpense.append('expenseDate', values.expenseDate.format('YYYY-MM-DD'));
      updatedExpense.append('expenseType', values.expenseType);
      updatedExpense.append('description', values.description || '');
      updatedExpense.append('amount', values.amount);
      updatedExpense.append('paymentMode', values.paymentMode);
      updatedExpense.append('remarks', values.remarks || '');

      // Append receipt files to FormData
      fileList.forEach((file) => {
        updatedExpense.append('receiptFile', file.url || file.thumbUrl);
      });

      // Call the updateExpense API with the expense ID
      await updateExpense(expenseId, updatedExpense);
      notification.success({
        message: 'Success',
        description: 'Expense updated successfully',
      });
      onBack();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: error.message || 'Failed to update expense',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = ({ file, fileList }) => {
    if (fileList.length > 5) {
      message.error('You can only upload up to 5 images.');
      return;
    }
    setFileList(fileList);
  };

  const handleRemove = (file) => {
    setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
  };

  const handlePreview = (file) => {
    setPreviewImage(file.thumbUrl || file.url);
    Modal.info({
      title: 'Image Preview',
      content: <img src={file.thumbUrl || file.url} alt="Preview" style={{ width: '100%' }} />,
      onOk: () => setPreviewImage(''),
    });
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      const newFile = {
        uid: `file-${fileList.length}`,
        name: `Captured_Image_${fileList.length + 1}.png`,
        thumbUrl: imageSrc,
        url: imageSrc,
      };
      setFileList((prevList) => [...prevList, newFile]);
      closeWebcam();
    }
  };

  const closeWebcam = () => {
    setWebcamVisible(false);
    // Stop the webcam stream
    if (webcamRef.current) {
      const stream = webcamRef.current.stream;
      stream?.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div style={{ marginTop: '-10px' }}>
      <h1>Edit Expense</h1>
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
              <Select placeholder="Select Expense Type" style={{ width: '100%' }} showSearch>
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
              <Input type="number" style={{ width: '100%' }} />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <Form.Item
              label="Payment Mode"
              name="paymentMode"
              rules={[{ required: true, message: 'Payment Mode is required' }]}
            >
              <Select placeholder="Select Payment Mode" style={{ width: '100%' }} showSearch>
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
            showUploadList={true}
            onPreview={handlePreview}
          >
            <Button icon={<UploadOutlined />}>Choose Files</Button>
          </Upload>
        </Form.Item>

        <Button
          icon={<CameraOutlined />}
          onClick={() => setWebcamVisible(true)}
          style={{ marginBottom: '10px' }}
        >
          Take Picture
        </Button>

        <Modal
          visible={webcamVisible}
          footer={null}
          onCancel={closeWebcam}
          centered
          width={600}
        >
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/png"
            width="100%"
          />
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" onClick={captureImage}>
              Capture
            </Button>
            <Button onClick={closeWebcam}>
              Cancel
            </Button>
          </div>
        </Modal>

        <div style={{ marginTop: '20px' }}>
          <Button type="primary" onClick={handleSave} loading={loading} style={{ marginRight: '10px' }}>
            Update
          </Button>
          <Button type="default" onClick={onBack}>
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditExpense;
