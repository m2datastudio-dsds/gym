import React, { useState, useEffect } from 'react';
import { Button, Input, Row, Col, Form, Divider, Space, Upload, TimePicker, Modal, notification } from 'antd';
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { getDietplanbyId, updateDietPlan } from '../../Services/data.services';
import moment from 'moment';
import { toAbsoluteFileUrl } from '../../Utils/fileUrls';

const EditDietPlan = ({ onBack, dietPlanId, onSaveSuccess }) => {
  const [days, setDays] = useState([{ day: 'Day 1', items: [{}] }]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [hasExistingFile, setHasExistingFile] = useState(false);
  const [removeFile, setRemoveFile] = useState(false);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [filePreviewVisible, setFilePreviewVisible] = useState(false);

  const isSmallScreen = useMediaQuery({ query: '(max-width: 576px)' });

  useEffect(() => {
    const fetchDietPlanDetails = async () => {
      try {
        const response = await getDietplanbyId(dietPlanId);
        const { dietPlan } = response;
  
        // Parse the chartTable string to convert it into a JavaScript array
        const parsedChartTable = JSON.parse(dietPlan.chartTable);
  
        // Set the days state to match the parsed chartTable structure
        setDays(
          parsedChartTable.map((day, index) => ({
            day: `Day ${index + 1}`,
            items: day.meals.map((meal) => ({
              Food: meal.Food,
              // Parse using the same 12-hr format we store ('hh:mm A')
              Time: meal.Time && String(meal.Time).trim() ? moment(meal.Time, 'hh:mm A') : null,
              Calorie: meal.Calorie,
              Quantity: meal.Quantity,
              VideoLink: meal.VideoLink,
            })),
          }))
        );
  
        // Set the form fields with the fetched data
        form.setFieldsValue({
          chartName: dietPlan.chartName,
          assignedCount: dietPlan.assignedCount,
          assign: dietPlan.assign || '',
        });
  
        // Set the uploaded file list if the diet plan has a file
        if (dietPlan.file) {
          const resolvedFileUrl = toAbsoluteFileUrl(dietPlan.file);
          setHasExistingFile(true);
          setRemoveFile(false);
          setFileList([
            {
              uid: '-1',
              name: dietPlan.file.split('/').pop(),
              status: 'done',
              url: resolvedFileUrl,
            },
          ]);
        } else {
          setHasExistingFile(false);
          setRemoveFile(false);
          setFileList([]);
        }
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to load diet plan details.',
        });
      }
    };
  
    fetchDietPlanDetails();
  }, [dietPlanId, form]);
  


  const handleInputChange = (dayIndex, itemIndex, field, value) => {
    const newDays = [...days];
    newDays[dayIndex].items[itemIndex][field] = value;
    setDays(newDays);
  };

  const addDay = () => {
    setDays([...days, { day: `Day ${days.length + 1}`, items: [{}] }]);
  };

  const addRow = (dayIndex) => {
    const newDays = [...days];
    newDays[dayIndex].items.push({});
    setDays(newDays);
  };

  const removeRow = (dayIndex, itemIndex) => {
    let newDays = [...days];
    newDays[dayIndex].items.splice(itemIndex, 1);

    if (newDays[dayIndex].items.length === 0 && newDays.length > 1) {
      newDays.splice(dayIndex, 1);
    }

    newDays = newDays.map((day, index) => ({
      ...day,
      day: `Day ${index + 1}`,
    }));

    setDays(newDays);
  };

  const handleFileChange = (info) => {
    setFileList(info.fileList);
    if (info.fileList.length === 0) {
      setRemoveFile(hasExistingFile);
      return;
    }

    if (info.fileList[0]?.originFileObj) {
      setRemoveFile(false);
    }
  };

  const handleFilePreview = (file) => {
    const rawUrl = file?.url || file?.thumbUrl;
    const resolvedUrl = toAbsoluteFileUrl(rawUrl);
    if (!resolvedUrl) return;
    setFilePreviewUrl(resolvedUrl);
    setFilePreviewVisible(true);
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

  const handleSubmit = async (values) => {
    const formData = new FormData();

    // Append form fields
    formData.append('chartName', values.chartName);
    formData.append('assignedCount', values.assignedCount);
    formData.append('assign', values.assign || '');

    // Append file if uploaded
    if (fileList.length > 0 && fileList[0].originFileObj) {
      formData.append('file', fileList[0].originFileObj);
    }
    if (removeFile) {
      formData.append('removeFile', 'true');
    }

    // Build chartTable as array so backend receives it correctly (multipart form doesn't nest arrays)
    const chartTable = days.map((day) => ({
      day: day.day,
      meals: day.items.map((item) => ({
        Time: item.Time ? item.Time.format('hh:mm A') : '',
        Food: item.Food || '',
        Quantity: item.Quantity || '',
        Calorie: item.Calorie || '',
        VideoLink: item.VideoLink || '',
      })),
    }));
    formData.append('chartTable', JSON.stringify(chartTable));

    setLoading(true);
    try {
      await updateDietPlan(dietPlanId, formData); // Update using FormData
      notification.success({
        message: 'Success',
        description: 'Diet plan updated successfully!',
      });
      onSaveSuccess();
      onBack();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update diet plan.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '0 20px 20px' }}>
      <h2 style={{ marginBottom: '15px' }}>Edit Diet Plan</h2>

      <Button type="primary" onClick={onBack} style={{ marginBottom: '20px' }}>
        Back to List
      </Button>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16} style={{ marginBottom: '20px' }}>
          <Col span={isSmallScreen ? 24 : 8}>
            <Form.Item name="chartName" label="Chart Name" rules={[{ required: true, message: 'Please enter chart name' }]}>
              <Input placeholder="Enter chart name" size="large" />
            </Form.Item>
          </Col>
          <Col span={isSmallScreen ? 24 : 8}>
            <Form.Item name="assign" label="Assign To">
              <Input placeholder="Enter assigned person" size="large" />
            </Form.Item>
          </Col>
          <Col span={isSmallScreen ? 24 : 8}>
            <Form.Item name="assignedCount" label="Assigned Count" rules={[{ required: true, message: 'Please enter assigned count' }]}>
              <Input placeholder="Enter assigned count" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <h3 style={{ marginTop: '20px', marginBottom: '10px', fontWeight: 'bold' }}>Chart Table</h3>

        <div className="add-day-button-container">
          <Button
            type="dashed"
            onClick={addDay}
            icon={<PlusOutlined />}
            style={{ width: '120px', textAlign: 'center', marginBottom: '20px' }}
          >
            Add Day
          </Button>
        </div>

        {days.map((day, dayIndex) => (
          <div key={dayIndex} style={{ marginBottom: '20px' }}>
            <Divider orientation="left">{day.day}</Divider>

            {day.items.map((item, itemIndex) => (
              <Row gutter={16} key={itemIndex} style={{ marginBottom: '10px', textAlign: 'center' }}>
                <Col span={isSmallScreen ? 24 : 4}>
                  <Form.Item label="Time">
                    <TimePicker
                      use12Hours
                      format="h:mm A"
                      placeholder="Select Time"
                      style={{ width: '100%' }}
                      value={item.Time}
                      onChange={(value) => handleInputChange(dayIndex, itemIndex, 'Time', value)}
                      // UI stability: avoid accidental changes while scrolling/moving to OK (supported in newer AntD; ignored otherwise)
                      changeOnScroll={false}
                      needConfirm
                      inputReadOnly
                    />
                  </Form.Item>
                </Col>
                <Col span={isSmallScreen ? 24 : 4}>
                  <Form.Item label="Food">
                    <Input
                      placeholder="Enter food"
                      value={item.Food}
                      onChange={(e) => handleInputChange(dayIndex, itemIndex, 'Food', e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={isSmallScreen ? 24 : 4}>
                  <Form.Item label="Qty">
                    <Input
                      placeholder="Enter qty"
                      value={item.Quantity}
                      onChange={(e) => handleInputChange(dayIndex, itemIndex, 'Quantity', e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={isSmallScreen ? 24 : 4}>
                  <Form.Item label="Calorie">
                    <Input
                      placeholder="Enter calorie"
                      value={item.Calorie}
                      onChange={(e) => handleInputChange(dayIndex, itemIndex, 'Calorie', e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={isSmallScreen ? 24 : 4}>
                  <Form.Item label="Video Link">
                    <Input
                      placeholder="Enter video link"
                      value={item.VideoLink}
                      onChange={(e) => handleInputChange(dayIndex, itemIndex, 'VideoLink', e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={isSmallScreen ? 24 : 4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Space>
                    <Button type="dashed" onClick={() => addRow(dayIndex)} icon={<PlusOutlined />} />
                    <Button
                      type="dashed"
                      danger
                      onClick={() => removeRow(dayIndex, itemIndex)}
                      icon={<MinusCircleOutlined />}
                      disabled={days.length === 1 && day.items.length === 1}
                    />
                  </Space>
                </Col>
              </Row>
            ))}
          </div>
        ))}

        <Form.Item label="Upload Plan" extra="One file per plan. JPG/JPEG or PDF only. Re-upload to replace.">
          <Upload
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={validatePlanFile}
            listType="picture"
            onPreview={handleFilePreview}
            maxCount={1}
            accept=".jpg,.jpeg,.pdf"
          >
            <Button icon={<UploadOutlined />}>Choose File</Button>
          </Upload>
        </Form.Item>

        <Modal
          title="Plan File"
          open={filePreviewVisible}
          onCancel={() => { setFilePreviewVisible(false); setFilePreviewUrl(null); }}
          footer={null}
          width={800}
          destroyOnClose
          styles={{ body: { minHeight: 400, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f0f0f0' } }}
        >
          {filePreviewUrl && (
            String(filePreviewUrl).toLowerCase().split('?')[0].endsWith('.pdf')
              ? <iframe src={filePreviewUrl} title="Plan File" style={{ width: '100%', height: 500, border: 'none' }} />
              : <img src={filePreviewUrl} alt="Plan" style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain' }} />
          )}
        </Modal>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} style={{ marginRight: '10px' }}>
            Update
          </Button>
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

export default EditDietPlan;
