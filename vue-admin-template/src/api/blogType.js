import request from "@/utils/request";

export function addBlogType(name, order) {
  return request({
    url: "/api/blogtype",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name: name,
      order: order,
    },
  });
}

export function updateBlogType(id, name, order) {
  return request({
    url: "/api/blogtype/" + id,
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      name: name,
      order: order,
    },
  });
}

export function removeBlogType(id) {
  return request({
    url: "/api/blogtype/" + id,
    method: "delete",
  });
}

export function getBlogType() {
  return request({
    url: "/api/blogtype",
    method: "get",
  });
}
