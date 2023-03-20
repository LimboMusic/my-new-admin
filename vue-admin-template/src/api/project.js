import request from "@/utils/request";

export function getAllProject() {
  return request({
    url: "/api/project",
    method: "get",
  });
}

export function updateOneProject(project) {
  return request({
    url: "/api/project/" + project.id,
    method: "put",
    data: project.data,
  });
}

export function addOneProject(project) {
  return request({
    url: "/api/project",
    method: "post",
    data: project,
  });
}

export function removeOneProject(id) {
  return request({
    url: "/api/project/" + id,
    method: "delete",
  });
}
