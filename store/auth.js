import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database'

export const state = {
  ACCESS_TOKEN: null,
  auth_error: ''
}
export const mutations = {
  setToken(state, payload) {
    state.ACCESS_TOKEN = payload;
  },
  setAuthError(state, payload) {
    state.auth_error = payload;
  },
  clearState (state) {
    state.ACCESS_TOKEN = null;
    state.auth_error = '';
  }
}

export const getters = {
  getAuthError: state => state.auth_error
}

export const actions = {
  async register ({ dispatch, commit }, { email, password, name, phone, isAdmin }) {
    await firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
      const uid = firebase.auth().currentUser.uid;
      firebase.database().ref(`/users/${uid}/info`).set({
        name, email, phone,
        deliveryAddress: '',
        isOwnPickUp: false,
        isValid: false,
        isAdmin: isAdmin || false
      })
      firebase.auth().currentUser.getIdToken(true).then((token) => {
        document.cookie = `ACCESS_TOKEN=${token};`
        commit('setToken', token);
      })
    }).catch(e => {
      commit('setAuthError', e.code);
    })
  },
  async login ({ dispatch, commit, $dialog }, { email, password }) {
    await firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
      firebase.auth().currentUser.getIdToken(true).then((token) => {
        document.cookie = `ACCESS_TOKEN=${token};`
        commit('setToken', token);
      })
    }).catch(e => {
      commit('setAuthError', e.code);
    })
  },
  async logout ({ dispatch, commit }) {
    await firebase.auth().signOut().then(() => {
      commit('clearState');
      dispatch('user/clearState', {}, { root: true });
      dispatch('cart/clearState', {}, { root: true });
      dispatch('admin/clearState', {}, { root: true });
    })
  },
  getUid () {
    return firebase.auth().currentUser.uid;
  }
}
