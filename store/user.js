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
    isValid: false,
    isAdmin: false
  }
});

export const getters = {
  getUser: state => state.user,
  getUserValid: state => state.user.isValid
};

export const mutations = {
  updateUserInfo(state, payload) {
    state.user = payload;
  },
  clearState (state) {
    state.user = {
      name: '',
      email: '',
      phone: '',
      deliveryAddress: null,
      isOwnPickUp: false,
      isValid: false,
      isAdmin: false
    }
  }
};

export const actions = {
  async getUserInfo({ dispatch, commit }) {
    try {
      const uid = await dispatch('auth/getUid', {}, { root: true });
      const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
      commit('updateUserInfo', info)
    } catch (e) {
      throw e;
    }
  },
  async updateUserInfo ({ dispatch, commit }, payload) {
    try {
      const { name, email, phone, deliveryAddress, isOwnPickUp, isValid, isAdmin } = payload;
      const uid = await dispatch('auth/getUid', {}, { root: true });
      await firebase.database().ref(`/users/${uid}/info`).set({
        name, email, phone, deliveryAddress, isOwnPickUp, isValid, isAdmin
      })
      commit('updateUserInfo', payload)
    } catch (e) {
      throw e;
    }
  },
  clearState ({ commit }) {
    commit('clearState');
  }
}
