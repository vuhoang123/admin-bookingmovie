import { FILMGROUPID } from "../utils/config";
import { BaseService } from "./BaseService";

export class MovieManagerService extends BaseService {
  constructor() {
    super();
  }

  getListBanner = () => {
    return this.get(`/api/QuanLyPhim/LayDanhSachBanner`);
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
}

export const movieManagerService = new MovieManagerService();
