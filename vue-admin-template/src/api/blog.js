import request from "@/utils/request";

export function getBlog(page = 1, limit = 7) {
  return request({
    url: "/api/blog",
    method: "get",
    params: {
      page,
      limit,
    },
  });
}

export function removeOneBlog(id) {
  return request({
    url: "/api/blog/" + id,
    method: "delete",
  });
}

export function addBlog(blog) {
  return request({
    url: "/api/blog",
    method: "post",
    data: blog,
  });
}

export function editBlog(blog){
  return request({
    url:"/api/blog/" + blog.id,
    method: 'put',
    data: blog.data
  })
}

export function findOneBlog(id){
  return request({
    url:"/api/blog/" + id,
    method: 'get'
  })
}
