import React, { useEffect, useState } from "react";
import {
  FilterOutlined,
  CaretDownOutlined,
  AppstoreOutlined,
  CameraOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";
import { Checkbox, Col, Form, Row, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import ModalSelectCategory from "../../components/ModalSelectCategory";
import { getBase64, validFileType } from "../../utils/helper";
const Dangtin = () => {
  const { Option } = Select;
  const [isOpenModalCategory, setIsOpenModalCategory] = useState(false);
  const [listImage, setListImage] = useState([]);
  const [fileUploaded, setFileUploaded] = useState([]);
  const listAction = [
    { label: "message", value: "text" },
    { label: "message", value: "text" },
    { label: "message", value: "text" },
  ];
  const [form] = Form.useForm();
  // useEffect(() => {
  //     form.resetFields()
  // }, [formValues])

  const onSubmitForm = () => {};

  const handleOpenModalCategory = () => {
    setIsOpenModalCategory(true);
  };

  const onSubmitFile = async (event) => {
    const file = event.target.files[0];
    file.preview = await getBase64(file);
    const listImg = listImage.concat(file);
    debugger;
    setListImage(listImg);
  };

  return (
    <div className="post-news-wrapper">
      <div className="post-news-container">
        <Row>
          <Col className="post-news-col-first" sm={24} md={8} lg={8}>
            <div className="post-news-left">
              {listImage.length === 0 ? (
                <label htmlFor="upload_avatar">
                  <div className="image-default">
                    <CameraOutlined />
                    <span>Đăng từ 01 - 06 hình</span>
                  </div>
                </label>
              ) : (
                <div className="list-images">
                  <label htmlFor="upload_avatar">
                    <div className="plus-images-button">+</div>
                  </label>
                    {listImage.map((item, index) => {
                      return (
                        <div className="images-preview-item" key={index}>
                          <img src={item?.preview} />
                        </div>
                      );
                    })}
                </div>
              )}
              <input
                className="input-file"
                type="file"
                id="upload_avatar"
                onChange={(e) => onSubmitFile(e)}
              />
              <div className="video-defalt">
                <VideoCameraAddOutlined />
                <span>Đăng video</span>
              </div>
            </div>
          </Col>
          <Col className="post-news-col-second" md={16} lg={16} sm={24}>
            <div className="post-news-right">
              <div
                className="categories-select select-item"
                onClick={handleOpenModalCategory}
              >
                <div className="categories-left-top">
                  <span>Danh mục tin đăng</span>
                  <span>Đồ điện tử - Điện thoại</span>
                </div>
                <CaretDownOutlined />
              </div>
              <div className="news-information">
                <span className="news-information-title">
                  Thông tin chi tiết
                </span>
                <Form
                  id="edit_customer_form"
                  form={form}
                  layout="vertical"
                  name="edit_customer_form"
                  onFinish={onSubmitForm}
                  //   initialValues={formValues}
                  scrollToFirstError
                  //   validateMessages={validateMessages}
                  requiredMark={false}
                >
                  <div className="dynamic-filter">
                    <Form.Item name="role_id" className="custom-form-item">
                      <Select
                        className="form-select"
                        allowClear
                        labelInValue
                        virtual={false}
                        placeholder={"role"}
                      >
                        {listAction?.length > 0 &&
                          listAction.map((item, index) => {
                            return (
                              <Option value={item.value} key={index}>
                                {item.label}
                              </Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                    <Form.Item name="role_id" className="custom-form-item">
                      <Select
                        className="form-select"
                        allowClear
                        labelInValue
                        virtual={false}
                        placeholder={"role"}
                      >
                        {listAction?.length > 0 &&
                          listAction.map((item, index) => {
                            return (
                              <Option value={item.value} key={index}>
                                {item.label}
                              </Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                    <Form.Item name="role_id" className="custom-form-item">
                      <Select
                        className="form-select"
                        allowClear
                        labelInValue
                        virtual={false}
                        placeholder={"role"}
                      >
                        {listAction?.length > 0 &&
                          listAction.map((item, index) => {
                            return (
                              <Option value={item.value} key={index}>
                                {item.label}
                              </Option>
                            );
                          })}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name="is_use_webchat"
                      valuePropName="checked"
                      className="custom-form-item form-checkbox"
                    >
                      <Checkbox className="form-checkbox">
                        Cho tặng miễn phí
                      </Checkbox>
                    </Form.Item>
                    <div className="title-desc">
                      <span className="title-desc-title">Tiêu đề và mô tả</span>
                      <Form.Item name="role_id" className="custom-form-item">
                        <Select
                          className="form-select"
                          allowClear
                          labelInValue
                          virtual={false}
                          placeholder={"role"}
                        >
                          {listAction?.length > 0 &&
                            listAction.map((item, index) => {
                              return (
                                <Option value={item.value} key={index}>
                                  {item.label}
                                </Option>
                              );
                            })}
                        </Select>
                      </Form.Item>
                      <Form.Item name="hihi" className="custom-form-item">
                        <TextArea
                          className="form-textarea"
                          placeholder="oidoioi"
                        />
                      </Form.Item>
                    </div>
                    <div className="seller-infor">
                      <span className="seller-infor-title">Người bán</span>
                      <Form.Item name="role_id" className="custom-form-item">
                        <Select
                          className="form-select"
                          allowClear
                          labelInValue
                          virtual={false}
                          placeholder={"Cá nhân/bán chuyên"}
                        >
                          {listAction?.length > 0 &&
                            listAction.map((item, index) => {
                              return (
                                <Option value={item.value} key={index}>
                                  {item.label}
                                </Option>
                              );
                            })}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="address-seller-infor">
                      <div className="categories-select select-item">
                        <div className="categories-left-top">
                          <span>Địa chỉ</span>
                          <span>
                            13/1 Vinh sơn liêm, phường 12, quận tân bình
                          </span>
                        </div>
                        <CaretDownOutlined />
                      </div>
                    </div>
                  </div>
                  <div className="button-post-news">
                    <span className="preview">Xem trước</span>
                    <span className="post-news">Đăng tin</span>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <ModalSelectCategory
        visible={isOpenModalCategory}
        setVisible={(event) => setIsOpenModalCategory(event)}
      />
    </div>
  );
};

export default Dangtin;
