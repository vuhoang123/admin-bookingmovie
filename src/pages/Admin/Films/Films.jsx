import React, { useCallback, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Button, Table } from "antd";
import { Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteMovieAction,
  fetchMoviesAction,
} from "../../../redux/actions/action";
// import "./Films.scss";
import { debounce } from "lodash";

const { Search } = Input;

export default function Films(props) {
  const dispatch = useDispatch();
  const moviesDefault = useSelector(
    (state) => state.MovieManagerReducer.lstFilm
  );
  // console.log(moviesDefault);

  const columns = [
    {
      title: "ID",
      dataIndex: "maPhim",
      value: (text, object) => <span>{text}</span>,
      sorter: (a, b) => a.maPhim - b.maPhim,
      defaultSortOrder: "descend",
      sortDirections: ["descend"],
      width: "7%",
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      render: (text, films, index) => (
        <>
          <img
            className="imageMovie mx-auto"
            src={text}
            alt={films.tenPhim}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = `https://picsum.photos/id/${index}/70/70`;
            }}
          />
        </>
      ),
      width: "15%",
      align: "center",
      // defaultSortOrder: "descend",
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Name",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let nameFilmA = a.tenPhim.toLowerCase().trim();
        let nameFilmB = b.tenPhim.toLowerCase().trim();
        return nameFilmA > nameFilmB;
      },
      sortDirections: ["descend"],
      width: "20%",
    },
    {
      title: "Description",
      dataIndex: "moTa",
      render: (text, film) => (
        <>
          {film.moTa.length > 50 ? film.moTa.substr(0, 50) + "..." : film.moTa}
        </>
      ),
      width: "25%",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, film) => (
        <>
          <NavLink
            key={1}
            className=" text-indigo-800 mr-2 text-2xl"
            to={`/films/edit/${film.maPhim}`}
          >
            <EditOutlined />
          </NavLink>
          <span
            key={2}
            className="text-red-600 text-2xl hover:text-lime-500 cursor-pointer "
            onClick={() => {
              if (
                window.confirm(`are you sure to delete movie ${film.tenPhim}`)
              ) {
                dispatch(deleteMovieAction(film.maPhim));
              }
            }}
          >
            <DeleteOutlined />
          </span>
          <NavLink
            key={3}
            className=" text-lime-700 ml-2 text-2xl"
            to={`/films/showtime/${film.maPhim}`}
          >
            <CalendarOutlined />
          </NavLink>
        </>
      ),
    },
  ];
  const data = moviesDefault;

  // const onSearch = (value) => {
  //   //call api
  //   dispatch(fetchMoviesAction(value));
  // };

  //delay search with useDebounce :>>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((value) => dispatch(fetchMoviesAction(value)), 500),
    []
  );

  const onSearchByChange = (e) => {
    //call api
    const value = e.target.value;
    // console.log(value);
    debounceSearch(value);
  };

  useEffect(() => {
    dispatch(fetchMoviesAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto Films text-center">
      <h1 className="w-44 p-1 text-indigo-800 font-semibold rounded-md mt-2 text-2xl mb-4 ">
        Movie Manager
      </h1>
      <Search
        className="w-1/3 mb-5"
        placeholder="Search movie"
        onChange={onSearchByChange}
      />
      <Button
        className="addMovie"
        onClick={() => {
          props.history.push("/admin/films/addnew");
          props.setSelectedKey("2");
          localStorage.setItem("keyMenu", "2");
        }}
      >
        Add Movie
      </Button>
      <Table columns={columns} dataSource={data} rowKey={"maPhim"} />
    </div>
  );
}
