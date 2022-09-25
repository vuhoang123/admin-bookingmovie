import React, { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Spin, Table } from "antd";
import { Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import {
  deleteUserAction,
  fetchUserListAction,
} from "../../../redux/actions/UserManagerAction";

const { Search } = Input;

export default function Films(props) {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const userListDefault = useSelector(
    (state) => state.UserManagerReducer.userList
  );
  console.log(userListDefault);

  const columns = [
    {
      title: "",
      dataIndex: "index",
      render: (value, item, index) => <>{(page - 1) * 10 + index + 1}</>,
      // sorter: (a, b) => {
      //   let indexA = (page - 1) * 10 + a.index + 1
      //   let indexB = (page - 1) * 10 + b.index + 1

      //   return indexA > indexB;
      // },
      // defaultSortOrder: "ascend",
      // sortDirections: ["ascend"],
    },
    {
      title: "User Name",
      dataIndex: "taiKhoan",
      align: "center",
    },
    {
      title: "Password",
      dataIndex: "matKhau",
    },
    {
      title: "Full Name",
      dataIndex: "hoTen",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "soDT",
    },
    {
      title: "Roll",
      dataIndex: "maLoaiNguoiDung",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, user) => (
        <>
          <NavLink
            key={1}
            className=" text-cyan-600 mr-2 text-2xl"
            to={`/users/edit/?taikhoan=${user.taiKhoan}`}
          >
            <EditOutlined />
          </NavLink>
          <span
            key={2}
            className="text-red-600 text-2xl hover:text-lime-500 cursor-pointer "
            onClick={() => {
              if (
                window.confirm(
                  `are you sure to delete this user: ${user.taiKhoan}`
                )
              ) {
                dispatch(deleteUserAction(user.taiKhoan));
              }
            }}
          >
            <DeleteOutlined />
          </span>
        </>
      ),
    },
  ];
  const data = userListDefault;

  const onSearch = (value) => {
    //call api
    dispatch(fetchUserListAction(value));
  };

  //delay search with useDebounce
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((value) => dispatch(fetchUserListAction(value)), 500),
    []
  );

  const onSearchByChange = (e) => {
    //call api
    const value = e.target.value;
    // console.log(value);
    debounceSearch(value);
  };

  useEffect(() => {
    dispatch(fetchUserListAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto Users text-center">
      <h1 className="w-44 p-1 text-cyan-600 font-semibold rounded-md mt-2 text-2xl mb-4 ">
        User Manager
      </h1>
      <Search
        className="w-1/3 mb-5"
        placeholder="Search user"
        onChange={onSearchByChange}
        onSearch={onSearch}
      />
      <Button
        className="addUser"
        onClick={() => {
          props.history.push("/users/addnew");
          props.setSelectedKey("4");
          localStorage.setItem("keyMenu", "4");
        }}
      >
        Add User
      </Button>
      <Table
        // loading={<Spin />}
        pagination={{
          onChange(current) {
            setPage(current);
          },
        }}
        columns={columns}
        dataSource={data}
        rowKey={"taiKhoan"}
        bordered
      />
    </div>
  );
}
