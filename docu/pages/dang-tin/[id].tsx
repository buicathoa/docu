import { Carousel, Col, Row } from "antd";
import React from "react";
import {
  EnvironmentOutlined,
  CaretDownOutlined,
  AppstoreOutlined,
  CameraOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";
const DetailNews = () => {
  return (
    <div className="detail-news-wrapper">
      <div className="detail-news-container">
        <Row>
          <Col span={16}>
            <div className="detail-carousel-news">
              <Carousel>
                <img src="/images/bg.jpg" />
                <img src="/images/bg.jpg" />
                <img src="/images/bg.jpg" />
              </Carousel>
            </div>
            <div className="detail-news-information">
              <h1 className="title">J7 đang sài bình thường</h1>
              <span className="price">700.000 đ</span>
              <div className="desc">
                Máy nguyên hộp như máy mới. Còn bảo hành hãng hoặc fpt tháng 2.


                2022. Phụ kiện đầy đủ. I3. The hệ 11 máy màn hình tràn viền. rất
                đẹp CPU: i31115G43GHz RAM: 4 GBDDR4 2 khe (1 khe 4 GB + 1 khe
                rời)2666 MHz Ổ cứng: 256 GB SSD NVMe PCIe (Có thể tháo ra, lắp
                thanh khác tối đa 1TB)Hỗ trợ khe cắm HDD SATA (nâng cấp tối đa
                2TB) Màn hình: 15.6inch Full HD (1920 x 1080) kết nối Bluetooth
              </div>
            </div>
            <div className="detail-news-attributes">
              <div className="attributes-item">
                Hãng: <span>Samsung</span>
              </div>
              <div className="attributes-item">
                Dòng máy: <span>Galaxy J7</span>
              </div>
              <div className="attributes-item">
                Tình trạng: <span>Đã sử dụng (chưa sửa chữa)</span>
              </div>
              <div className="attributes-item">
                Màu sắc: <span>Vàng</span>
              </div>
            </div>
            <div className="detail-news-location">
              <div className="detail-news-location-title">Khu vực</div>
              <div className="detail-news-location-desc">
                <EnvironmentOutlined />
                <span className="address">
                  Phường Long Trường (Quận 9 cũ), Thành phố Thủ Đức , Tp Hồ Chí
                  Minh
                </span>
              </div>
            </div>
            <div className="detail-news-quick-message">
              <div className="detail-news-quick-message-title">
                Hỏi người bán qua chat
              </div>
              <div className="detail-news-quick-message-flex">
                <ul>
                    <li>Điện thoại này còn không?</li>
                    <li>Điện thoại này còn không?</li>
                    <li>Điện thoại này còn không?</li>
                    <li>Điện thoại này còn không?</li>
                    <li>Điện thoại này còn không?</li>
                    <li>Điện thoại này còn không?</li>
                </ul>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="detail-news-seller-infor">
              <div className="detail-news-seller-infor-host">
                <div className="detail-news-seller-infor-host-left"></div>
                <div className="detail-news-seller-infor-host-right">
                  <span>Xem trang</span>
                </div>
              </div>
              <div className="detail-news-seller-infor-contact">
                <div className="phone-number-contact"></div>
                <div className="chat-contact"></div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DetailNews;
