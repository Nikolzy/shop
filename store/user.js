import * as firebase from 'firebase'
import 'firebase/auth';
import 'firebase/database'

export const state = () => ({
  user: {
    name: '',
    email: '',
    phone: '',
    deliveryAddress: null,
    isOwnPickUp: false,
    isValid: false
  }
});

export const getters = {
  getUser: state => state.user,
  getUserValid: state => state.user.isValid
};

export const mutations = {
  updateUserInfo(state, payload) {
    state.user = payload;
  }
};

export const actions = {
  async getUserInfo({ commit }) {
    try {
      const uid = firebase.auth().currentUser.uid;
      const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
      commit('updateUserInfo', info)
    } catch (e) {
      throw e;
    }
  },
  async updateUserInfo ({ commit }, payload) {
    try {
      const { name, email, phone, deliveryAddress, isOwnPickUp, isValid } = payload;
      const uid = firebase.auth().currentUser.uid;
      firebase.database().ref(`/users/${uid}/info`).set({
        name, email, phone, deliveryAddress, isOwnPickUp, isValid
      })
      commit('updateUserInfo', payload)
    } catch (e) {
      throw e;
    }
  }
}
