import { Button, Checkbox, Col, Form, Input, message, Row } from "antd";
import React, { useState } from "react";
import "../../style/Login.css";
import LoginGoogle from "../../asset/Login_With_Google.png";
import Image from "../../asset/Login_Image.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const navigate = useNavigate();

  const onFinish = () => {
    message.success("Submit success!");
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  console.log(username);
  console.log(password);
  console.log(fullname);

  const handleSignUp = () =>
    axios
      .post("https://localhost:44377/api/users", {
        username: username,
        password: password,
        fullname: fullname,
      })
      .then(function (response) {
        console.log(response.data.data);
        navigate('/')
      })
      .catch(function (error) {
        console.log(error);
      });

  return (
    <div className="login-container">
      <Row className="login-background">
        <Col flex={23} className="login-form-container">
          <Form
            name="basic"
            layout="vertical"
            className="login-form-left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 20 }}
            style={{ maxWidth: 642 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h1 style={{ color: "#FACD66", marginTop: "8%", fontSize: "32px" }}>Register</h1>
            <Form.Item
              label="Username"
              name="Username"
              rules={[{ required: true, message: "Please input your Username!" }]}
            >
              <Input onChange={(e) => setUsername(e.target.value)} placeholder="Input Username" style={{height: "48px"}}/>
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password onChange={(e) => setPassword(e.target.value)} placeholder="Input password" style={{height: "48px"}}/>
            </Form.Item>
            <Form.Item
              label="Full name"
              name="Full name"
              rules={[{ required: true, message: "Please input your Full name!" }]}
            >
              <Input onChange={(e) => setFullname(e.target.value)} placeholder="Input Full name" style={{height: "48px"}}/>
            </Form.Item>
            <Form.Item>
              <Button onClick={handleSignUp} style={{marginTop: "8%"}} className="login-submit" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
            {/* <Form.Item className="login-google">
              <p>or continue with</p>
              <img src={LoginGoogle} alt="Logo" />
            </Form.Item> */}
            <Form.Item className="login-google">
              <span>Have an account? </span>
              <a
                style={{ color: "#FFF" }}
                className="login-form-register"
                href="/"
              >
                Sign in here.
              </a>
            </Form.Item>
          </Form>
        </Col>
        <Col className="login-image" flex={1}>
          <img src={Image} alt="" />
        </Col>
      </Row>
    </div>
  );
}

export default SignUp;
