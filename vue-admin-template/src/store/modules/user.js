import { userLogin, logout, getUserInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { resetRouter } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    user: null,
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  // SET_TOKEN: (state, token) => {
  //   state.token = token;
  // },
  // SET_NAME: (state, name) => {
  //   state.name = name;
  // },
  // SET_AVATAR: (state, avatar) => {
  //   state.avatar = avatar;
  // },
  SET_USER: (state, userInfo) => {
    state.user = userInfo;
  },
};

const actions = {
  // user login
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      userLogin(userInfo)
        .then((res) => {
          // console.log(res)
          if (!res.data) {
            reject(res);
          }
          commit("SET_USER", res);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then((res) => {
        if (typeof res === "string") {
          res = JSON.parse(res);
          reject(res.msg);
        }
        if (typeof res === "object") {
          commit("SET_USER", res.data);
          resolve();
        }
      });
    });
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token)
    //     .then((response) => {
    //       const { data } = response;

    //       if (!data) {
    //         return reject("Verification failed, please Login again.");
    //       }

    //       const { name, avatar } = data;

    //       commit("SET_NAME", name);
    //       commit("SET_AVATAR", avatar);
    //       resolve(data);
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken();
      resetRouter();
      commit("RESET_STATE");
      resolve();
    });
    //   logout(state.token)
    //     .then(() => {
    //       removeToken(); // must remove  token  first
    //       resetRouter();
    //       commit("RESET_STATE");
    //       resolve();
    //     })
    //     .catch((error) => {
    //       reject(error);
    //     });
    // });
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
