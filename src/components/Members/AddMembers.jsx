import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Col, Select, DatePicker, Radio, Checkbox, Upload, Steps, Typography, notification, Alert } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { saveToLocalForage } from '../../Utils/syncUtils.jsx';
import { saveMember, getAllPackages, getAllStaffname } from '../../Services/data.services.jsx';
import { useMediaQuery } from 'react-responsive';
import jsPDF from 'jspdf';

const { Option } = Select;
const { Step } = Steps;

const AddMember = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [staffDetails, setStaffDetails] = useState([]);
  const [packages, setPackages] = useState([]);
  const [memberPhotoFileList, setMemberPhotoFileList] = useState([]);
  const [proofDocumentFileList, setProofDocumentFileList] = useState([]);

  // Define breakpoints for responsiveness
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1199px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const result = await getAllStaffname();
        if (result.code === 200) {
          setStaffDetails(result.staffdetails);
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

  const handleStepChange = async (current) => {
    try {
      await form.validateFields({ force: true });
      setCurrentStep(current);
    } catch (errorInfo) {
      console.error('Validation failed:', errorInfo);
    }
  };


  const generatePDF = async (memberData) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Generate the receipt in the PDF
    doc.setFontSize(16);
    doc.text('Member Details Receipt', pageWidth / 2, 10, { align: 'center' });
    doc.setFontSize(12);

    let yPosition = 20;
    const lineHeight = 10;

    // Helper function to display nested object fields
    const appendAddressFields = (address, addressLabel) => {
      doc.setFontSize(14);
      doc.text(`${addressLabel}:`, 10, yPosition);
      yPosition += lineHeight;

      doc.setFontSize(12);
      Object.keys(address).forEach(key => {
        doc.text(`${key}: ${address[key]}`, 20, yPosition);
        yPosition += lineHeight;
      });
    };

    // Function to convert uploaded file to base64
    const getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        const fileToRead = file.originFileObj || file; // Handle originFileObj or use file directly
        if (!fileToRead) {
          reject('No file available to read');
          return;
        }
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(fileToRead);
      });
    };

    // Loop over the member data and print to PDF
    for (const key in memberData) {
      if (typeof memberData[key] === 'object' && memberData[key] !== null) {
        // Handle specific array fields like address
        if (key === 'permanentAddress') {
          appendAddressFields(memberData.permanentAddress, 'Permanent Address');
        } else if (key === 'communicationAddress') {
          appendAddressFields(memberData.communicationAddress, 'Communication Address');
        } else if (key === 'memberPhoto' && memberData[key] && memberData[key].file) {
          // Handle uploaded member photo and convert it to base64
          const base64Image = await getBase64(memberData[key].file.originFileObj || memberData[key].file);
          doc.text('Member Photo:', 10, yPosition);
          yPosition += lineHeight;
          doc.addImage(base64Image, 'JPEG', 10, yPosition, 50, 50);  // Adjust position and size as needed
          yPosition += 60; // Leave space after the image
        } else if (key === 'proofDocument' && memberData[key] && memberData[key].file) {
          // Handle uploaded proof document and convert it to base64
          const base64Proof = await getBase64(memberData[key].file.originFileObj || memberData[key].file);
          doc.text('Proof Document:', 10, yPosition);
          yPosition += lineHeight;
          doc.addImage(base64Proof, 'JPEG', 10, yPosition, 50, 50);  // Adjust position and size as needed
          yPosition += 60; // Leave space after the image
        } else {
          doc.text(`${key}: ${JSON.stringify(memberData[key])}`, 10, yPosition);
          yPosition += lineHeight;
        }
      } else {
        doc.text(`${key}: ${memberData[key]}`, 10, yPosition);
        yPosition += lineHeight;
      }

      // Add new page if content overflows
      if (yPosition >= pageHeight - 20) {
        doc.addPage();
        yPosition = 10;
      }
    }

    // Save the PDF file
    doc.save('MemberDetailsReceipt.pdf');
  };


  // Separate file change handler for member photo
  const handleMemberPhotoChange = (info) => {
    setMemberPhotoFileList(info.fileList);  // Update member photo file list
  };

  // Separate file change handler for proof document
  const handleProofDocumentChange = (info) => {
    setProofDocumentFileList(info.fileList);  // Update proof document file list
  };

  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      const allValues = form.getFieldsValue(true);
  
      // Prepare the payload with address and other parsed values
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
  
      // Parse numeric fields
      const parsedValues = fieldsToParse.reduce((acc, field) => {
        if (allValues[field] !== undefined) {
          acc[field] = parseFloat(allValues[field]);
        }
        return acc;
      }, {});
  
      // Prepare the payload for submission
      const payload = {
        ...allValues,
        ...parsedValues,
        permanentAddress: JSON.stringify(permanentAddress),
        communicationAddress: JSON.stringify(communicationAddress),
        isMainPackage: allValues.isMainPackage || false,
        active: allValues.active || true,
        memberPhoto: memberPhotoFileList[0]?.originFileObj || null,
        proofDocument: proofDocumentFileList[0]?.originFileObj || null,
      };
  
      const formData = new FormData();
      Object.keys(payload).forEach(key => {
        if (key === 'memberPhoto' && payload[key]) {
          formData.append(key, payload[key]); // Append the file
        } else if (key === 'proofDocument' && payload[key]) {
          formData.append(key, payload[key]); // Append the file
        } else {
          formData.append(key, payload[key]);
        }
      });
  
      const result = await saveMember(formData); // Save the member using service
  
      notification.success({
        message: 'Success',
        description: 'Member added successfully!',
      });
  
      // Generate and download the receipt as PDF
      generatePDF(payload);
  
      form.resetFields();
      onBack();
  
    } catch (errorInfo) {
      if (errorInfo.errorFields && errorInfo.errorFields.length > 0) {
        notification.error({
          message: 'Error',
          description: 'Please fill all the required fields!',
        });
      } else {
        notification.error({
          message: 'Error',
          description: 'An unexpected error occurred. Please try again later.',
        });
      }
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

  const handlePackageChange = (packageName) => {
    const selectedPackage = packages.find(pkg => pkg.packageName === packageName);
    if (selectedPackage) {
      form.setFieldsValue({
        packageAmount: selectedPackage.amount,
        duration: `${selectedPackage.month} months ${selectedPackage.day} days`,
      });
    } else {
      // If no package is found or selected, clear the fields
      form.setFieldsValue({
        packageAmount: '',
        duration: '',
      });
    }
  };

  // Define column spans based on screen size
  const columnSpan = isLargeScreen ? 6 : isMediumScreen ? 8 : 24;

  const steps = [
    {
      title: 'Basic Details',
      content: (
        <Form form={form} layout="vertical">
          <Row gutter={20}>
            <Col span={columnSpan}>
              <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: 'Please enter first name' }]}>
                <Input size='large' placeholder='Enter Firstname' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Last Name" name="lastName" >
                <Input size='large' placeholder="Enter Lastname" style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Email" name="email" rules={[
                { type: 'email', message: 'Please enter a valid email' },
              ]}>
                <Input size='large' placeholder='Enter Email' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={columnSpan}>
              <Form.Item label="Mobile Number" name="mobileNumber" rules={[
                { required: true, message: 'Please enter mobile number' },
                { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' },
              ]}>
                <Input size='large' placeholder='Enter Mobile Number' maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Date of Birth" name="dateOfBirth">
                <DatePicker format='DD-MM-YYYY' style={{ width: '100%' }} size='large' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Gender" name="gender">
                <Select size='large' placeholder='Choose Gender'>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Transgender">Transgender</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={columnSpan}>
              <Form.Item label="Home Contact Number" name="homeContactNumber" rules={[
                { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit mobile number' },
              ]}>
                <Input size='large' placeholder='Enter Home Contact Number' maxLength={10} />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Blood Group" name="bloodGroup">
                <Select size='large' placeholder='Choose Bloodgroup'>
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
            <Col span={columnSpan}>
              <Form.Item label="Marital Status" name="maritalStatus">
                <Radio.Group size='large'>
                  <Radio value="Single">Single</Radio>
                  <Radio value="Married">Married</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={columnSpan}>
              <Form.Item label="GST Number" name="gstNumber">
                <Input size='large' placeholder='Enter GST Number' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Member Photo" name="memberPhoto" valuePropName="file">
                <Upload fileList={memberPhotoFileList} onChange={handleMemberPhotoChange} beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />} size='medium'>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Remarks" name="remarks">
                <Input.TextArea
                  placeholder='Enter remarks if any'
                  onChange={(e) => {
                    const value = e.target.value;
                    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1); // Capitalize the first letter
                    form.setFieldValue('remarks', formattedValue); // Set the formatted value in the form
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={columnSpan} style={{ marginTop: '30px' }}>
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
          <Row gutter={16}>
            <Col span={columnSpan}>
              <Form.Item label="Assign Trainer" name="assignTrainer">
                <Select size='large' placeholder="Choose Trainer">
                  {staffDetails.map(st => (
                    <Option key={st.employeeCode} value={st.name}>{st.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="GST Type" name="gstType">
                <Select size='large' placeholder="Choose GST type">
                  <Option value="NA">NA</Option>
                  <Option value="EXCLUDED">Excluded</Option>
                  <Option value="INCLUDED">Included</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item
                label="Package Type"
                name="packageType"
              >
                <Select size="large" onChange={handlePackageChange} placeholder="Choose Package">
                  {packages.map(pkg => (
                    <Option key={pkg.id} value={pkg.packageName}>
                      {pkg.packageName}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item name="isMainPackage" valuePropName="checked" style={{ marginTop: '30px' }}>
                <Checkbox>Is main package?</Checkbox>
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Package Amount" name="packageAmount">
                <Input type="number" size="large" disabled />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="GST Amount" name="gstamount">
                <Input type="number" size='large' placeholder='Enter GST amount' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Duration" name="duration">
                <Input size="large" disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={columnSpan}>
              <Form.Item label="Discount" name="discount">
                <Input type="number" size='large' placeholder='Enter discount amount' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Paid Amount" name="paidAmount">
                <Input type="number" size='large' placeholder='Enter paid amount' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Paid Date" name="paidDate">
                <DatePicker format='DD-MM-YYYY' style={{ width: '100%' }} size='large' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Payment Mode" name="paymentMode">
                <Select size='large' placeholder="Choose Payment mode">
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
            <Col span={columnSpan}>
              <Form.Item label="Receipt Type" name="receiptType">
                <Select size='large' placeholder="Choose Receipt type">
                  <Option value="Manual">Manual</Option>
                  <Option value="Printed">Printed</Option>
                  <Option value="Email">Email</Option>
                  <Option value="SMS">SMS</Option>
                  <Option value="Others">Others</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Start Date" name="startDate">
                <DatePicker format='DD-MM-YYYY' style={{ width: '100%' }} size='large' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Remarks" name="remarks">
                <Input.TextArea
                  placeholder='Enter remarks if any'
                  onChange={(e) => {
                    const value = e.target.value;
                    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1); // Capitalize the first letter
                    form.setFieldValue('remarks', formattedValue); // Set the formatted value in the form
                  }}
                />
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
          <Row gutter={16}>
            <Col span={columnSpan}>
              <Form.Item label="Building / Flat no" name={['permanentAddress', 'buildingNo']}>
                <Input size='large' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Street" name={['permanentAddress', 'street']}>
                <Input size='large' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Area" name={['permanentAddress', 'area']}>
                <Input size='large' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="District" name={['permanentAddress', 'district']}>
                <Input size='large' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="State" name={['permanentAddress', 'state']}>
                <Input size='large' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Pin code" name={['permanentAddress', 'postalCode']} rules={[{ pattern: /^[0-9]{6}$/, message: 'Please enter a valid 6-digit pin code' }]}>
                <Input size='large' maxLength={6} />
              </Form.Item>
            </Col>
          </Row>
          <Checkbox onChange={onCheckboxChange}>Same as Permanent Address</Checkbox>
          <Typography.Title level={4} style={{ marginTop: '10px' }}>Communication Address</Typography.Title>
          <Row gutter={16}>
            <Col span={columnSpan}>
              <Form.Item label="Building / Flat no" name={['communicationAddress', 'buildingNo']}>
                <Input size='large' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Street" name={['communicationAddress', 'street']}>
                <Input size='large' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Area" name={['communicationAddress', 'area']}>
                <Input size='large' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="District" name={['communicationAddress', 'district']}>
                <Input size='large' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="State" name={['communicationAddress', 'state']}>
                <Input size='large' style={{ textTransform: 'capitalize' }} />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Pin code" name={['communicationAddress', 'postalCode']} rules={[ { pattern: /^[0-9]{6}$/, message: 'Please enter a valid 6-digit pin code' }]}>
                <Input size='large' maxLength={6} />
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
          <Row gutter={16}>
            <Col span={columnSpan}>
              <Form.Item label="Fitness Date" name="fitnessDate">
                <DatePicker format='DD-MM-YYYY' style={{ width: '100%' }} size='large' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Weight (kg)" name="weight">
                <Input type="number" size='large' placeholder='Enter weight' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Height (cm)" name="height">
                <Input type="number" size='large' placeholder='Enter Height' />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Alert
              message="All the measurements are in Inches."
              type="info"
              showIcon
              style={{ marginBottom: '20px' }}
            />
          </Row>
          <Row gutter={18}>
            <Col span={columnSpan}>
              <Form.Item label="Neck (in)" name="neck">
                <Input type='number' size='large' placeholder='Enter neck measurement' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Shoulders" name="shoulders">
                <Input type='number' size='large' placeholder='Enter shoulders measurement' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Chest" name="chest">
                <Input type='number' size='large' placeholder='Enter chest measurement' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Biceps" name="biceps">
                <Input type='number' size='large' placeholder='Enter biceps measurement' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Upper Abs" name="upperAbs">
                <Input type='number' size='large' placeholder='Enter upperabs measurement' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Waist" name="waist">
                <Input type='number' size='large' placeholder='Enter waist measurement' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Lower Abs" name="lowerAbs">
                <Input type='number' size='large' placeholder='Enter lowerabs measurement' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Hip" name="hip">
                <Input type='number' size='large' placeholder='Enter hip measurement' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Thigh" name="thigh">
                <Input type='number' size='large' placeholder='Enter thigh measurement' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Calf" name="calf">
                <Input type='number' size='large' placeholder='Enter calf measurement' />
              </Form.Item>
            </Col>
            <Col span={isSmallScreen ? 24 : isMediumScreen ? 12 : 6}>
              <Form.Item label="Remarks" name="remarks">
                <Input.TextArea
                  placeholder='Enter remarks if any'
                  onChange={(e) => {
                    const value = e.target.value;
                    const formattedValue = value.charAt(0).toUpperCase() + value.slice(1); // Capitalize the first letter
                    form.setFieldValue('remarks', formattedValue); // Set the formatted value in the form
                  }}
                />
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
          <Row gutter={16}>
            <Col span={columnSpan}>
              <Form.Item label="Proof Type" name="proofType">
                <Select size='large' placeholder="Choose Proof type">
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
            <Col span={columnSpan}>
              <Form.Item label="Proof No" name="proofNo">
                <Input size='large' placeholder='Enter Proof number' />
              </Form.Item>
            </Col>
            <Col span={columnSpan}>
              <Form.Item label="Expiry Date" name="expiryDate">
                <DatePicker format='DD-MM-YYYY' size='large' style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={columnSpan}>
              <Form.Item label="Proof Document" name="proofDocument" valuePropName="file">
                <Upload fileList={proofDocumentFileList} onChange={handleProofDocumentChange} beforeUpload={() => false}>
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
    <div className="add-member-form">
      <Typography.Title level={3} style={{ margin: 0, color: '#0A21C0' }}>Add Member</Typography.Title>
      <Button style={{ marginTop: '8px', marginBottom: '16px' }} onClick={onBack}>
        Back
      </Button>
      <Steps current={currentStep} onChange={handleStepChange}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={{ width: isSmallScreen ? '100%' : isMediumScreen ? '80%' : '1250px', marginTop: '30px', marginLeft: isSmallScreen ? '0' : '30px' }}>
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
          <Button type="primary" onClick={handleFormSubmit}>
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default AddMember;
