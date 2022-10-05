import { Button, Form, Input } from "antd";
import React from "react";
import { useAppDispatch } from "../../reducer/hook";
import { UserActions } from "../../reducer/userReducer";
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

const DangNhap = () => {
  const [form] = Form.useForm();
  const router = useRouter()
  const dispatch = useAppDispatch()
  const fetchLogin = (param) => {
    return new Promise((resolve, reject) => {
      dispatch(UserActions.fetchLogin({ param, resolve, reject }));
    });
  };
  const onSubmitForm = (values) => {
    fetchLogin(values).then(res => {
      const {firstname, lastname, phone_number, full_address} = res?.data?.data
      Cookies.set('docu_token', res?.data?.token)
      localStorage.setItem('user_info', JSON.stringify({fullname: `${firstname} ${lastname}`, phone_number: phone_number, full_address: full_address}))
      if(localStorage.getItem('previous_url')){
        router.push(localStorage.getItem('previous_url'))
        localStorage.removeItem('previous_url')
      }
    })
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-main-content">
          <div className="login-main-content-top">
            <div className="login-top-left">
              <span className="login-title">Đăng nhập</span>
              <span className="welcome-text">Chào bạn quay lại</span>
            </div>
            <div className="login-top-right"></div>
          </div>
          <div className="login-main-content-form">
            <Form
              id="login_form"
              form={form}
              layout="vertical"
              name="login_form"
              onFinish={onSubmitForm}
              //   initialValues={formValues}
              scrollToFirstError
              //   validateMessages={validateMessages}
              requiredMark={false}
            >
              <Form.Item name="username" className="custom-form-item">
                <Input
                  placeholder="Nhập username của bạn"
                  className="form-input"
                />
              </Form.Item>
              <Form.Item name="password" className="custom-form-item">
                <Input.Password
                  placeholder="Nhập mật khẩu của bạn"
                  className="form-input"
                />
              </Form.Item>
              <Button form="login_form" key="submit" htmlType="submit">
                Đăng nhập
              </Button>
            </Form>
            <span className="forgot-password-text">Bạn quên mật khẩu?</span>
            <div className="login-social">
              <span className="login-social-text">hoặc sử dụng</span>
              <div className="login-social-icon">
                <img src="images/facebook-icon.png" />
                <img src="images/google-icon.png" />
              </div>
              <div className="register-text">Chưa có tài khoản? <span>Đăng ký ngay</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DangNhap
