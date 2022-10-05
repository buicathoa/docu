import React, { useEffect, useState } from "react";
import {
  FilterOutlined,
  CaretDownOutlined,
  AppstoreOutlined,
  CameraOutlined,
  VideoCameraAddOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { getBase64, validFileType } from "../../utils/helper";
import { apiRequest } from "../../utils/apiRequest";
import { apiUrl, HREF } from "../../constants";
import { useAppDispatch } from "../../reducer/hook";
import { UserActions } from "../../reducer/userReducer";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import ModalSelectCategory from "../../components/Modal/ModalSelectCategory";
import ModalSelectAddress from "../../components/Modal/ModalSelectAddress";
import { LocationAction } from "../../reducer/locationReducer";
import {
  BrandInterface,
  CategoryInterface, CityInterface, DistrictInterface, dynamicAttributesInterface, FilterInterface, listImageInterface,
  locationSelectedInterface, ModelInterface, PostNewsInterface, ResponseFormatItem,
  ResponseFormatList, SubcategoryInterface, WardInterface
} from "../../interface";
import { CategoryAction } from "../../reducer/categoryReducer";
import _ from "lodash";
import { GetServerSideProps, NextApiResponse } from "next";
import { PostActions } from "../../reducer/postReducer";

export const getServerSideProps  = async (context) => {

  const listFilterByCategory = await apiRequest(
    apiUrl.product.filterByCategory,
    { subCategory_id: context.query.subCategory },
    'general'
  );
  let categorySelectedUrl;
  let subCategorySelectedUrl;
  let listCategory;
  if (context.query.subCategory) {
    listCategory = await apiRequest(apiUrl.product.category, {}, 'general');
    listCategory?.data?.data?.map((item) => {
      item?.sub_categories?.map((itemSub) => {
        if (itemSub?._id === context.query.subCategory) {
          categorySelectedUrl = item;
          subCategorySelectedUrl = itemSub;
        }
      });
    });
  }
  return {
    props: {
      listFilterByCategory: listFilterByCategory?.data?.data,
      categorySelectedUrl: categorySelectedUrl || null,
      subCategorySelectedUrl: subCategorySelectedUrl || null,
      // subCategorySelected: subCategorySelectedUrl,
    }, // will be passed to the page component as props
  };
}

const Dangtin = (props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { listFilterByCategory, categorySelectedUrl, subCategorySelectedUrl } =
    props;

  const { Option } = Select;
  const [isOpenModalCategory, setIsOpenModalCategory] = useState(false);
  const [isOpenModalAddress, setIsOpenModalAddress] = useState(false);
  const [listImage, setListImage] = useState<Array<string>>([]);
  const [citySelected, setCitySelected] = useState<locationSelectedInterface>();
  const [listCity, setListCity] = useState<CityInterface[]>([]);
  const [districtSelected, setDistrictSelected] = useState<locationSelectedInterface>();
  const [listDistrict, setListDistrict] = useState<Array<DistrictInterface>>([]);
  const [wardSelected, setWardsSelected] = useState<locationSelectedInterface>();
  const [listWard, setListWard] = useState<Array<WardInterface>>([]);
  const [addressDetail, setAddressDetail] = useState("");
  const [categorySelected, setCategorySelected] =
    useState<CategoryInterface>(categorySelectedUrl);
  const [subCategorySelected, setSubcategorySelected] =
    useState<SubcategoryInterface>(subCategorySelectedUrl);
  const [listBrands, setListBrands] = useState<Array<BrandInterface>>([]);
  const [brandSelected, setBrandSelected] = useState('');
  const [listModels, setListModels] = useState<Array<ModelInterface>>([]);
  const [modelSelected, setModelSelected] = useState('');
  const [isChangeFullAddress, setIsChangeFullAddress] = useState(false);
  const [listAttributes, setListAttributes] = useState<Array<dynamicAttributesInterface>>([]);
  const [postPreview, setPostPreview] = useState({});
  const [error, setError] = useState("");
  const [formValues, setformValues] = useState({
    is_pinned: false,
    status: "pending"
  });
  const sellerType = [
    { value: "personal", label: "Cá nhân" },
    { value: "halfpro", label: "Bán chuyên" },
  ];
  const [form] = Form.useForm();

  useEffect(() => {
    form.resetFields();
  }, [formValues]);

  const fetchUploadImage = (param:any): Promise<ResponseFormatItem> => {
    return new Promise((resolve, reject) => {
      dispatch(
        PostActions.fetchUploadImage({ param, resolve, reject })
      );
    });
  };

  const fetchListBrandBySubcategory = (param:any): Promise<ResponseFormatList> => {
    return new Promise((resolve, reject) => {
      dispatch(
        CategoryAction.fetchListBrandBySubcategory({ param, resolve, reject })
      );
    });
  };

  const fetchUserInfor = (param:any): Promise<ResponseFormatItem> => {
    return new Promise((resolve, reject) => {
      dispatch(UserActions.fetchUserInfor({ param, resolve, reject }));
    });
  };

  const fetchListCity = (param:any): Promise<ResponseFormatList> => {
    return new Promise((resolve, reject) => {
      dispatch(LocationAction.fetchListCity({ param, resolve, reject }));
    });
  };

  const fetchListDistricts = (param:any): Promise<ResponseFormatList> => {
    return new Promise((resolve, reject) => {
      dispatch(LocationAction.fetchListDistricts({ param, resolve, reject }));
    });
  };

  const fetchListWards = (param:any): Promise<ResponseFormatList> => {
    return new Promise((resolve, reject) => {
      dispatch(LocationAction.fetchListWards({ param, resolve, reject }));
    });
  };

  const fetchCreateNewPost = (param:any): Promise<ResponseFormatList> => {
    return new Promise((resolve, reject) => {
      dispatch(PostActions.fetchCreateNewPost({ param, resolve, reject }));
    });
  };

  useEffect(() => {
    if (!isChangeFullAddress) {
      if (!Cookies.get("docu_token")) {
        localStorage.setItem("previous_url", window.location.href);
        router.push("/dang-nhap");
      } else {
        if (!localStorage.getItem("post_preview")) {
          setIsOpenModalCategory(true);
          fetchUserInfor({}).then((res) => {
            fetchListCity({}).then((resCity) => {
              setListCity(resCity?.data?.data);
              console.log(resCity);
              setCitySelected({
                label: resCity?.data?.data.find(
                  (item: CityInterface) => item.province_id === res?.data?.data?.province_id
                )?.province_name,
                value: res?.data?.data?.province_id,
              });
            });
            if (res?.data?.data?.province_id) {
              fetchListDistricts({
                province_id: res?.data?.data?.province_id,
              }).then((resDistrict) => {
                setListDistrict(resDistrict?.data?.data);
                setDistrictSelected({
                  label: resDistrict?.data?.data.find(
                    (item) => item.district_id === res?.data?.data?.district_id
                  )?.district_name,
                  value: res?.data?.data?.district_id,
                });
              });
            }
            if (res?.data?.data?.district_id) {
              fetchListWards({ district_id: res?.data?.data?.district_id }).then(
                (resWards) => {
                  setListWard(resWards?.data?.data);
                  setWardsSelected({
                    label: resWards?.data?.data.find(
                      (item) => item.ward_id === res?.data?.data?.ward_id
                    )?.ward_name,
                    value: res?.data?.data?.ward_id,
                  });
                }
              );
            }
            setAddressDetail(res?.data?.data?.address_detail);
          });
        } else {
          const obj = { ...formValues }
          const post_preview = localStorage.getItem("post_preview")
          if (post_preview !== null) {

            setformValues({ ...obj, ...JSON.parse(post_preview) })
            setListImage(JSON.parse(post_preview)?.images)
            setBrandSelected(JSON.parse(post_preview)?.brand_id)
            setModelSelected(JSON.parse(post_preview)?.model_id)
            setAddressDetail(JSON.parse(post_preview)?.address_detail)
            fetchListCity({}).then((resCity) => {
              setListCity(resCity?.data?.data);
              setCitySelected({
                label: resCity?.data?.data.find(
                  (item) => item.province_id === JSON.parse(post_preview)?.province_id
                )?.province_name,
                value: JSON.parse(post_preview)?.province_id,
              });
            })

            fetchListDistricts({
              province_id: JSON.parse(post_preview)?.province_id,
            }).then((resDistrict) => {
              setListDistrict(resDistrict?.data?.data);
              setDistrictSelected({
                label: resDistrict?.data?.data.find(
                  (item) => item.district_id === JSON.parse(post_preview)?.district_id
                )?.district_name,
                value: JSON.parse(post_preview)?.district_id
              });
            });

            fetchListWards({ district_id: JSON.parse(post_preview)?.district_id }).then(
              (resWards) => {
                setListWard(resWards?.data?.data);
                setWardsSelected({
                  label: resWards?.data?.data.find(
                    (item) => item.ward_id === JSON.parse(post_preview)?.ward_id
                  )?.ward_name,
                  value: JSON.parse(post_preview)?.ward_id,
                });
              }
            );
          }
        }
      }
    }
  }, [isChangeFullAddress]);

  useEffect(() => {
    if (subCategorySelected) {
      fetchListBrandBySubcategory({ sub_id: subCategorySelected._id }).then(
        (res) => {
          setListBrands(res?.data?.data);
        }
      );
    }
  }, [subCategorySelected]);

  const handleSelectAddress = () => {
    setIsOpenModalAddress(true);
  };

  const onSubmitForm = (values: PostNewsInterface) => {
    if (listImage.length <= 1) {
      setError("form");
      return false;
    } else {
      const params = {
        ...formValues,
        ...values,
        is_pinned: false,
        status: "pending",
        attribute: listAttributes,
        address_detail: addressDetail,
        province_id: citySelected?.value,
        district_id: districtSelected?.value,
        ward_id: wardSelected?.value,
        category_id: categorySelected?._id,
        subcategory_id: subCategorySelected?._id,
        brand_id: brandSelected,
        model_id: modelSelected,
      };

      console.log(listImage)
      // const formData = new FormData()
      // listImage.map(item => {
      //   formData.append('image',item)
      // })
      // fetchUploadImage({param: [...formData]}).then(res => {
      //   const paramsPostNews = {...params, image: res.data}
      //   const activeElement = document?.activeElement?.name;
      //   if (activeElement === "post") {
      //     setError("");
      //     const data = {...params, images: res.data};
      //     fetchCreateNewPost(data).then(res => {
      //       debugger
      //     })
      //   } else {
      //     localStorage.setItem(
      //       "post_preview",
      //       JSON.stringify({
      //         ...params,
      //         images: res.data,
      //         full_address: `${addressDetail}, ${wardSelected?.label || ""
      //           }, ${districtSelected?.label || ""}, ${citySelected?.label || ""
      //           }`
      //       })
      //     );
      //     localStorage.setItem(
      //       "listFilter",
      //       JSON.stringify(listFilterByCategory)
      //     );
      //     router.push(`${HREF}/dang-tin/xem-truoc`);
      //     setError("");
      //   }
      // })
    }
  };

  const handleOpenModalCategory = () => {
    setIsOpenModalCategory(true);
  };

  const onSubmitFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if(event?.target.files){
      const file = event?.target?.files[0];
      if (file?.size <= 57600) {
        setError("file");
      } else {
        const formData = new FormData()
        file.preview = await getBase64(file)
        formData.append('specific_image',file)
        debugger
        fetchUploadImage({param: formData}).then(res => {
          const listImg = [...listImage]
          listImg.concat(res?.data)
          debugger
          setListImage(listImg)
        })
        setError("");
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    const listImageClone = [...listImage];
    const listImageAfterFilter = listImageClone.filter(
      (item, indexImg) => index !== indexImg
    );
    setListImage(listImageAfterFilter);
  };

  const handleChangeBrand = (event:string) => {
    console.log(typeof brandSelected);
    setBrandSelected(event);
    const listModels:ModelInterface[] = listBrands.find(
      (item) => item?.brand_id === event
    )?.models || [];
    setListModels(listModels);
  };

  const handleChangeDynamic = (event: string, key: string) => {
    const listAttr: dynamicAttributesInterface[] = [...listAttributes] || [];
    listAttr.push({ name: key, value: event });
    setListAttributes(listAttr);
  };


  const validateMessages = {
    required: "'Vui lòng điền thông tin vào trường này",
    // ...
  };

  return (
    <div className="post-news-wrapper">
      <div className="post-news-container">
        <Row>
          <Col className="post-news-col-first" sm={24} md={8} lg={8}>
            <div className="post-news-left">
              {listImage?.length === 0 ? (
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
                  {listImage?.map((item, index) => {
                    return (
                      <div className="images-preview-item" key={index}>
                        <img src={item} alt="image-preview" />
                        <div
                          className="delete-image-preview"
                          onClick={() => handleRemoveImage(index)}
                        >
                          x
                        </div>
                        {index === 0 && (
                          <div className="cover-image-title">Ảnh bìa</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              {error === "" ? (
                ""
              ) : error === "form" ? (
                <span className="error">Vui lòng chọn ít nhất 1 ảnh</span>
              ) : (
                <span className="error">
                  Ảnh được chọn phải có kích thước lớn hơn 240x240
                </span>
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
                  {_.isEmpty(subCategorySelected) ? (
                    <span>&nbsp;</span>
                  ) : (
                    <span>{`${categorySelected?.title} - ${subCategorySelected?.title}`}</span>
                  )}
                </div>
                <CaretDownOutlined />
              </div>
              {!_.isEmpty(subCategorySelected) && (
                <div className="news-information">
                  <span className="news-information-title">
                    Thông tin chi tiết
                  </span>
                  <Form
                    id="post_news_form"
                    form={form}
                    layout="vertical"
                    name="post_news_form"
                    onFinish={onSubmitForm}
                    initialValues={formValues}
                    scrollToFirstError
                    validateMessages={validateMessages}
                    requiredMark={false}
                  >
                    {categorySelected?._id === "62e3fb95511d4ac029055759" && (
                      <Form.Item
                        name="brand_id"
                        className="custom-form-item form-select-brand"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          className="form-select"
                          virtual={false}
                          placeholder="Chọn hãng"
                          value={brandSelected}
                          onChange={handleChangeBrand}
                        >
                          {listBrands?.map((item) => {
                            return (
                              <Option value={item?.brand_id} key={item?._id}>
                                {item?.title}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    )}
                    <Form.Item
                      name="model_id"
                      className={`custom-form-item form-select-brand ${brandSelected === "" ? "none" : ""
                        }`}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        className="form-select"
                        virtual={false}
                        placeholder="Chọn dòng"
                        value={modelSelected}
                        onChange={(event) => setModelSelected(event)}
                      >
                        {listModels?.map((item) => {
                          return (
                            <Option value={item?.model_id} key={item?._id}>
                              {item?.title}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                    <div className="dynamic-filter">
                      <Row>
                        {listFilterByCategory &&
                          listFilterByCategory.length > 0 &&
                          listFilterByCategory.map((item:FilterInterface) => {
                            return (
                              <Col span={item.width} key={item?._id}>
                                <Form.Item
                                  name={item.keyEN}
                                  className="custom-form-item"
                                  rules={[
                                    {
                                      required: item?.is_required,
                                    },
                                  ]}
                                >
                                  <Select
                                    className="form-select"
                                    allowClear
                                    placeholder={item?.keyVI}
                                    onChange={(event) =>
                                      handleChangeDynamic(event, item.keyEN)
                                    }
                                    // labelInValue
                                    virtual={false}
                                  >
                                    {item?.droplist_value_option
                                      ?.split(",")
                                      ?.map((droplistItem, droplistIndex) => {
                                        return (
                                          <Option
                                            value={droplistIndex}
                                            key={droplistIndex}
                                          >
                                            {droplistItem}
                                          </Option>
                                        );
                                      })}
                                  </Select>
                                </Form.Item>

                                {/* <Form.Item
                                    name="services"
                                    label={t('ActionLog.service')}
                                    className="custom-form-item"
                                    rules={validateSchema.services}
                                >
                                    <Select
                                        className="form-select multiple"
                                        allowClear
                                        mode="multiple"
                                        virtual={false}
                                        placeholder={t('ActionLog.service')}
                                    >
                                        {filterOptions?.services?.map((item, index) => {
                                            return (
                                                <Option value={item} key={index}>
                                                    {item}
                                                </Option>
                                            )
                                        })}
                                    </Select>
                                </Form.Item> */}
                              </Col>
                            );
                          })}
                      </Row>
                      <Form.Item
                        name="is_give_away"
                        valuePropName="checked"
                        className="custom-form-item form-checkbox"
                      >
                        <Checkbox className="form-checkbox">
                          Cho tặng miễn phí
                        </Checkbox>
                      </Form.Item>
                      <Form.Item
                        name="price"
                        className="custom-form-item"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <InputNumber
                          type="number"
                          className="form-input"
                          placeholder="Giá"
                        />
                      </Form.Item>
                      <div className="title-desc">
                        <span className="title-desc-title">
                          Tiêu đề và mô tả
                        </span>
                        <Form.Item
                          name="title"
                          className="custom-form-item"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Input className="form-input" placeholder="Tiêu đề" />
                        </Form.Item>
                        <Form.Item
                          name="description"
                          className="custom-form-item"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <TextArea
                            rows={4}
                            className="form-textarea"
                            placeholder="Mô tả"
                          />
                        </Form.Item>
                      </div>
                      <div className="seller-infor">
                        <span className="seller-infor-title">Người bán</span>
                        <Form.Item
                          name="seller_type"
                          className="custom-form-item"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Select
                            className="form-select"
                            virtual={false}
                            placeholder={"Cá nhân/bán chuyên"}
                          >
                            {sellerType?.length > 0 &&
                              sellerType.map((item, index) => {
                                return (
                                  <Option value={item.value} key={index}>
                                    {item.label}
                                  </Option>
                                );
                              })}
                          </Select>
                        </Form.Item>
                      </div>
                      <div
                        className="address-seller-infor"
                        onClick={handleSelectAddress}
                      >
                        <div className="categories-select select-item">
                          <div className="categories-left-top">
                            <span>Địa chỉ</span>
                            <span>
                              {`${addressDetail}, ${wardSelected?.label || ""
                                }, ${districtSelected?.label || ""}, ${citySelected?.label || ""
                                }`}
                            </span>
                          </div>
                          <CaretDownOutlined />
                        </div>
                      </div>
                    </div>
                    <div className="button-post-news">
                      <Button
                        className="preview"
                        form="post_news_form"
                        key="submit"
                        htmlType="submit"
                        name="preview"
                      >
                        Xem trước
                      </Button>
                      <Button
                        className="post-news"
                        form="post_news_form"
                        key="submit"
                        htmlType="submit"
                        name="post"
                      >
                        Đăng tin
                      </Button>
                    </div>
                  </Form>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
      <ModalSelectCategory
        visible={isOpenModalCategory}
        setVisible={(event) => setIsOpenModalCategory(event)}
        categorySelected={categorySelected}
        setCategorySelected={(event) => setCategorySelected(event)}
        setSubcategorySelected={(event) => setSubcategorySelected(event)}
      />
      <ModalSelectAddress
        visible={isOpenModalAddress}
        setVisible={(event) => setIsOpenModalAddress(event)}
        citySelected={citySelected || {}}
        setCitySelected={(event) => setCitySelected(event)}
        districtSelected={districtSelected || {}}
        setDistrictSelected={(event) => setDistrictSelected(event)}
        wardSelected={wardSelected || {}}
        setWardsSelected={(event) => setWardsSelected(event)}
        listCity={listCity}
        setListCity={(event) => setListCity(event)}
        listDistrict={listDistrict}
        setListDistrict={(event) => setListDistrict(event)}
        listWard={listWard}
        setListWard={(event) => setListWard(event)}
        addressDetail={addressDetail}
        setAddressDetail={(event) => setAddressDetail(event)}
        setIsChangeFullAddress={(event) => setIsChangeFullAddress(event)}
      />
    </div>
  );
};

export default Dangtin;
