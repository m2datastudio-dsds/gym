import React from 'react';
import { Row, Col, Input, Button, Select, Typography, Form } from 'antd';

const { Option } = Select;
const { Title, Text } = Typography;

const BusinessInfo = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Title level={3} style={{ marginBottom: '20px' }}>Business Info</Title>

      {/* Section 1: Basic Details */}
      <Title level={4} style={{ marginBottom: '20px' }}>1. Basic Details</Title>

      <Form layout="vertical">
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Business Name">
              <Input defaultValue="Oxygen unisex fitness solution" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Contact Person">
              <Input defaultValue="Vijaya baskar A" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Mobile Number">
              <Input defaultValue="9566956628" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Email ID">
              <Input defaultValue="oxygenfitness2011@gmail.com" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Address">
              <Input defaultValue="No. 2 Venkat Nagar, Redhills road, Ko" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="State">
              <Select defaultValue="Tamil Nadu">
                <Option value="Tamil Nadu">Tamil Nadu</Option>
                <Option value="Kerala">Kerala</Option>
                <Option value="Karnataka">Karnataka</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="District">
              <Input defaultValue="Chennai" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Pin Code">
              <Input defaultValue="600099" />
            </Form.Item>
          </Col>
        </Row>

        {/* Section 2: Configuration */}
        <Title level={4} style={{ marginBottom: '20px' }}>2. Configurations</Title>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Business Logo:">
              <Button type="primary" style={{ marginRight: '10px' }}>Take Photo</Button>
              <Button>Choose File</Button>
            </Form.Item>
          </Col>
        </Row>

        {/* Section 3: Payment Details */}
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Package Name">
              <Text>Monthly Subscription</Text>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Payment Amount">
              <Text>₹499.00</Text>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Paid Amount">
              <Text style={{ color: 'green' }}>₹0.00</Text>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item label="Pending Amount">
              <Text style={{ color: 'red' }}>₹499.00</Text>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Expiry Date">
              <Text>23/06/2024</Text>
            </Form.Item>
          </Col>
        </Row>

        {/* Save Button */}
        <Row>
          <Col span={8}>
            <Button type="primary">Save</Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default BusinessInfo;
