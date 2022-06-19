import axiosClient from "@/axios";
import { createStore } from "vuex";

export default createStore({
    state: {
        user: {
            id: '',
            name: '',
            email: ''
        },
        check: ''
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        check(state, payload) {
            state.check = payload;
        }
    },
    actions: {
        signIn({commit}, payload) {
            return axiosClient.post("/auth/login", payload)
            .then(res => {
                commit("check", 'loggedin');
                return res;
            })
            .catch(err => {
                console.log('store error', err);
            })
            

        },
        signUp({commit}, user) {
            return axiosClient.post("/auth/register", user)
            .then(res => {
                commit("check", 'registered');
                return res;
            })
            .catch(err => {
                console.log(err);
            })
        },
        getMe({commit}) {
            return axiosClient.get("/auth/users/showMe")
            .then(res => {
                commit("setUser", res.data);
                console.log(res);
                return res;
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
    getters: {
        user: state => state.user
    },
    modules: {}
});

