import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

/* Layout */
import Layout from "@/layout";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },

  {
    path: "/404",
    component: () => import("@/views/404"),
    hidden: true,
  },

  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index"),
        meta: { title: "控制台", icon: "dashboard", auth: true },
      },
    ],
  },

  {
    path: "/home",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import("@/views/home/index"),
        meta: { title: "首页", icon: "el-icon-s-home", auth: true },
      },
    ],
  },

  {
    path: "/blog",
    component: Layout,
    redirect: "/blog",
    name: "Blog",
    meta: { title: "文章管理", icon: "el-icon-document", auth: true },
    children: [
      {
        path: "addBlog",
        name: "AddBlog",
        component: () => import("@/views/addBlog/index"),
        meta: { title: "添加文章", icon: "el-icon-document-add", auth: true },
      },
      {
        path: "bloglist",
        name: "Bloglist",
        component: () => import("@/views/bloglist/index"),
        meta: { title: "文章列表", icon: "el-icon-s-order", auth: true },
      },
      {
        path: "blogtype",
        name: "Blogtype",
        component: () => import("@/views/blogtype/index"),
        meta: { title: "文章分类", icon: "el-icon-menu", auth: true },
      },
      {
        path: "editBlog/:id",
        name: "EditBlog",
        hidden: true,
        component: () => import("@/views/editBlog/index"),
        meta: {
          title: "编辑",
          icon: "el-icon-menu",
          auth: true,
        },
      },
    ],
  },

  {
    path: "/project",
    component: Layout,
    redirect: "/project",
    name: "Project",
    meta: { title: "项目管理", icon: "el-icon-s-cooperation", auth: true },
    children: [
      {
        path: "addProject",
        name: "AddProject",
        component: () => import("@/views/project/add/index"),
        meta: { title: "添加项目", icon: "el-icon-plus", auth: true },
      },
      {
        path: "projectList",
        name: "ProjectList",
        component: () => import("@/views/project/list/index"),
        meta: { title: "项目列表", icon: "el-icon-s-order", auth: true },
      },
    ],
  },
  {
    path: "/my",
    name: "My",
    component: Layout,
    hidden:true,
    children:[
      {
        path: "admin",
        name: "Admin",
        component: () => import("@/views/my/index"),
        meta: { title: "个人中心", auth: true },
      }
    ]
  },

  {
    path: "/comment",
    component: Layout,
    children: [
      {
        path: "comment",
        name: "Comment",
        component: () => import("@/views/comment/index"),
        meta: {
          title: "评论管理",
          icon: "el-icon-chat-line-square",
          auth: true,
        },
      },
    ],
  },

  {
    path: "/message",
    component: Layout,
    children: [
      {
        path: "index",
        name: "Message",
        component: () => import("@/views/message/index"),
        meta: { title: "留言板", icon: "el-icon-edit-outline", auth: true },
      },
    ],
  },

  {
    path: "/about",
    component: Layout,
    children: [
      {
        path: "about",
        name: "About",
        component: () => import("@/views/about/index"),
        meta: { title: "关于我", icon: "el-icon-user", auth: true },
      },
    ],
  },
  {
    path: "/settings",
    component: Layout,
    children: [
      {
        path: "settings",
        name: "Settings",
        component: () => import("@/views/settings/index"),
        meta: { title: "设置", icon: "el-icon-setting", auth: true },
      },
    ],
  },

  // 404 page must be placed at the end !!!
  { path: "*", redirect: "/404", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
