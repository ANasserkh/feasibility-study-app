export const state = () => ({
  userInfo: {}
});

export const actions = {
  async login({ commit }, data) {
    //TODO: add login method
    try {
      commit("add", data);
      return true;
    } catch (err) {
      console.log(`Print: login -> err`, err);
      return false;
    }
  }
};

export const mutations = {
  add(state, user) {
    state.userInfo = user;
    console.log(`Print: add -> state.userInfo`, state.userInfo);
  }
};
