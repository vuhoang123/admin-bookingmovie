import React from "react";
import { Button, Form, Input, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { FILMGROUPID } from "../../../../utils/config";
import * as yup from "yup";
import { addNewUserAction } from "../../../../redux/actions/UserManagerAction";

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

export default function AddUser(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const AddUsersuccess = () => {
    history.push("/users");
  };

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDT: "",
      maLoaiNguoiDung: "",
    },
    onSubmit: (values) => {
      values.maNhom = FILMGROUPID;
      console.log(values);
      dispatch(addNewUserAction(values, AddUsersuccess));
    },
    validationSchema: schema,
    // validateOnChange: false,
  });

  const onChangeRoll = (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
  };

  return (
    <div className="AddUser">
      <h3 className="title w-44 p-1 text-cyan-600 font-semibold rounded-md mt-2 text-2xl mb-4 ">
        Add new user
      </h3>
      <Form
        onSubmitCapture={formik.handleSubmit}
        layout="vertical"
        // labelCol={{
        //   span: 8,
        // }}
        // wrapperCol={{
        //   span: 8,
        // }}
      >
        <Form.Item label="User name">
          <Input
            name="taiKhoan"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="User Name"
            type="text"
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
                label: "Admin",
                value: "quanTri",
              },
              {
                label: "User",
                value: "khachHang",
              },
            ]}
            placeholder="Select Roll"
            name="maLoaiNguoiDung"
          />
        </Form.Item>
        <Form.Item>
          <Button className="btnAddNew" htmlType="submit">
            Add User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
