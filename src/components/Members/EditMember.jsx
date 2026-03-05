import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker, Radio, Checkbox, Upload, Steps, Typography, notification, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { saveToLocalForage } from '../../Utils/syncUtils';
import { getMemberById, updateMember, getAllPackages, getAllStaffname } from '../../Services/data.services';
import { useMediaQuery } from 'react-responsive'; // Import useMediaQuery

const { Option } = Select;
const { Step } = Steps;

const EditMember = ({ memberId, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [member, setMember] = useState(null);
  const [packages, setPackages] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [memberPhotoFileList, setMemberPhotoFileList] = useState([]);
  const [proofDocumentFileList, setProofDocumentFileList] = useState([]);

  // Define breakpoints
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1199px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const result = await getAllStaffname();
        if (result.code === 200) {
          setStaff(result.staffdetails);
        } else {
          console.error('Failed to fetch staff:', result.message);
        }
      } catch (error) {
        console.error('Error fetching staff:', error);
      }
    };

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

    fetchStaffDetails();
    fetchPackages();
  }, []);

  useEffect(() => {
    const fetchMember = async () => {
      setLoading(true);
      try {
        const result = await getMemberById(memberId);
        if (result.code === 200) {
          setMember(result.member);
  
          const permanentAddress = result.member.permanentAddress
            ? JSON.parse(result.member.permanentAddress)
            : {};
          const communicationAddress = result.member.communicationAddress
            ? JSON.parse(result.member.communicationAddress)
            : {};
  
          // Set form values, including parsed addresses and initial file lists for photos
          form.setFieldsValue({
            ...result.member,
            permanentAddress: {
              buildingNo: permanentAddress.buildingNo,
              street: permanentAddress.street,
              area: permanentAddress.area,
              district: permanentAddress.district,
              state: permanentAddress.state,
              postalCode: permanentAddress.postalCode,
            },
            communicationAddress: {
              buildingNo: communicationAddress.buildingNo,
              street: communicationAddress.street,
              area: communicationAddress.area,
              district: communicationAddress.district,
              state: communicationAddress.state,
              postalCode: communicationAddress.postalCode,
            },
            dateOfBirth: result.member.dateOfBirth ? moment(result.member.dateOfBirth) : null,
            paidDate: result.member.paidDate ? moment(result.member.paidDate) : null,
            startDate: result.member.startDate ? moment(result.member.startDate) : null,
            fitnessDate: result.member.fitnessDate ? moment(result.member.fitnessDate) : null,
            expiryDate: result.member.expiryDate ? moment(result.member.expiryDate) : null,
          });
  
          // Set the initial file lists for member photo and proof document
          setMemberPhotoFileList(result.member.memberPhoto ? [
            {
              uid: '-1',
              name: 'Member Photo',
              status: 'done',
              url: result.member.memberPhoto,
            }
          ] : []);
  
          setProofDocumentFileList(result.member.proofDocument ? [
            {
              uid: '-1',
              name: 'Proof Document',
              status: 'done',
              url: result.member.proofDocument,
            }
          ] : []);
        } else {
          console.error('Failed to fetch member details:', result.message);
        }
      } catch (error) {
        console.error('Error fetching member details:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMember();
  }, [memberId, form]);
  


  const handleStepChange = async (current) => {
    try {
      await form.validateFields({ force: true });
      setCurrentStep(current);
    } catch (errorInfo) {
      console.error('Validation failed:', errorInfo);
    }
  };

  const handlePackageChange = (value) => {
    const selectedPackage = packages.find(pkg => pkg.packageName === value);
    if (selectedPackage) {
      form.setFieldsValue({
        packageAmount: selectedPackage.amount,
        duration: `${selectedPackage.month} months ${selectedPackage.day} days`,
      });
    } else {
      form.setFieldsValue({
        packageAmount: '',
        duration: '',
      });
    }
  };

  // Separate file change handler for member photo
  const handleMemberPhotoChange = (info) => {
    setMemberPhotoFileList(info.fileList);
  };

  // Separate file change handler for proof document
  const handleProofDocumentChange = (info) => {
    setProofDocumentFileList(info.fileList);
  };

  const handleEditFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      const allValues = form.getFieldsValue(true);
  
      const permanentAddress = {
        buildingNo: allValues.permanentAddress?.buildingNo || '',
        street: allValues.permanentAddress?.street || '',
        area: allValues.permanentAddress?.area || '',
        district: allValues.permanentAddress?.district || '',
        state: allValues.permanentAddress?.state || '',
        postalCode: allValues.permanentAddress?.postalCode || ''
      };
  
      const communicationAddress = {
        buildingNo: allValues.communicationAddress?.buildingNo || '',
        street: allValues.communicationAddress?.street || '',
        area: allValues.communicationAddress?.area || '',
        district: allValues.communicationAddress?.district || '',
        state: allValues.communicationAddress?.state || '',
        postalCode: allValues.communicationAddress?.postalCode || ''
      };
  
      const fieldsToParse = [
        'gstamount', 'paidAmount', 'packageAmount', 'weight', 'height',
        'neck', 'shoulders', 'chest', 'biceps', 'upperAbs', 'waist',
        'lowerAbs', 'hip', 'thigh', 'calf'
      ];
  
      const parsedValues = fieldsToParse.reduce((acc, field) => {
        if (allValues[field] !== undefined) {
          acc[field] = parseFloat(allValues[field]);
        }
        return acc;
      }, {});
  
      const payload = {
        ...allValues,
        ...parsedValues,
        permanentAddress: JSON.stringify(permanentAddress),
        communicationAddress: JSON.stringify(communicationAddress),
        isMainPackage: allValues.isMainPackage || false,
        active: allValues.active === 'true' || allValues.active === true, // Convert to boolean
      };
  
      const formData = new FormData();
  
      Object.keys(payload).forEach((key) => {
        if (key !== 'memberPhoto' && key !== 'proofDocument') {
          formData.append(key, payload[key] ? String(payload[key]) : '');
        }
      });
  
      if (memberPhotoFileList.length > 0 && memberPhotoFileList[0].originFileObj) {
        formData.append('memberPhoto', memberPhotoFileList[0].originFileObj);
      } else if (member?.memberPhoto) {
        formData.append('memberPhoto', member.memberPhoto);
      }
  
      if (proofDocumentFileList.length > 0 && proofDocumentFileList[0].originFileObj) {
        formData.append('proofDocument', proofDocumentFileList[0].originFileObj);
      } else if (member?.proofDocument) {
        formData.append('proofDocument', member.proofDocument);
      }
  
      const result = await updateMember(memberId, formData);
  
      notification.success({
        message: 'Success',
        description: 'Member updated successfully!',
      });
  
      form.resetFields();
      onBack();
    } catch (errorInfo) {
      notification.error({
        message: 'Error',
        description: 'Please fill all the required fields or check your input!',
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

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '-50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  const steps = [
    {
      title: 'Basic Details',
      content: (
        <Form form={form} layout="vertical">
          <Row gutter={isSmallScreen ? 8 : 20}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter first name' }]}>
                <Input size='large' placeholder='Enter Firstname' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Last Name" name="lastName">
                <Input size='large' placeholder="Enter Lastname" style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Email" name="email" rules={[
                { type: 'email', message: 'Please enter a valid email' },
              ]}>
                <Input size='large' placeholder='Enter email' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={isSmallScreen ? 8 : 16}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Mobile Number" name="mobileNumber" rules={[
                { required: true, message: 'Please enter mobile number' },
                { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' },
              ]}>
                <Input size='large' placeholder='Enter mobile no' maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Date of Birth" name="dateOfBirth">
                <DatePicker format='DD-MM-YYYY' style={{ width: '100%' }} size='large' placeholder='Enter DOB' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Gender" name="gender">
                <Select size='large' placeholder='Choose gender'>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value='Transgender'>Transgender</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={isSmallScreen ? 8 : 16}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Home Contact Number" name="homeContactNumber" rules={[
                { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' },
              ]}>
                <Input size='large' placeholder='Enter Home contact' maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Marital Status" name="maritalStatus">
                <Radio.Group size='large'>
                  <Radio value="Single">Single</Radio>
                  <Radio value="Married">Married</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={isSmallScreen ? 8 : 16}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Blood Group" name="bloodGroup">
                <Select size='large' placeholder='Select blood group'>
                  <Option value="A+ve">A+</Option>
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
              <Form.Item label="GST Number" name="gstNumber">
                <Input size='large' placeholder='Enter GST number' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Member Photo" name="memberPhoto" valuePropName="file">
                <Upload listType="picture" fileList={memberPhotoFileList} onChange={handleMemberPhotoChange} beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />} size='medium'>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={isSmallScreen ? 8 : 16}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Remarks" name="remarks">
                <Input.TextArea
                  placeholder='Enter remarks if any'
                  size='large'
                  onChange={(e) => {
                    const value = e.target.value;
                    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1); // Capitalize the first letter
                    form.setFieldValue('remarks', formattedValue); // Set the formatted value in the form
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6} style={{ marginTop: '30px' }}>
              <Form.Item name="active" valuePropName="checked">
                <Checkbox>Active</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: 'Package Details',
      content: (
        <Form layout="vertical">
          <Row gutter={isSmallScreen ? 8 : 16}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Assign Trainer" name="assignTrainer">
                <Select size='large' placeholder='Select Trainer'>
                  {staff.map(st => (
                    <Option key={st.employeeCode} value={st.name}>{st.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="GST Type" name="gstType">
                <Select size='large' placeholder='Select GST type'>
                  <Option value="NA">NA</Option>
                  <Option value="EXCLUDED">Excluded</Option>
                  <Option value="INCLUDED">Included</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item
                label="Package Type"
                name="packageType"
              >
                <Select size="large" onChange={handlePackageChange} placeholder='Select package type'>
                  {packages.map(pkg => (
                    <Option key={pkg.id} value={pkg.packageName}>
                      {pkg.packageName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item name="isMainPackage" valuePropName="checked" style={{ marginTop: '30px' }}>
                <Checkbox>Is main package?</Checkbox>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Package Amount" name="packageAmount">
                <Input type="number" size="large" disabled />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="GST Amount" name="gstamount">
                <Input type="number" size='large' placeholder='Enter GST number' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Duration" name="duration">
                <Input size="large" disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={isSmallScreen ? 8 : 16}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Discount" name="discount">
                <Input type="number" size='large' placeholder='Enter discount' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Paid Amount" name="paidAmount">
                <Input type="number" size='large' placeholder='Enter paid amount' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Paid Date" name="paidDate">
                <DatePicker format='DD-MM-YYYY' style={{ width: '100%' }} size='large' placeholder='Enter paid date' />
              </Form.Item>
            </Col>
            </Row>
            <Row gutter={isSmallScreen ? 8 : 16}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Payment Mode" name="paymentMode">
                <Select size='large' placeholder='Select payment mode'>
                  <Option value="Cash">Cash</Option>
                  <Option value="Credit_card">Credit card</Option>
                  <Option value="Debit_card">Debit card</Option>
                  <Option value="Cheque">Cheque</Option>
                  <Option value="Internet_banking">Internet Banking</Option>
                  <Option value="Paytm">Paytm</Option>
                  <Option value="Google_pay">Google Pay</Option>
                  <Option value="Phonepe">Phonepe</Option>
                  <Option value="BHIM_App">BHIM App</Option>
                  <Option value="Others">Others</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Receipt Type" name="receiptType">
                <Select size='large' placeholder="Select Receipt type">
                  <Option value="Manual">Manual</Option>
                  <Option value="Printed">Printed</Option>
                  <Option value="Email">Email</Option>
                  <Option value="SMS">SMS</Option>
                  <Option value="Others">Others</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Start Date" name="startDate">
                <DatePicker format='DD-MM-YYYY' style={{ width: '100%' }} size='large' placeholder='Select start date'/>
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
          <Row gutter={isSmallScreen ? 8 : 16}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Building / Flat no" name={['permanentAddress', 'buildingNo']}>
                <Input size='large' placeholder='Enter building / flat no' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Street" name={['permanentAddress', 'street']}>
                <Input size='large' placeholder='Enter street' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Area" name={['permanentAddress', 'area']}>
                <Input size='large' placeholder='Enter area' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="District" name={['permanentAddress', 'district']}>
                <Input size='large' placeholder='Enter district' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="State" name={['permanentAddress', 'state']}>
                <Input size='large' placeholder='Enter state' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Pin code" name={['permanentAddress', 'postalCode']}  rules={[{ pattern: /^[0-9]{6}$/, message: 'Please enter a valid 6-digit pin code' }]}>
                <Input size='large' placeholder='Enter postalcode' maxLength={6} />
              </Form.Item>
            </Col>
          </Row>
          <Checkbox onChange={onCheckboxChange}>Same as Permanent Address</Checkbox>
          <Typography.Title level={4} style={{ marginTop: '10px' }}>Communication Address</Typography.Title>
          <Row gutter={isSmallScreen ? 8 : 16}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Building / Flat no" name={['communicationAddress', 'buildingNo']}>
                <Input size='large' placeholder='Enter building / flat no' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Street" name={['communicationAddress', 'street']}>
                <Input size='large' placeholder='Enter street' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Area" name={['communicationAddress', 'area']}>
                <Input size='large' placeholder='Enter area' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="District" name={['communicationAddress', 'district']}>
                <Input size='large' placeholder='Enter district'  style={{ textTransform: 'capitalize'}}/>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="State" name={['communicationAddress', 'state']}>
                <Input size='large' placeholder='Enter state' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Pin code" name={['communicationAddress', 'postalCode']}  rules={[{ pattern: /^[0-9]{6}$/, message: 'Please enter a valid 6-digit pin code' }]}>
                <Input size='large' placeholder='Enter postalcode' maxLength={6} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: 'Fitness Details',
      content: (
        <Form layout="vertical">
          <Row gutter={isSmallScreen ? 8 : 16}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Fitness Date" name="fitnessDate">
                <DatePicker format='DD-MM-YYYY' style={{ width: '100%' }} size='large' placeholder='Select fitness date'/>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Weight (kg)" name="weight">
                <Input type="number" size='large' placeholder='Enter weight' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Height (cm)" name="height">
                <Input type="number" size='large' placeholder='Enter height'/>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Typography.Text style={{ marginBottom: '20px', color: 'red' }}>All measurements should be in inches.</Typography.Text>
          </Row>
          <Row gutter={isSmallScreen ? 8 : 18}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Neck (in)" name="neck">
                <Input type='number' size='large' placeholder='Enter neck size'/>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Shoulders" name="shoulders">
                <Input type='number' size='large' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Chest" name="chest">
                <Input type='number' size='large' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Biceps" name="biceps">
                <Input type='number' size='large' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Upper Abs" name="upperAbs">
                <Input type='number' size='large' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Waist" name="waist">
                <Input type='number' size='large' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Lower Abs" name="lowerAbs">
                <Input type='number' size='large' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Hip" name="hip">
                <Input type='number' size='large' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Thigh" name="thigh">
                <Input type='number' size='large' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Calf" name="calf">
                <Input type='number' size='large' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Remarks" name="fitnessRemarks">
                <Input.TextArea size='large' />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
    {
      title: 'Proof Details',
      content: (
        <Form layout="vertical">
          <Row gutter={isSmallScreen ? 8 : 16}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Proof Type" name="proofType">
                <Select size='large'>
                  <Option value="Aadhaar card">Aadhaar card</Option>
                  <Option value="Passport">Passport</Option>
                  <Option value="PAN card">PAN card</Option>
                  <Option value="Voter ID">Voter ID</Option>
                  <Option value="Driving license">Driving license</Option>
                  <Option value="Employee Id Card">Employee Id Card</Option>
                  <Option value="Student Id card">Student Id card</Option>
                  <Option value="Others">Others</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Proof No" name="proofNo">
                <Input size='large' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Expiry Date" name="expiryDate">
                <DatePicker format='DD-MM-YYYY' size='large' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Proof Document" name="proofDocument" valuePropName="file">
                <Upload listType="picture" fileList={proofDocumentFileList} onChange={handleProofDocumentChange} beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />} size='large'>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      ),
    },
  ];

  return (
    <div className="edit-member-form">
      <Typography.Title level={3} style={{ margin: 0, color: '#0A21C0' }}>Edit Member</Typography.Title>
      <Button style={{ marginTop: '8px', marginBottom: '16px' }} onClick={onBack}>
        Back
      </Button>
      <Steps current={currentStep} onChange={handleStepChange}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={{ minWidth: isSmallScreen ? '300px' : isMediumScreen ? '800px' : '1250px', marginTop: '30px', marginLeft: isSmallScreen ? '0px' : '30px' }}>
        {steps[currentStep].content}
      </div>
      <div className="steps-action">
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
          <Button type="primary" onClick={handleEditFormSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default EditMember;
