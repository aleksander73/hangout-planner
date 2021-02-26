import { createStore } from 'vuex';

const store = createStore({
	state: {
        inputFields: [
            {
                tag: 'username',
                inputType: 'text',
                icon: require('../../assets/icons/user.svg')
            },
            {
                tag: 'email',
                inputType: 'text',
                icon: require('../../assets/icons/email.svg')
            },
            {
                tag: 'password',
                inputType: 'password',
                icon: require('../../assets/icons/password.svg')
            }
        ]
    },
    getters: {
        getInputFieldByTag: (state) => (tag) => {
            return state.inputFields.find(inputField => inputField.tag === tag);
        }
    },
    mutations: {},
    actions: {},
    modules: {}
});

export default store;
