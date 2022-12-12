// 引入数据仓库
import Vuex from "vuex";

const store = new Vuex.Store({
  // 专门用来存放全局数据，相当于组件里面的data
  state: { num: 0 },
  //   getters相当于computed,getters是全局的，computed是组件内部的
  //   getters将组件中统一使用的computed都放到getters里面进行监听，监听数据变化
  getters: {
    getNum(state) {
      return store.state.num;
    },
  },
  //   mutation相当于组件中的methods，但是不能使用异步方法，不能使用axios和定时器
  mutations: {
    // 增加num
    // payload 是一个形参，如果组件在commit时
    // 有传递参数，就存在。如果没有传递那么就是undefined
    increase(state, payload) {
      state.num += payload ? payload : 1;
    },
    decrease(state, payload) {
      state.num -= payload ? payload : 1;
    },
  },
  //   action专门用来处理异步，实际修改状态值的是mutation
  //   点击减一以后放慢疫苗再执行
  actions: {
    decreaseAsync(context) {
      context.commit("decrease", 2);
    },
  },
  modules: {},
});

export default store;
