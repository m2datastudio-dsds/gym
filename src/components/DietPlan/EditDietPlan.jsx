import React, { useState, useEffect } from 'react';
import { Button, Input, Row, Col, Form, Divider, Space, Upload, TimePicker, notification } from 'antd';
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { getDietplanbyId, updateDietPlan } from '../../Services/data.services';
import moment from 'moment';

const EditDietPlan = ({ onBack, dietPlanId, onSaveSuccess }) => {
  const [days, setDays] = useState([{ day: 'Day 1', items: [{}] }]);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isSticky, setIsSticky] = useState(false);

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
              Time: meal.Time ? moment(meal.Time, 'HH:mm A') : null,
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
          setFileList([
            {
              uid: '-1',
              name: dietPlan.file.split('/').pop(),
              status: 'done',
              url: dietPlan.file,
            },
          ]);
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
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();

    // Append form fields
    formData.append('chartName', values.chartName);
    formData.append('assignedCount', values.assignedCount);
    formData.append('assign', values.assign || '');

    // Append file if uploaded
    if (fileList.length > 0) {
      formData.append('file', fileList[0].originFileObj);
    }

    // Append chart table data
    days.forEach((day, dayIndex) => {
      formData.append(`chartTable[${dayIndex}][day]`, day.day);
      day.items.forEach((item, itemIndex) => {
        formData.append(`chartTable[${dayIndex}][meals][${itemIndex}][Time]`, item.Time ? item.Time.format('HH:mm A') : '');
        formData.append(`chartTable[${dayIndex}][meals][${itemIndex}][Food]`, item.Food || '');
        formData.append(`chartTable[${dayIndex}][meals][${itemIndex}][Quantity]`, item.Quantity || '');
        formData.append(`chartTable[${dayIndex}][meals][${itemIndex}][Calorie]`, item.Calorie || '');
        formData.append(`chartTable[${dayIndex}][meals][${itemIndex}][VideoLink]`, item.VideoLink || '');
      });
    });

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

        <div className={`add-day-button-container ${isSticky ? 'sticky' : ''}`}>
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

        <Form.Item label="Upload Plan">
          <Upload
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Choose File</Button>
          </Upload>
        </Form.Item>

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
          position: relative;
        }

        .add-day-button-container.sticky {
          position: fixed;
          bottom: 10px;
          z-index: 1000;
          transition: opacity 0.3s;
        }
      `}</style>
    </div>
  );
};

export default EditDietPlan;
