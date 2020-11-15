import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database'

export const state = {
  generalSettings: {}
}
export const mutations = {
  setGeneralSettings (state, payload) {
    state.generalSettings = payload;
  }
}

export const getters = {
  getContactsGeneralSettings: state => state.generalSettings.contacts
}


export const actions = {
  async getGeneralSettings ({ commit }) {
    try {
      const settings = (await firebase.database().ref('/general-settings').once('value')).val() || {};
      commit('setGeneralSettings', settings);
    } catch (e) {
      throw e;
    }
  },
}
