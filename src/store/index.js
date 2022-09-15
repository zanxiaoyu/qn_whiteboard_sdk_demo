import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    client: null
  },
  mutations: {
    set_client(state, client) {
      state.client = client
    }
  },
  actions: {},
  modules: {},
});
