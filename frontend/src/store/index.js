import { createStore } from 'vuex';

const store = createStore({
    state: {
        user: undefined
    },
    getters: {
        getUser: state => state.user
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {},
    modules: {}
});

export default store;
