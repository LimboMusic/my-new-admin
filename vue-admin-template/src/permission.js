import router from "./router";
import store from "./store";
import { Message } from "element-ui";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
import { getToken } from "@/utils/auth"; // get token from cookie
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ["/login"]; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  const hasUserInfo = store.getters.user;
  if (to.meta.auth) {
    //说明页面需要鉴权
    if(hasUserInfo){
      //说明有用户信息
      next()
    } else{
      //说明没有用户信息 判断是否有userToken
      const userToken = localStorage.getItem('userToken')
      if(userToken){
        //说明有token，验证有效性
        try{
          await store.dispatch('user/getInfo')
          next()
          NProgress.done()
        } catch(err){
          Message.error('登录权限已过期!')
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          console.log(err)
          NProgress.done()
        }
      } else {
        //说明没有token，重新登录
        next({path:`/login?redirect=${to.path}`})
        NProgress.done()
      }
    }

  } else {
    //说明页面不需要鉴权
    if (to.path === "/login" && hasUserInfo) {
      //说明在登录状态下，要去往登录页面,跳转到首页
      next({ path: "/" });
    } else {
      next();
    }
    NProgress.done()
  }

  // determine whether the user has logged in
  // const hasToken = getToken()

  // if (hasToken) {
  //   if (to.path === '/login') {
  //     // if is logged in, redirect to the home page
  //     next({ path: '/' })
  //     NProgress.done()
  //   } else {
  //     const hasGetUserInfo = store.getters.name
  //     if (hasGetUserInfo) {
  //       next()
  //     } else {
  //       try {
  //         // get user info
  //         await store.dispatch('user/getInfo')

  //         next()
  //       } catch (error) {
  //         // remove token and go to login page to re-login
  //         await store.dispatch('user/resetToken')
  //         Message.error(error || 'Has Error')
  //         next(`/login?redirect=${to.path}`)
  //         NProgress.done()
  //       }
  //     }
  //   }
  // } else {
  //   /* has no token*/

  //   if (whiteList.indexOf(to.path) !== -1) {
  //     // in the free login whitelist, go directly
  //     next()
  //   } else {
  //     // other pages that do not have permission to access are redirected to the login page.
  //     next(`/login?redirect=${to.path}`)
  //     NProgress.done()
  //   }
  // }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
