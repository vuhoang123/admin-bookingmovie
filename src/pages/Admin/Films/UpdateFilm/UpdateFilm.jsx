import { Button, DatePicker, Form, Input, InputNumber, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import moment from "moment";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getMovieInfoAction,
  uploadMovieUpdateAction,
} from "../../../../redux/actions/MovieManagerAction";
import { FILMGROUPID } from "../../../../utils/config";
import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
  tenPhim: yup.string().required("*Trường này bắt buộc nhập"),
  trailer: yup.string().required("*Trường này bắt buộc nhập"),
  moTa: yup.string().required("*Trường này bắt buộc nhập"),
  danhGia: yup.number().required("*Trường này bắt buộc nhập"),
});

export default function Edit(props) {
  const [imgSrc, setImgSrc] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const movieInfo = useSelector((state) => state.MovieManagerReducer.movieInfo);
  // console.log(movieInfo);

  const Editsuccess = () => {
    history.push("/films");
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: movieInfo.maPhim,
      tenPhim: movieInfo?.tenPhim,
      trailer: movieInfo.trailer,
      moTa: movieInfo.moTa,
      ngayKhoiChieu: movieInfo.ngayKhoiChieu,
      dangChieu: movieInfo.dangChieu,
      sapChieu: movieInfo.sapChieu,
      hot: movieInfo.hot,
      danhGia: movieInfo.danhGia,
      hinhAnh: null,
    },
    onSubmit: (values) => {
      //create formData
      console.log(values.ngayKhoiChieu);
      console.log(values.hinhAnh);
      values.maNhom = FILMGROUPID;
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          !!values.hinhAnh &&
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
      //call api post formData to backend
      dispatch(uploadMovieUpdateAction(formData, Editsuccess));
    },
    validationSchema: schema,
    validateOnChange: false,
  });

  const handleChangeDatePicker = (value) => {
    let openingDay = moment(value);
    formik.setFieldValue("ngayKhoiChieu", openingDay);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = async (e) => {
    //get file from e
    let file = e.target.files[0];
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png" ||
      file.type === "image/gif"
    ) {
      //add value hinhAnh to formik
      await formik.setFieldValue("hinhAnh", file);
      //readFile
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        setImgSrc(e.target.result); //base64 img
      };
    }
  };

  useEffect(() => {
    let id = props.match.params.id;
    dispatch(getMovieInfoAction(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="Edit text-start">
      <h3 className="title w-44 p-1 text-indigo-800 font-semibold rounded-md mt-2 text-2xl mb-4">
        Edit movie info
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
            value={formik.values.tenPhim}
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
            value={formik.values.trailer}
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
            value={formik.values.moTa}
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
            defaultValue={moment(formik.values.ngayKhoiChieu)}
          />
          {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu && (
            <p className="text-red-600 error">{formik.errors.ngayKhoiChieu}</p>
          )}
        </Form.Item>
        <Form.Item label="Now showing" valuePropName="checked">
          <Switch
            checked={formik.values.dangChieu}
            onChange={handleChangeSwitch("dangChieu")}
          />
        </Form.Item>
        <Form.Item label="Coming soon" valuePropName="checked">
          <Switch
            checked={formik.values.sapChieu}
            onChange={handleChangeSwitch("sapChieu")}
          />
        </Form.Item>
        <Form.Item label="Hot" valuePropName="checked">
          <Switch
            checked={formik.values.hot}
            onChange={handleChangeSwitch("hot")}
          />
        </Form.Item>
        <Form.Item label="Rated">
          <InputNumber
            onChange={handleChangeSwitch("danhGia")}
            min={1}
            max={10}
            value={formik.values.danhGia}
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
          <img src={imgSrc === "" ? movieInfo.hinhAnh : imgSrc} alt="..." />
        </Form.Item>

        <Form.Item className="text-end mr-48">
          <Button className="update" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
