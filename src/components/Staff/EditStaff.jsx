import React, { useState, useEffect } from 'react';
import { Form, Input as AntInput, DatePicker, Select, Checkbox, Upload, Button, Row, Col, Steps, Typography, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getStaffById, updateStaff, getAllPackages } from '../../Services/data.services.jsx';
import { useMediaQuery } from 'react-responsive';

const { Option } = Select;
const { Step } = Steps;

const EditStaff = ({ visible, onClose, onSuccess, staffId }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [packages, setPackages] = useState([]);
  const [fileList, setFileList] = useState([]);

  // Media queries for responsiveness
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1199px)' });
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });

  useEffect(() => {
    fetchPackages();
    if (staffId) {
      fetchStaff();
    }
  }, [staffId]);

  const fetchPackages = async () => {
    try {
      const result = await getAllPackages();
      if (result.code === 200) {
        setPackages(result.packages);
      } else {
        console.error('Failed to fetch packages:', result.message);
      }
    } catch (error) {
      console.error('Error fetching packages:', error);
    }
  };

  const fetchStaff = async () => {
    try {
      const staffData = await getStaffById(staffId);
      if (staffData) {
        // Parse the JSON strings for permanentAddress and communicationAddress
        const permanentAddress = staffData.permanentAddress ? JSON.parse(staffData.permanentAddress) : {};
        const communicationAddress = staffData.communicationAddress ? JSON.parse(staffData.communicationAddress) : {};
  
        // Set the fields in the form
        form.setFieldsValue({
          ...staffData,
          dateOfBirth: staffData.dateOfBirth ? moment(staffData.dateOfBirth, 'YYYY-MM-DD') : null,
          joiningDate: staffData.joiningDate ? moment(staffData.joiningDate, 'YYYY-MM-DD') : null,
          permanentAddress: {
            buildingNo: permanentAddress.buildingNo || '',
            street: permanentAddress.street || '',
            area: permanentAddress.area || '',
            district: permanentAddress.district || '',
            state: permanentAddress.state || '',
            postalCode: permanentAddress.postalCode || '',
          },
          communicationAddress: {
            buildingNo: communicationAddress.buildingNo || '',
            street: communicationAddress.street || '',
            area: communicationAddress.area || '',
            district: communicationAddress.district || '',
            state: communicationAddress.state || '',
            postalCode: communicationAddress.postalCode || '',
          },
        });
      }
    } catch (error) {
      console.error('Error fetching staff details:', error);
    }
  };
  
  

  const handleStepChange = async (current) => {
    try {
      await form.validateFields();
      setCurrentStep(current);
    } catch (errorInfo) {
      console.error('Validation failed:', errorInfo);
    }
  };

  const handleFileChange = (info) => {
    setFileList(info.fileList);
  };

  const handleFormSubmit = async () => {
    try {
      // Validate the form and get all values
      await form.validateFields();
      const allValues = form.getFieldsValue(true);
  
      // Extract and flatten the addresses
      const permanentAddress = {
        buildingNo: allValues.permanentAddress?.buildingNo,
        street: allValues.permanentAddress?.street,
        area: allValues.permanentAddress?.area,
        district: allValues.permanentAddress?.district,
        state: allValues.permanentAddress?.state,
        postalCode: allValues.permanentAddress?.postalCode,
      };
  
      const communicationAddress = {
        buildingNo: allValues.communicationAddress?.buildingNo,
        street: allValues.communicationAddress?.street,
        area: allValues.communicationAddress?.area,
        district: allValues.communicationAddress?.district,
        state: allValues.communicationAddress?.state,
        postalCode: allValues.communicationAddress?.postalCode,
      };
  
      const payload = {
        ...allValues,
        joiningDate: allValues.joiningDate ? moment(allValues.joiningDate).format('YYYY-MM-DD') : null, // Format joiningDate
        dateOfBirth: allValues.dateOfBirth ? moment(allValues.dateOfBirth).format('YYYY-MM-DD') : null, // Format dateOfBirth
        permanentAddress,
        communicationAddress,
      };
  
      const formData = new FormData();
      Object.keys(payload).forEach((key) => {
        if (key === 'photoPicture' && fileList.length > 0) {
          // Handle file upload
          formData.append(key, fileList[0].originFileObj);
        } else if (typeof payload[key] === 'object' && payload[key] !== null) {
          // Handle nested objects by converting them to JSON
          if (key === 'dateOfBirth' || key === 'joiningDate') {
            formData.append(key, moment(payload[key]).format('YYYY-MM-DD'));
          } else {
            formData.append(key, JSON.stringify(payload[key]));
          }
        } else {
          // Append primitive data types directly
          formData.append(key, payload[key] || '');
        }
      });
  
      const result = await updateStaff(staffId, formData);
  
      if (result.code === 200) {
        notification.success({
          message: 'Success',
          description: 'Staff updated successfully!',
        });
        form.resetFields();
        setFileList([]);
        onSuccess && onSuccess();
        onClose();
      } else {
        notification.error({
          message: 'Error',
          description: 'Failed to update staff.',
        });
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      notification.error({
        message: 'Error',
        description: 'Something went wrong! Please try again.',
      });
    }
  };
  
  

  const onCheckboxChange = (e) => {
    if (e.target.checked) {
      const permanentAddress = form.getFieldValue('permanentAddress');
      form.setFieldsValue({
        communicationAddress: permanentAddress,
      });
    } else {
      form.resetFields(['communicationAddress']);
    }
  };

  const handleDateOfBirthChange = (date, dateString) => {
    const birthDate = moment(dateString, 'DD-MM-YYYY');
    const age = moment().diff(birthDate, 'years');
    form.setFieldsValue({ age });
  };

  const steps = [
    {
      title: 'Details',
      content: (
        <Form form={form} layout="vertical">
          <Row gutter={isSmallScreen ? 10 : 20}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name="firstname" label="First Name" rules={[{ required: true, message: 'Please input the first name!' }]}>
                <AntInput size='large' placeholder='Enter Firstname' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name="lastname" label="Last Name">
                <AntInput size='large' placeholder='Enter Lastname' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name="email" label="Email" rules={[{ type: 'email', message: 'Please enter a valid email' }]}>
                <AntInput size='large' placeholder='Enter Email'/>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name="mobileNumber" label="Mobile Number" rules={[
                { required: true, message: 'Please enter mobile number' },
                { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' },
              ]}>
                <AntInput size='large' placeholder='Enter mobile number' maxLength={10}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={isSmallScreen ? 10 : 20}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name="alternateNumber" label="Alternate Number" rules={[
                { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' },
              ]}>
                <AntInput size='large' maxLength={10} placeholder='Enter alternate number'/>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name="gender" label="Gender">
                <Select placeholder="Select gender" size='large'>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Transgender">Transgender</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name="dateOfBirth" label="Date of Birth">
                <DatePicker
                  format="DD-MM-YYYY"
                  size='large'
                  style={{ width: '100%' }}
                  onChange={handleDateOfBirthChange}
                  placeholder='Select DOB'
                />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name="age" label="Age">
                <AntInput type="number" size='large' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={isSmallScreen ? 10 : 20}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name="biometricId" label="Biometric ID">
                <AntInput size='large' placeholder='Enter BiometricID' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name="joiningDate" label="Joining Date">
                <DatePicker format="YYYY-MM-DD" placeholder='Select joining date' size='large' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={isSmallScreen ? 10 : 20}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name="bloodGroup" label="Blood Group">
                <Select placeholder="Select blood group" size='large'>
                  <Option value="A-ve">A+</Option>
                  <Option value="A-ve">A-</Option>
                  <Option value="B+ve">B+</Option>
                  <Option value="B-ve">B-</Option>
                  <Option value="O+ve">O+</Option>
                  <Option value="O-ve">O-</Option>
                  <Option value="AB+ve">AB+</Option>
                  <Option value="AB-ve">AB-</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name="designation" label="Designation">
                <AntInput size='large' placeholder='Enter designation' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name="status" label="Status" valuePropName="checked">
                <Checkbox size='large'>Active</Checkbox>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name="photoPicture" label="Photo Picture">
                <Upload fileList={fileList} onChange={handleFileChange} beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />} size='medium'>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: 'Address',
      content: (
        <Form form={form} layout="vertical">
          <Typography.Title level={4}>Permanent Address</Typography.Title>
          <Row gutter={isSmallScreen ? 10 : 20}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name={['permanentAddress', 'buildingNo']} label="Building / Flat no">
                <AntInput size='large' placeholder='Enter Building / Flat no'/>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name={['permanentAddress', 'street']} label="Street">
                <AntInput size='large' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name={['permanentAddress', 'area']} label="Area">
                <AntInput size='large' style={{ textTransform: 'capitalize' }}/>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name={['permanentAddress', 'district']} label="District">
                <AntInput size='large' style={{ textTransform: 'capitalize' }}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={isSmallScreen ? 10 : 20}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name={['permanentAddress', 'state']} label="State">
                <AntInput size='large' style={{ textTransform: 'capitalize' }}/>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name={['permanentAddress', 'postalCode']} label="Pin code" rules={[{ pattern: /^[0-9]{6}$/, message: 'Please enter a valid 6-digit pin code' }]}>
                <AntInput size='large' maxLength={6} />
              </Form.Item>
            </Col>
          </Row>
          <Checkbox onChange={onCheckboxChange}>Same as Permanent Address</Checkbox>
          <Typography.Title level={4} style={{ marginTop: '10px' }}>Communication Address</Typography.Title>
          <Row gutter={isSmallScreen ? 10 : 20}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name={['communicationAddress', 'buildingNo']} label="Building / Flat no">
                <AntInput size='large' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name={['communicationAddress', 'street']} label="Street">
                <AntInput size='large' style={{ textTransform: 'capitalize' }}/>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name={['communicationAddress', 'area']} label="Area">
                <AntInput size='large' style={{ textTransform: 'capitalize' }}/>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name={['communicationAddress', 'district']} label="District">
                <AntInput size='large' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={isSmallScreen ? 10 : 20}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name={['communicationAddress', 'state']} label="State">
                <AntInput size='large' style={{ textTransform: 'capitalize' }}/>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name={['communicationAddress', 'postalCode']} label="Pin code" rules={[{ pattern: /^[0-9]{6}$/, message: 'Please enter a valid 6-digit pin code' }]}>
                <AntInput size='large' maxLength={6}/>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    }
  ];

  return (
    <div className="edit-staff-form" style={{ marginTop: '-10px' }}>
      <Typography.Title level={3} style={{ margin: 0, color: '#0A21C0' }}>Edit Staff</Typography.Title>
      <Button style={{ marginTop: '8px', marginBottom: '16px' }} onClick={onClose}>
        Back
      </Button>
      <Steps current={currentStep} onChange={handleStepChange} size={isSmallScreen ? 'small' : 'default'}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={{ marginTop: '30px' }}>
        {steps[currentStep].content}
      </div>
      <div className="steps-action" style={{ marginTop: '20px', textAlign: 'center' }}>
        {currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => handleStepChange(currentStep - 1)}>
            Previous
          </Button>
        )}
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={() => handleStepChange(currentStep + 1)}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={handleFormSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditStaff;
