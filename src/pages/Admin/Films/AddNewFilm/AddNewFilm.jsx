import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import React, { useState } from "react";
import { useFormik } from "formik";
import moment from "moment";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addMovieByUploadImageAction } from "../../../../redux/actions/action";
import { FILMGROUPID } from "../../../../utils/config";
import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
  tenPhim: yup.string().required("*Trường này bắt buộc nhập"),
  trailer: yup.string().required("*Trường này bắt buộc nhập"),
  moTa: yup.string().required("*Trường này bắt buộc nhập"),
  danhGia: yup.number().required("*Trường này bắt buộc nhập"),
});

export default function Addnew(props) {
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const AddNewsuccess = () => {
    history.push("/admin/films");
  };

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
    },
    onSubmit: (values) => {
      // console.log(values.ngayKhoiChieu);
      //create formData
      values.maNhom = FILMGROUPID;
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      //call api post formData to backend
      dispatch(addMovieByUploadImageAction(formData, AddNewsuccess));
    },
    validationSchema: schema,
    validateOnChange: false,
  });

  const handleChangeDatePicker = (value) => {
    let openingDay = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", openingDay);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (e) => {
    //get file from e
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "image/gif"
    ) {
      //readFile
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result); //base64 img
      };
      formik.setFieldValue("hinhAnh", file);

      // formik.setErrors()
    }
  };

  return (
    <div className="Addnew container align-left">
      <h3 className="title w-40 p-1 text-indigo-800 rounded-md">
        Add new movie
      </h3>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 8,
        }}
        layout="horizontal"
        size="default"
      >
        <Form.Item label="Movie's name">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Movie's name"
          />
          {formik.touched.tenPhim && formik.errors.tenPhim && (
            <p className="text-red-600 error">{formik.errors.tenPhim}</p>
          )}
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Trailer"
          />
          {formik.touched.trailer && formik.errors.trailer && (
            <p className="text-red-600 error">{formik.errors.trailer}</p>
          )}
        </Form.Item>
        <Form.Item label="Description">
          <Input
            name="moTa"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="text"
            placeholder="Description"
          />
          {formik.touched.moTa && formik.errors.moTa && (
            <p className="text-red-600 error">{formik.errors.moTa}</p>
          )}
        </Form.Item>
        <Form.Item label="Opening day">
          <DatePicker
            name="ngayKhoiChieu"
            format={"DD/MM/YY"}
            onChange={handleChangeDatePicker}
          />
          {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu && (
            <p className="text-red-600 error">{formik.errors.ngayKhoiChieu}</p>
          )}
        </Form.Item>
        <Form.Item label="Now showing" valuePropName="checked">
          <Switch autoFocus={true} onChange={handleChangeSwitch("dangChieu")} />
        </Form.Item>
        <Form.Item label="Coming soon" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("sapChieu")} />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch onChange={handleChangeSwitch("hot")} />
        </Form.Item>
        <Form.Item label="Rated">
          <InputNumber
            onChange={handleChangeSwitch("danhGia")}
            min={1}
            max={10}
          />
          {formik.touched.danhGia && formik.errors.danhGia && (
            <p className="text-red-600 error">{formik.errors.danhGia}</p>
          )}
        </Form.Item>
        <Form.Item label="Image">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg, image/jpg, image/gif"
          />
          <br />
          <img src={imgSrc} alt="..." />
        </Form.Item>

        <Form.Item className="text-end mr-32">
          <Button className=" addNew" htmlType="submit">
            Add Movie
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
