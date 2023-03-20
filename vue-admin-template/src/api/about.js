import request from "@/utils/request";

export function getUrl() {
  return request({
    url: "/api/about",
    method: "get",
  });
}

export function setUrl(url) {
  return request({
    url: "/api/about",
    method: "post",
    data: {
      url,
    },
  });
}
