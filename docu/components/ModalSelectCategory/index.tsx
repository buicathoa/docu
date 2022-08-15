import { Modal } from "antd";
import React, { useEffect } from "react";
import { InterfaceModalCategory } from "../../interface";
import {
    QqOutlined,
    RightOutlined
  } from "@ant-design/icons";
import { useAppDispatch } from "../../reducer/hook";
import { CategoryAction } from "../../reducer/categoryReducer";

const ModalSelectCategory = (props:InterfaceModalCategory) => {
  const dispatch = useAppDispatch();
  const createComponentDashboard = (param) => {
    return new Promise((resolve, reject) => {
      dispatch(CategoryAction.fetchListCategory({param, resolve, reject}))
    })
}

  useEffect(() => {
    createComponentDashboard({}).then(res => {
      debugger
    })
  }, [])

  const {visible, setVisible} = props;

  const handleCancel = () => {
    // props.setVisible(false);
  };
  
  return (
    <Modal title="Đăng tin" visible={visible} onCancel={handleCancel}>
      <div className="modal-category-content">
        <div className="modal-category-content-container">
          <span className="title">CHỌN DANH MỤC</span>
          <div className="modal-category-list">
            <div className="modal-category-item">
              <div className="modal-category-left">
                <QqOutlined /><span className="modal-category-left-title">Bất động sản</span>
              </div>
              <div className="modal-category-right">
              <RightOutlined />
              </div>
            </div>
            <div className="modal-category-item">
              <div className="modal-category-left">
                <QqOutlined /><span className="modal-category-left-title">Bất động sản</span>
              </div>
              <div className="modal-category-right">
              <RightOutlined />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalSelectCategory;
