import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification, Row, Col, Image, Typography } from 'antd';
import { useNavigate } from 'react-router-dom'; 
import LoginImage from '../assets/images/UndrawImg.svg';
import authService from '../Services/auth.service';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm(); // Create form instance
  const navigate = useNavigate(); // Create navigate function

  useEffect(() => {
    // Check if user is already authenticated on page load
    if (authService.isAuthenticated()) {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      authService.setLogoutTimer(decodedToken.exp); // Set automatic logout timer
      navigate('/sidenav/dashboard');
    }
  }, [navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    const { username, password } = values;
  
    try {
      const data = await authService.login(username, password);
  
      notification.success({
        message: 'Login successful',
        description: 'Welcome back!',
        placement: 'topRight',
        duration: 2,
      });
  
      navigate('/sidenav/dashboard');
      
    } catch (error) {
      notification.error({
        message: 'Login failed',
        description: error.message || 'An unexpected error occurred. Please try again.',
        placement: 'topRight',
        duration: 2.5,
      });
    } finally {
      setLoading(false);
      form.resetFields();
    }
  };
  

  return (
    <div style={{ minHeight: '100vh', width: '98vw', margin: 0, backgroundColor: '#f0f0f0', position: 'relative' }}>
      <style>
        {`
          @media only screen and (max-width: 900px) {
            .login-image {
              width: 100% !important;
              height: auto !important;
              object-fit: cover !important;
              margin-bottom: -3rem !important; /* Reduce bottom margin for smaller screens */
            }
            .login-form {
              width: 100% !important;
              padding: 1rem !important; /* Adjust padding for smaller screens */
            }
            .heading-container {
              position: static !important;
              text-align: center;
              margin-bottom: 1rem !important; /* Reduce margin-bottom for smaller screens */
            }
            .heading {
              font-size: 1.5rem !important; /* Adjust font size for smaller screens */
              
            }
            .image-form-gap {
              margin-bottom: 0 !important; /* Remove or reduce margin below image */
            }
            .login-form .ant-btn {
              width: 100% !important; /* Ensure button fits within the form */
            }
          }

          @media only screen and (max-width: 600px) {
            .login-form {
              overflow-y: auto; /* Enable vertical scrolling */
              padding: 2rem !important;
            }
          }

          @media only screen and (min-width: 900px) and (max-width: 1200px) {
            .login-image {
              width: 90% !important;
            }
            .login-form {
              width: 90% !important;
              padding: 2rem !important;
            }
            .heading-container {
              position: absolute;
              top: 4rem; /* Adjust top position for medium screens */
              left: 5rem; /* Adjust left position for medium screens */
            }
            .heading {
              font-size: 3rem;
            }
          }

          @media only screen and (min-width: 1200px) {
            .login-image {
              width: 1000px !important;
              margin-right: 3rem;
            }
            .login-form {
              width: 100% !important;
              padding: 5rem !important;
            }
            .image-form-gap {
              margin-right: 5rem !important; /* Add gap between image and form */
            }
            .heading-container {
              position: absolute;
              top: 5rem;
              left: 12rem;
            }
            .heading {
              font-size: 4rem;
            }
          }
        `}
      </style>
      <div className="heading-container">
        <Typography.Title level={6} className="heading" style={{ color: '#333' }}>
          Gym Management System
        </Typography.Title>
      </div>
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col xs={24} sm={24} md={20} lg={18} xl={16}>
          {/* Card Layout */}
          <Row justify="center" align="middle" gutter={[10, 16]}>
            <Col xs={24} sm={24} md={12} lg={10} xl={10} className="image-form-gap">
              <Image
                className="login-image"
                src={LoginImage}
                alt="Login Image"
                preview={false}
                style={{
                  borderRadius: '10px',
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={10} xl={10}>
              <div className="login-form" style={{ padding: '1rem' }}>
                <Typography.Title level={3} style={{ textAlign: 'center', marginBottom: '1rem', color: '#333' }} className='lato-regular'>
                  Sign In
                </Typography.Title>
                <Form
                  name="login_form"
                  onFinish={onFinish}
                  layout="vertical"
                  form={form} // Pass form instance to Form component
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    size="large"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your username!',
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Username" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    size="large"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input.Password size="large" placeholder="Password" />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block size="large">
                      Login
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
