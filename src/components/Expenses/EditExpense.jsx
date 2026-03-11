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
import { normalizeFileUrlList, toAbsoluteFileUrl } from '../../Utils/fileUrls';

const { Option } = Select;

const EditExpense = ({ onBack, expenseId }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [webcamVisible, setWebcamVisible] = useState(false);
  const [webcamReady, setWebcamReady] = useState(false);
  const webcamRef = useRef(null);

  useEffect(() => {
    if (webcamVisible) {
      const t = setTimeout(() => setWebcamReady(true), 350);
      return () => clearTimeout(t);
    }
    setWebcamReady(false);
  }, [webcamVisible]);

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
        const receiptUrls = normalizeFileUrlList(expense.receiptFile);
        const receiptFiles = receiptUrls.map((url, index) => ({
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

      const existingKeptUrls = fileList
        .filter((f) => !f.originFileObj)
        .map((f) => toAbsoluteFileUrl(f.url || f.thumbUrl))
        .filter(Boolean);
      updatedExpense.append('existingReceiptUrls', JSON.stringify(existingKeptUrls));

      fileList.forEach((file) => {
        if (file.originFileObj) {
          updatedExpense.append('receiptFile', file.originFileObj);
        }
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

  const handleUpload = ({ file, fileList: newList }) => {
    setFileList((prev) => {
      const existingFromServer = prev.filter((f) => !f.originFileObj);
      const newFiles = newList.filter((f) => f.originFileObj);
      const merged = [...existingFromServer, ...newFiles];
      if (merged.length > 5) {
        message.error('You can only upload up to 5 images.');
        return prev;
      }
      return merged;
    });
  };

  const handleRemove = (file) => {
    setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
  };

  const handlePreview = (file) => {
    setPreviewImage(toAbsoluteFileUrl(file.thumbUrl || file.url));
    Modal.info({
      title: 'Image Preview',
      content: <img src={toAbsoluteFileUrl(file.thumbUrl || file.url)} alt="Preview" style={{ width: '100%' }} />,
      onOk: () => setPreviewImage(''),
    });
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

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setFileList((prevList) => {
        if (prevList.length >= 5) {
          message.error('You can only have up to 5 receipt images.');
          return prevList;
        }
        const blob = dataURItoBlob(imageSrc);
        const newFile = {
          uid: `capture-${Date.now()}`,
          name: `Captured_Image_${prevList.length + 1}.png`,
          thumbUrl: imageSrc,
          url: imageSrc,
          originFileObj: blob,
          size: blob.size,
          type: blob.type,
        };
        return [...prevList, newFile];
      });
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
          {!webcamReady ? (
            <div style={{ minHeight: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
              Starting camera…
            </div>
          ) : (
            <Webcam
              key="edit-expense-webcam"
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/png"
              width="100%"
              videoConstraints={{ width: 640, height: 480, facingMode: 'user' }}
            />
          )}
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
            <Button type="primary" onClick={captureImage} disabled={!webcamReady}>
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
