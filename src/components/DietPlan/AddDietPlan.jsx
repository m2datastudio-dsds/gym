import React, { useState, useEffect } from 'react';
import { Button, Input, Row, Col, Form, Divider, Space, Upload, notification, TimePicker } from 'antd';
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { v4 as uuidv4 } from 'uuid'; 
import moment from 'moment';
import { saveDietPlan } from '../../Services/data.services'; // Assuming you have this service ready

const AddDietPlan = ({ onBack, onSaveSuccess }) => {
  const [form] = Form.useForm();
  const [days, setDays] = useState([{ id: uuidv4(), day: 'Day 1', items: [{ id: uuidv4() }] }]);
  const [fileList, setFileList] = useState([]); // Manage file list for upload

  // Media queries for responsiveness
  const isSmallScreen = useMediaQuery({ query: '(max-width: 576px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 577px) and (max-width: 992px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 993px)' });

  const getColSpan = () => {
    if (isSmallScreen) return 24;  
    if (isMediumScreen) return 12; 
    return 8; 
  };

  const addDay = () => {
    setDays([...days, { id: uuidv4(), day: `Day ${days.length + 1}`, items: [{ id: uuidv4() }] }]);
  };

  const addRow = (dayIndex) => {
    const newDays = [...days];
    newDays[dayIndex].items.push({ id: uuidv4() });
    setDays(newDays);
  };

  const removeRow = (dayIndex, itemId) => {
    let newDays = [...days];
    newDays[dayIndex].items = newDays[dayIndex].items.filter(item => item.id !== itemId);

    if (newDays[dayIndex].items.length === 0 && newDays.length > 1) {
      newDays.splice(dayIndex, 1);
    }

    newDays = newDays.map((day, index) => ({
      ...day,
      day: `Day ${index + 1}`,
    }));

    setDays(newDays);
  };

  // Note: Add Day button uses CSS sticky (no scroll listeners needed)

  const handleInputChange = (dayIndex, itemIndex, field, value) => {
    const newDays = [...days];
    newDays[dayIndex].items[itemIndex][field] = value;
    setDays(newDays);
  };

  const validatePlanFile = (file) => {
    const ext = String(file?.name || '').toLowerCase().split('.').pop();
    const allowedExt = new Set(['jpg', 'jpeg', 'pdf']);
    const allowedMime = new Set(['image/jpeg', 'application/pdf']);
    const isAllowed = allowedExt.has(ext) || allowedMime.has(file?.type);

    if (!isAllowed) {
      notification.error({
        message: 'Invalid file',
        description: 'Only JPG/JPEG images and PDF files are allowed.',
      });
      return Upload.LIST_IGNORE;
    }

    return false;
  };

  const handleFileChange = (info) => {
    setFileList(info.fileList);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
  
      const formData = new FormData();
      formData.append('chartName', values.chartName);
      formData.append('assignedCount', values.assignedCount || '');
      formData.append('assignTo', values.assignTo || '');
  
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('file', fileList[0].originFileObj);
      }

      // Build chartTable as array so backend receives it correctly (multipart form doesn't nest arrays)
      const chartTable = days.map((day) => ({
        day: day.day,
        meals: day.items.map((item) => ({
          // AntD TimePicker may return Moment (v4) or Dayjs (v5). Both support .format().
          // Using the instance's format() avoids incorrect coercion to midnight.
          Time: item.time && typeof item.time.format === 'function'
            ? item.time.format('hh:mm A')
            : (item.time ? moment(item.time).format('hh:mm A') : ''),
          Food: item.food || '',
          Quantity: item.qty || '',
          Calorie: item.calorie || '',
          VideoLink: item.videoLink || '',
        })),
      }));
      formData.append('chartTable', JSON.stringify(chartTable));

      await saveDietPlan(formData); // API call with form data
  
      notification.success({
        message: 'Success',
        description: 'Diet Plan saved successfully!',
      });
      onSaveSuccess();
      onBack();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to save Diet Plan!',
      });
    }
  };
  

  return (
    <div style={{ padding: '0 20px 20px' }}>
      <h2 style={{ marginBottom: '15px' }}>Add Diet Plan</h2>
      
      <Button type="primary" onClick={onBack} style={{ marginBottom: '20px' }}>
        Back to List
      </Button>

      <Form layout="vertical" form={form}>
        <Row gutter={16} style={{ marginBottom: '20px' }}>
          <Col span={getColSpan()}>
            <Form.Item label="Chart Name" name="chartName" rules={[{ required: true, message: 'Chart Name is required' }]}>
              <Input placeholder="Enter chart name" size="large" />
            </Form.Item>
          </Col>
          <Col span={getColSpan()}>
            <Form.Item label="Assign To" name="assignTo">
              <Input placeholder="Enter assigned person" size="large" />
            </Form.Item>
          </Col>
          <Col span={getColSpan()}>
            <Form.Item label="Assigned Count" name="assignedCount">
              <Input placeholder="Enter assigned count" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <h3 style={{ marginTop: '20px', marginBottom: '10px', fontWeight: 'bold' }}>Chart Table</h3>

        <div className="add-day-button-container">
          <Button type="dashed" onClick={() => addDay()} icon={<PlusOutlined />} style={{ width: '120px', textAlign: 'center' }}>
            Add Day
          </Button>
        </div>

        {days.map((day, dayIndex) => (
          <div key={day.id} style={{ marginBottom: '20px' }}>
            <Divider orientation="left">{day.day}</Divider>

            {day.items.map((item, itemIndex) => (
              <Row gutter={16} key={item.id} style={{ marginBottom: '10px', textAlign: 'center' }}>
                <Col span={isSmallScreen ? 24 : 4}>
                  <Form.Item label="Time" name={['days', dayIndex, 'items', itemIndex, 'time']}>
                    <TimePicker
                      use12Hours
                      format="h:mm A"
                      placeholder="Select Time"
                      style={{ width: '100%' }}
                      value={item.time}
                      onChange={(value) => handleInputChange(dayIndex, itemIndex, 'time', value)}
                      // UI stability: avoid accidental changes while scrolling/moving to OK (supported in newer AntD; ignored otherwise)
                      changeOnScroll={false}
                      needConfirm
                      inputReadOnly
                    />
                  </Form.Item>
                </Col>
                <Col span={isSmallScreen ? 24 : 4}>
                  <Form.Item label="Food" name={['days', dayIndex, 'items', itemIndex, 'food']}>
                    <Input placeholder="Enter food" value={item.food} onChange={(e) => handleInputChange(dayIndex, itemIndex, 'food', e.target.value)} />
                  </Form.Item>
                </Col>
                <Col span={isSmallScreen ? 24 : 4}>
                  <Form.Item label="Qty" name={['days', dayIndex, 'items', itemIndex, 'qty']}>
                    <Input placeholder="Enter qty" value={item.qty} onChange={(e) => handleInputChange(dayIndex, itemIndex, 'qty', e.target.value)} />
                  </Form.Item>
                </Col>
                <Col span={isSmallScreen ? 24 : 4}>
                  <Form.Item label="Calorie" name={['days', dayIndex, 'items', itemIndex, 'calorie']}>
                    <Input placeholder="Enter calorie" value={item.calorie} onChange={(e) => handleInputChange(dayIndex, itemIndex, 'calorie', e.target.value)} />
                  </Form.Item>
                </Col>
                <Col span={isSmallScreen ? 24 : 4}>
                  <Form.Item label="Video Link" name={['days', dayIndex, 'items', itemIndex, 'videoLink']}>
                    <Input placeholder="Enter video link" value={item.videoLink} onChange={(e) => handleInputChange(dayIndex, itemIndex, 'videoLink', e.target.value)} />
                  </Form.Item>
                </Col>
                <Col span={isSmallScreen ? 24 : 4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Space>
                    <Button type="dashed" onClick={() => addRow(dayIndex)} icon={<PlusOutlined />} />
                    <Button type="dashed" danger onClick={() => removeRow(dayIndex, item.id)} icon={<MinusCircleOutlined />} disabled={days.length === 1 && day.items.length === 1} />
                  </Space>
                </Col>
              </Row>
            ))}
          </div>
        ))}

        <Form.Item label="Upload Plan" extra="One file per plan. JPG/JPEG or PDF only.">
          <Upload
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={validatePlanFile}
            maxCount={1}
            accept=".jpg,.jpeg,.pdf"
          >
            <Button icon={<UploadOutlined />}>Choose File</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSave} style={{ marginRight: '10px' }}>Save</Button>
          <Button type="default" onClick={onBack}>Cancel</Button>
        </Form.Item>
      </Form>

      <style jsx>{`
        .add-day-button-container {
          margin-top: 20px;
          position: sticky;
          top: 12px;
          z-index: 10;
          background: transparent;
          padding: 0;
        }
      `}</style>
    </div>
  );
};

export default AddDietPlan;
