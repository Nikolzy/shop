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
  clearToken(state) {
    state.ACCESS_TOKEN = null;
  },
  setAuthError(state, payload) {
    state.auth_error = payload;
  },
  resetAuthError(state) {
    state.auth_error = '';
  }
}

export const getters = {
  getAuthError: state => state.auth_error
}

export const actions = {
  async register ({ dispatch, commit }, { email, password, name, phone }) {
    await firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
      const uid = firebase.auth().currentUser.uid;
      firebase.database().ref(`/users/${uid}/info`).set({
        name, email, phone,
        deliveryAddress: '',
        isOwnPickUp: false,
        isValid: false,
        isAdmin: false
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
  async logout ({ commit }) {
    firebase.auth().signOut().then(() => {
      commit('clearToken')
    })
  },
  getUid () {
    return firebase.auth().currentUser.uid;
  }
}
