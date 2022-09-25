import { FILMGROUPID } from "../utils/config";
import { BaseService } from "./BaseService";

class MovieManagerService extends BaseService {
  // constructor() {
  //   super();
  // }

  getAccessToken = (account) => {
    return this.post("/api/QuanLyNguoiDung/DangNhap", account);
  };

  fetchMovies = (nameMovie = "") => {
    return nameMovie.trim() !== ""
      ? this.get(
          `/api/QuanLyPhim/LayDanhSachPhim?maNhom=${FILMGROUPID}&tenPhim=${nameMovie}`
        )
      : this.get(`/api/QuanLyPhim/LayDanhSachPhim?maNhom=${FILMGROUPID}`);
  };

  addMovieByUploadImage = (formData) => {
    return this.post("/api/QuanLyPhim/ThemPhimUploadHinh", formData);
  };
  getMovieInfo = (id) => {
    return this.get(`/api/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);
  };
  uploadMovieUpdate = (formData) => {
    return this.post(`/api/QuanLyPhim/CapNhatPhimUpload`, formData);
  };
  deleteMovie = (id) => {
    return this.delete(`/api/QuanLyPhim/XoaPhim?maPhim=${id}`);
  };

  getCinemaInfo = (cinemaID) => {
    return this.get(
      `/api/QuanLyRap/LayThongTinHeThongRap?maHeThongRap=${cinemaID}`
    );
  };

  getCineplexInfo = (cinemaID) => {
    return this.get(
      `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${cinemaID}`
    );
  };

  createShowtimes = (formData) => {
    return this.post(`/api/QuanLyDatVe/TaoLichChieu`, formData);
  };
}

export const movieManagerService = new MovieManagerService();
