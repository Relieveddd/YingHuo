import myaxios from "../../axios/index.js";

export const vedioList = (data) => {
  return myaxios({
    url: "/api/admin/videoList",
    method: "POST",
    data,
  });
};

export const userList = (data) => {
  return myaxios({
    url: "/api/admin/userList",
    method: "POST",
    data,
  });
};
export const goodList = (data) => {
  return myaxios({
    url: "/api/admin/goodList",
    method: "POST",
    data,
  });
};
export const goodInfo = (data) => {
  return myaxios({
    url: "/api/admin/goodInfo",
    method: "POST",
    data,
  });
};
export const goodsTypeList = (data) => {
  return myaxios({
    url: "/api/admin/goodsTypeList",
    method: "POST",
    data,
  });
};
export const savePic = (data) => {
  return myaxios({
    url: "/api/savePic",
    method: "POST",
    data,
  });
};
export const login = (data) => {
  return myaxios({
    url: "/api/admin/login",
    method: "POST",
    data,
  });
};

export const accountList = (data) => {
  return myaxios({
    url: "/api/admin/accountList",
    method: "POST",
    data,
  });
};
export const roleLise = (data) => {
  return myaxios({
    url: "/api/admin/roleLise",
    method: "POST",
    data,
  });
};

export const permissionList = (data) => {
  return myaxios({
    url: "/api/admin/permissionList",
    method: "POST",
    data,
  });
};