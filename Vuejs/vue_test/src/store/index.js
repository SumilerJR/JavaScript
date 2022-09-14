//该文件用于创建Vuex中最为核心的store

import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

const actions = {
    // jia(context, value) {
    //     // console.log(context, value);
    //     context.commit('JIA', value);
    // },
    // jian(context, value) {
    //     context.commit('JIAN', value);
    // },
    jiaOdd(context, value) {
        if (context.state.sum % 2) {
            context.commit('JIA', value);
        }
    },
    jiaWait(context, value) {
        setTimeout(() => {
            context.commit('JIA', value);
        }, 500);
    }
};

const mutations = {
    JIA(state, value) {
        // console.log(state, value);
        state.sum += value;
    },
    JIAN(state, value) {
        state.sum -= value;
    }

};

const state = {
    sum: 0,
};


export default new Vuex.Store({
    actions, mutations, state
});

