import { Button, Checkbox, Col, Form, Input, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import "../../style/Login.css";
import LoginGoogle from "../../asset/Login_With_Google.png";
import Image from "../../asset/Login_Image.png";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [tokenLogin, setTokenLogin] = useState('')
  const [role, setRole] = useState('')

  const onFinish = () => {
    message.success("Submit success!");
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  if (tokenLogin.length !== 0 && role === 'User') {
    navigate('/home');
  }

  if (tokenLogin.length !== 0 && role === 'Admin') {
    navigate('/adminHome');
  }

  const handleLogin = () =>
    axios
      .post("https://localhost:44377/api/auth", {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log(response.data.data);
        setTokenLogin(response.data.data);
        setRole(jwt_decode(response.data.data).role);
        localStorage.setItem('tokenLogin', response.data.data);
        localStorage.setItem('role', jwt_decode(response.data.data).role);
        localStorage.setItem('username', jwt_decode(response.data.data).username);
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
            <h1 style={{ color: "#FACD66", fontSize: "32px" }}>Login</h1>
            <Form.Item
              label="Username"
              name="Username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                placeholder="Input Username"
                onChange={(e) => setUserName(e.target.value)}
                style={{ height: "48px" }}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Input password"
                style={{ height: "48px" }}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ color: "#FFF" }}>Remember me</Checkbox>
              </Form.Item>

              <a
                className="login-form-forgot"
                style={{ float: "right", color: "#FFF" }}
                href=""
              >
                Forgot password
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={handleLogin}
                className="login-submit"
                htmlType="submit"
              >
                Sign In
              </Button>
            </Form.Item>
            {/* <Form.Item className="login-google">
              <p>or continue with</p>
              <img src={LoginGoogle} alt="Logo" />
            </Form.Item> */}
            <Form.Item className="login-google">
              <span>Don’t have an account yet? </span>
              <a
                style={{ color: "#FFF" }}
                className="login-form-register"
                href="/signUp"
              >
                Register for free.
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

export default Login;
