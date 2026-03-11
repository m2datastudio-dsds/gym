import React, { useState, useEffect } from 'react';
import { Button, Input, Row, Col, Form, Divider, Space, Upload, Modal, notification } from 'antd';
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { v4 as uuidv4 } from 'uuid';
import { getExerciseplanbyId, updateExercisePlan } from '../../Services/data.services';
import { toAbsoluteFileUrl } from '../../Utils/fileUrls';

const EditExercise = ({ exercisePlanId, onBack, onSaveSuccess }) => {
  const [form] = Form.useForm();
  const [days, setDays] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [hasExistingFile, setHasExistingFile] = useState(false);
  const [removeFile, setRemoveFile] = useState(false);
  const [filePreviewUrl, setFilePreviewUrl] = useState(null);
  const [filePreviewVisible, setFilePreviewVisible] = useState(false);

  // Media queries for responsiveness
  const isSmallScreen = useMediaQuery({ query: '(max-width: 576px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 577px) and (max-width: 992px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 993px)' });

  const getColSpan = () => {
    if (isSmallScreen) return 24;
    if (isMediumScreen) return 12;
    return 8;
  };

  // Fetch the existing exercise plan details
  useEffect(() => {
    const fetchExercisePlan = async () => {
      try {
        const response = await getExerciseplanbyId(exercisePlanId);

        if (response.code === 200) {
          const plan = response.data;

          // Populate the form with the plan name and assign fields
          form.setFieldsValue({
            planname: plan.planname,
            assign: plan.assign,
          });

          // Parse the details field to set up the days and exercises
          const parsedDetails = JSON.parse(plan.details);
          const mappedDays = parsedDetails.map((day, dayIndex) => ({
            id: uuidv4(),
            day: `Day ${dayIndex + 1}`,
            items: day.exercises.map((exercise) => ({
              id: uuidv4(),
              ...exercise,
            })),
          }));

          setDays(mappedDays);

          // Show existing plan file in Upload so user sees current file; backend keeps it if no new file is sent
          if (plan.file) {
            const resolvedFileUrl = toAbsoluteFileUrl(plan.file);
            setHasExistingFile(true);
            setRemoveFile(false);
            setFileList([{
              uid: '-existing',
              name: 'Current plan file',
              url: resolvedFileUrl,
              thumbUrl: resolvedFileUrl,
              status: 'done',
            }]);
          } else {
            setHasExistingFile(false);
            setRemoveFile(false);
            setFileList([]);
          }
        } else {
          notification.error({
            message: 'Error',
            description: response.message || 'Failed to load exercise plan details',
          });
        }
      } catch (error) {
        notification.error({
          message: 'Error',
          description: 'Failed to load exercise plan details',
        });
      }
    };

    fetchExercisePlan();
  }, [exercisePlanId, form]);

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

    return false; // prevent auto-upload; keep file in list
  };

  const handleFileChange = (info) => {
    setFileList(info.fileList);
    if (info.fileList.length === 0) {
      // user removed the existing file and didn't pick a new one
      setRemoveFile(hasExistingFile);
      return;
    }

    // user picked a new file (replace), or re-added after removing
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

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      const formData = new FormData();
      formData.append('planname', values.planname);
      formData.append('assign', values.assign || '');

      // Only send a new file when user selected one; otherwise backend keeps existing plan file
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('file', fileList[0].originFileObj);
      }
      if (removeFile) {
        formData.append('removeFile', 'true');
      }

      const detailsArray = days.map((day) => ({
        day: day.day,
        exercises: day.items.map((item, itemIndex) => ({
          siNo: itemIndex + 1,
          exercise: item.exercise || '',
          repsSets: item.repsSets || '',
          videoLink: item.videoLink || ''
        })),
      }));

      formData.append('details', JSON.stringify(detailsArray));

      await updateExercisePlan(exercisePlanId, formData);

      notification.success({
        message: 'Success',
        description: 'Exercise Plan updated successfully!',
      });

      onSaveSuccess();
      onBack();
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to update Exercise Plan!',
      });
      console.error('Error updating Exercise plan:', error);
    }
  };

  return (
    <div style={{ padding: '0 20px 20px' }}>
      <h2 style={{ marginBottom: '15px' }}>Edit Exercise Plan</h2>
      
      <Button type="primary" onClick={onBack} style={{ marginBottom: '20px' }}>
        Back to List
      </Button>

      <Form layout="vertical" form={form}>
        <Row gutter={16} style={{ marginBottom: '20px' }}>
          <Col span={getColSpan()}>
            <Form.Item label="Exercise Plan Name" name="planname" rules={[{ required: true, message: 'Plan name is required' }]}>
              <Input placeholder="Enter exercise plan name" size="large" />
            </Form.Item>
          </Col>
          <Col span={getColSpan()}>
            <Form.Item label="Assign To" name="assign">
              <Input placeholder="Enter assigned person" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <h3 style={{ marginTop: '20px', marginBottom: '10px', fontWeight: 'bold' }}>Exercise Details</h3>

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
                  <span>{itemIndex + 1}</span>
                </Col>
                <Col span={isSmallScreen ? 24 : 4}>
                  <Form.Item label="Exercise">
                    <Input placeholder="Enter Exercise" value={item.exercise} onChange={(e) => handleInputChange(dayIndex, itemIndex, 'exercise', e.target.value)} />
                  </Form.Item>
                </Col>
                <Col span={isSmallScreen ? 24 : 4}>
                  <Form.Item label="Reps & Sets">
                    <Input placeholder="Enter Reps & Sets" value={item.repsSets} onChange={(e) => handleInputChange(dayIndex, itemIndex, 'repsSets', e.target.value)} />
                  </Form.Item>
                </Col>
                <Col span={isSmallScreen ? 24 : 4}>
                  <Form.Item label="Video Link">
                    <Input placeholder="Enter Video Link" value={item.videoLink} onChange={(e) => handleInputChange(dayIndex, itemIndex, 'videoLink', e.target.value)} />
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

        <Form.Item label="Upload Plan" extra="One file per plan. JPG/JPEG or PDF only. Re-upload to replace.">
          <Upload
            fileList={fileList}
            onChange={handleFileChange}
            onPreview={handleFilePreview}
            beforeUpload={validatePlanFile}
            maxCount={1}
            listType="picture"
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
          <Button type="primary" onClick={handleSave} style={{ marginRight: '10px' }}>Update</Button>
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

export default EditExercise;
