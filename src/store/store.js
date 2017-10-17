import Vue from "vue";
import Vuex, { Store } from "vuex";


Vue.use(Vuex);
export const store = new Store({
  state: {
    saved: [
      "a record",
      "another record"
    ],
    mutations: {
      save: ( state, record ) => ({
        ...state,
        saved: state.saved.concat(record)
      })
    }
  }
});
