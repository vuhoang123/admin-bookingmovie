import { FILMGROUPID } from "../utils/config";
import { BaseService } from "./BaseService";

export class UserManagerService extends BaseService {
  fetchUserList = (key = "") => {
    return key.trim() !== ""
      ? this.get(
          `api/QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${FILMGROUPID}&tuKhoa=${key}`
        )
      : this.get(
          `api/QuanLyNguoiDung/LayDanhSachNguoiDung?maNhom=${FILMGROUPID}`
        );
  };

  deleteUser = (taiKhoan) => {
    return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?taiKhoan=${taiKhoan}`);
  };

  addNewUser = (values) => {
    return this.post(`api/QuanLyNguoiDung/ThemNguoiDung`, values);
  };

  getUserInfo = (taiKhoan) => {
    return this.post(
      `api/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`
    );
  };

  updateUser = (values) => {
    return this.post(`/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, values);
  };
}

export const userManagerService = new UserManagerService();
