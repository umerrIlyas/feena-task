import React, { useEffect, useState } from "react";
import { Alert, Button, Card, Form, Input } from "antd";
import axios from "axios";
import { baseURL } from "../config/config";

const AddCampaign = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [visible, setVisible] = useState(true);
  const handleClose = () => {
    setVisible(false);
    setAlertMessage("");
  };

  const postCampaign = async (values) => {
    setLoading(true);
    setVisible(true);

    const res = await axios.post(`${baseURL}/campaigns`, values);

    setAlertMessage(res.data.message);
    setLoading(false);
  };
  const onFinish = async (values) => {
    postCampaign(values);
    form.resetFields();
  };

  return (
    <Card
      style={{
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
      }}
    >
      {visible && alertMessage && (
        <Alert
          style={{ marginBottom: "10px" }}
          closable
          message={alertMessage}
          afterClose={handleClose}
          type="success"
          showIcon
        />
      )}
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onFinish}
      >
        <Form.Item name="Campaign Name">
          <Input placeholder="Campaign Name" />
        </Form.Item>
        <Form.Item name="quantity">
          <Input type="number" placeholder="Quantity" />
        </Form.Item>
        <Button
          disabled={loading}
          loading={loading}
          type="primary"
          htmlType="submit"
        >
          {!loading && "+"}
        </Button>
      </Form>
    </Card>
  );
};

export default AddCampaign;
