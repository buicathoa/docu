import React, { useState } from "react";
import { NewsItem } from "../components/NewsItem";
import {
  FilterOutlined,
  CaretDownOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import Carousels from "../components/Home/Carousels";
import { Row, Col, Popover } from "antd";


// export const  getServerSideProps =(context) => {
//   return {
//     props: {
//       news: context.query
//     }
// }
// }

const ListPosts = () => {
  const [pageType, setPageType] = useState(true)
  return (
    <div className="list-posts-filter-wrapper">
      <div className="list-posts-filter">
        <div className="list-posts-filter-container">
          <div className="filter-content">
            <FilterOutlined />
            <span>Lọc</span>
          </div>
          <div className="filter-content">
            <FilterOutlined />
            <span>Toàn quốc</span>
          </div>
          <div className="filter-content">
            <span>Máy tính bảng</span>
          </div>
          <div className="filter-content">
            <FilterOutlined />
            <span>Hãng</span>
          </div>
          <div className="filter-content">
            <FilterOutlined />
            <span>Giá</span>
          </div>
        </div>
      </div>
      <div className="list-posts-content-container">
        <Carousels />
        <div className="list-posts-content-title">
          <h1>
            Acer Iconia A1 830 Mới 100%, Chính Hãng, Giá Rẻ 2022 Toàn quốc
          </h1>
        </div>
        <Row>
          <Col span={16}>
            <div className="list-posts-cate">
              <div className="posts-cate-item">
                <img src="images/samsung.png" />
                <span>Samsung</span>
              </div>
              <div className="posts-cate-item">
                <img src="images/samsung.png" />
                <span>Samsung</span>
              </div>
              <div className="posts-cate-item">
                <img src="images/samsung.png" />
                <span>Samsung</span>
              </div>
              <div className="posts-cate-item">
                <img src="images/samsung.png" />
                <span>Samsung</span>
              </div>
              <div className="posts-cate-item">
                <img src="images/samsung.png" />
                <span>Samsung</span>
              </div>
              <div className="posts-cate-item">
                <img src="images/samsung.png" />
                <span>Samsung</span>
              </div>
            </div>
            <div className="list-posts-main-content">
              <div className="list-posts-filter-flex">
                <div className="list-posts-filter-left">
                  <div className="list-posts-filter-left-item">
                    <span> Tất cả </span>
                  </div>
                  <div className="list-posts-filter-left-item">
                    <span> Cá nhân </span>
                  </div>
                  <div className="list-posts-filter-left-item">
                    <span> Bán chuyên </span>
                  </div>
                </div>
                <div className="list-posts-filter-right">
                  <div className="list-posts-filter-time">
                    <Popover
                      placement="top"
                      content={
                        <div>
                          <span>Tin liên quan trước</span>
                          <span>Tin mới trước</span>
                          <span>Giá thấp trước</span>
                        </div>
                      }
                      trigger="click"
                    >
                      <span className="popover-selected">Tin liên quan trước</span>
                      <CaretDownOutlined />
                    </Popover>
                  </div>
                  <div className="list-posts-filter-grid" onClick={() => setPageType(!pageType)}>
                    <AppstoreOutlined />
                  </div>
                </div>
              </div>
              <div className="list-posts-main-list">
                <Row>
                  <NewsItem pageType={"dynamic"} type={pageType ? 'list' : 'grid'}/>
                  <NewsItem pageType={"dynamic"}  type={pageType ? 'list' : 'grid'}/>
                  <NewsItem pageType={"dynamic"}  type={pageType ? 'list' : 'grid'}/>
                  <NewsItem pageType={"dynamic"}  type={pageType ? 'list' : 'grid'}/>
                  <NewsItem pageType={"dynamic"}  type={pageType ? 'list' : 'grid'}/>
                  <NewsItem pageType={"dynamic"}  type={pageType ? 'list' : 'grid'}/>
                  <NewsItem pageType={"dynamic"}  type={pageType ? 'list' : 'grid'}/>
                  <NewsItem pageType={"dynamic"}  type={pageType ? 'list' : 'grid'}/>
                  <NewsItem pageType={"dynamic"}  type={pageType ? 'list' : 'grid'}/>
                  <NewsItem pageType={"dynamic"}  type={pageType ? 'list' : 'grid'}/>
                </Row>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <div className="banner-ads">
              <img src="/images/ads.jpg"/>
              <img src="/images/ads.jpg"/>
              <img src="/images/ads.jpg"/>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ListPosts;
