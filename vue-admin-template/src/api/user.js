import request from "@/utils/request";

//用户登录
export function userLogin(data) {
  return request({
    url: "/api/admin/login",
    method: "post",
    data,
  });
}

//恢复登录
export function getUserInfo(token) {
  return request({
    url: "/api/admin/whoami",
    method: "get",
    params: { token },
  });
}

export function logout() {
  return request({
    url: "/vue-admin-template/user/logout",
    method: "post",
  });
}

export function setUser(userInfo) {
  return request({
    url: "/api/admin",
    method: "put",
    data: userInfo,
  });
}
