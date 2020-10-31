import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database'

export const state = {
  products: [],
  editedProduct: {}
}
export const mutations = {
  setProducts (state, payload) {
    state.products = payload;
  },
  setEditedProduct (state, payload) {
    state.editedProduct = payload;
  },
  clearEditedProduct (state) {
    state.editedProduct = {};
  },
  clearState (state) {
    state.products = [];
    state.editedProduct = {};
  }
}

export const getters = {
  getAdminProducts: state => state.products,
  getAdminEditedProduct: state => state.editedProduct
}

export const actions = {
  async setAdminProduct ({ dispatch, commit }, payload) {
    try {
      const products = (await firebase.database().ref('/products').once('value')).val() || [];
      const generalId = (await firebase.database().ref('/generalId').once('value')).val();
      const id = generalId ? generalId + 1 : 1;
      const data = { ...payload, id};
      products.push(data);

      await firebase.database().ref('/products').set(products);
      await firebase.database().ref('/generalId').set(id);
      await dispatch('cart/setProducts', products, { root: true })
    } catch (e) {
      throw e;
    }
  },
  async getAdminProducts ({ commit }) {
    try {
      const products = (await firebase.database().ref('/products').once('value')).val() || [];
      commit('setProducts', products);
    } catch (e) {
      throw e;
    }
  },
  async getAdminProductById ({ dispatch ,commit }, productId) {
    const products = (await firebase.database().ref('/products').once('value')).val() || [];
    let editedProduct = products.find(el => el.id === +productId);
    commit('setEditedProduct', editedProduct);
  },
  // async getUsers () {
  //   const products = (await firebase.database().ref('/users').once('value')).val() || [];
  //   const res = [];
  //   for (let key in products) {
  //     res.push({
  //       ...products[key]['info'],
  //       uid: key
  //     })
  //   }
  //   console.log(res)
  // },
  async updateAdminProductById ({ dispatch ,commit }, payload) {
    try {
      const products = (await firebase.database().ref('/products').once('value')).val() || [];
      const edited = products.map(el => el.id === payload.id
        ? ({
          ...payload,
        })
        : el
      );
      await firebase.database().ref('/products').set(edited);
      commit('setProducts', edited);
      await dispatch('cart/setProducts', edited, { root: true })
      commit('clearEditedProduct');
    } catch (e) {
      throw e;
    }
  },
  async deleteProductById ({ dispatch ,commit }, productId) {
    try {
      const products = (await firebase.database().ref('/products').once('value')).val() || [];
      const filtered = products.filter(el => el.id !== productId);
      await firebase.database().ref('/products').set(filtered);
      commit('setProducts', filtered);
      await dispatch('cart/setProducts', filtered, { root: true })
    } catch (e) {
      throw e;
    }
  },
  clearState ({ commit }) {
    commit('clearState');
  }
}
