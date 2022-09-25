import React, { useEffect } from "react";
import { Button, Form, Input, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FILMGROUPID } from "../../../../utils/config";
import * as yup from "yup";
import {
  addNewUserAction,
  getUserInfoAction,
  updateUserAction,
} from "../../../../redux/actions/UserManagerAction";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  taiKhoan: yup.string().required("*Trường này bắt buộc nhập"),
  matKhau: yup
    .string()
    .required("*Trường này bắt buộc nhập")
    .min(8, "*mật khẩu lớn hơn 8 ký tự")
    .max(16, "mật khẩu nhỏ hơn 16 ký tự"),
  hoTen: yup.string().required("*Trường này bắt buộc nhập"),
  email: yup
    .string()
    .email("email không đúng định dạng")
    .required("*Trường này bắt buộc nhập"),
  soDT: yup
    .string()
    .required("*Trường này bắt buộc nhập")
    .matches(phoneRegExp, "số điện thoại không hợp lệ"),
  maLoaiNguoiDung: yup.string().required("*Trường này bắt buộc nhập"),
});

export default function EditUser(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.UserManagerReducer.userInfo);
  let urlParams = new URLSearchParams(props.location.search);

  const taiKhoanCurrent = urlParams.get("taikhoan");

  const UpdateUsersuccess = () => {
    history.push("/users");
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: userInfo.taiKhoan,
      matKhau: userInfo.matKhau,
      hoTen: userInfo.hoTen,
      email: userInfo.email,
      soDT: userInfo.soDT,
      maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
    },
    onSubmit: (values) => {
      values.maNhom = FILMGROUPID;
      dispatch(updateUserAction(values, UpdateUsersuccess));
    },
    validationSchema: schema,
    // validateOnChange: false,
  });

  const onChangeRoll = (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
  };

  useEffect(() => {
    dispatch(getUserInfoAction(taiKhoanCurrent));
  }, []);

  return (
    <div className="EditUser text-start">
      <h3 className="title p-1 text-cyan-600 font-semibold rounded-md mt-2 text-2xl mb-4 ">
        User - {taiKhoanCurrent}
      </h3>
      <Form onSubmitCapture={formik.handleSubmit} layout="vertical">
        <Form.Item label="User name">
          <Input
            name="taiKhoan"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="User Name"
            type="text"
            value={formik.values.taiKhoan}
            // bordered={false}
          ></Input>
          {formik.touched.taiKhoan && formik.errors.taiKhoan && (
            <p className="text-red-600 error">{formik.errors.taiKhoan}</p>
          )}
        </Form.Item>
        <Form.Item label="Password">
          <Input.Password
            name="matKhau"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Password"
            value={formik.values.matKhau}
          ></Input.Password>
          {formik.touched.matKhau && formik.errors.matKhau && (
            <p className="text-red-600 error">{formik.errors.matKhau}</p>
          )}
        </Form.Item>
        <Form.Item label="Full name">
          <Input
            name="hoTen"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Full Name"
            type="text"
            value={formik.values.hoTen}
          ></Input>
          {formik.touched.hoTen && formik.errors.hoTen && (
            <p className="text-red-600 error">{formik.errors.hoTen}</p>
          )}
        </Form.Item>
        <Form.Item label="Email">
          <Input
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Email"
            type="text"
            value={formik.values.email}
          ></Input>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-600 error">{formik.errors.email}</p>
          )}
        </Form.Item>
        <Form.Item label="Phone number">
          <Input
            name="soDT"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Phone Number"
            type="text"
            value={formik.values.soDT}
          ></Input>
          {formik.touched.soDT && formik.errors.soDT && (
            <p className="text-red-600 error">{formik.errors.soDT}</p>
          )}
        </Form.Item>
        <Form.Item label="Select Roll">
          <Select
            onChange={onChangeRoll}
            onBlur={formik.handleBlur}
            options={[
              {
                label: "quanTri",
                value: "quanTri",
              },
              {
                label: "khachHang",
                value: "khachHang",
              },
            ]}
            placeholder="Select Roll"
            name="maLoaiNguoiDung"
            value={formik.values.maLoaiNguoiDung}
          />
        </Form.Item>
        <Form.Item>
          <Button className="btnAddNew" htmlType="submit">
            Update User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
