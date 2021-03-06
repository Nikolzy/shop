import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'

export const state = () => ({
  productsAmount: 0,
  orders: [],
  cartItems: {},
  products: []
});

export const getters = {
  getProductsAmount: state => state.productsAmount,
  getCartItems: state => state.cartItems,
  getProducts: state => state.products,
  getOrders: state => state.orders
};

export const mutations = {
  setProducts (state, payload) {
    state.products = payload;
  },
  setCartItems (state, payload) {
    state.cartItems[payload.id] = {
      count: +payload.count,
      price: +payload.price,
      title: state.products.find(e => e.id === payload.id).title
    };
  },
  setProductsAmount (state) {
    let count = 0;
    for (let key in state.cartItems) {
      count += state.cartItems[key].count;
    }
    state.productsAmount = count;
  },
  updateProducts (state, payload) {
    const data = state.products.find(el => el.id === payload.id);
    data.count = +payload.count;
    data.status = payload.status;
  },
  clearCart (state) {
    state.productsAmount = 0;
    state.products = state.products.map(el => ({
      ...el, status: 'removed', count: 1
    }))
  },
  setOrder (state, orderId) {
    const data = {};
    let price = 0;
    for (let key in state.cartItems) {
      price += state.cartItems[key].price * state.cartItems[key].count;
    }
    data.order = state.cartItems;
    data.price = price;
    data.id = orderId;
    state.orders.push(data);
    state.cartItems = {};
  },
  setOrders (state, payload) {
    state.orders = payload;
  },
  clearState (state) {
    state.productsAmount = 0;
    state.orders = [];
    state.cartItems = {};
    state.products = [];
  }
};

export const actions = {
  async setProducts ({ dispatch ,commit }, payload) {
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref(`/users/${uid}/cart/products`).set(payload);
    commit('setProducts', payload);
    commit('clearCart');
  },
  async getProducts ({ commit }) {
    const products = (await firebase.database().ref(`/products`).once('value')).val();
    commit('setProducts', products || []);
  },
  async setOrder ({ commit, state }) {
    const generalId = (await firebase.database().ref('/generalOrderId').once('value')).val();
    const id = generalId ? generalId + 1 : 1;
    await firebase.database().ref('/generalOrderId').set(id);
    commit('setOrder', id);
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref(`/users/${uid}/cart/orders`).set(state.orders);
    commit('clearCart');
  },
  async updateProductsAmount ({ commit, state }, payload) {
    commit('setCartItems', payload);
    // firebase.database().ref(`/users/${uid}/cart/cartItems`).set(state.cartItems);
    commit('setProductsAmount');
    // firebase.database().ref(`/users/${uid}/cart/productsAmount`).set(state.productsAmount);
  },
  clearState ({ commit }) {
    commit('clearState');
  },
  async getOrders ({ commit }) {
    const uid = firebase.auth().currentUser.uid;
    const orders = (await firebase.database().ref(`/users/${uid}/cart/orders`).once('value')).val();
    commit('setOrders', orders || []);
  }
  // async getCartItems ({ state }) {
  //   const uid = firebase.auth().currentUser.uid;
  //   const cartItems = (await firebase.database().ref(`/users/${uid}/cart/cartItems`).once('value')).val();
  //   state.cartItems = cartItems || {};
  // },
  // async getProductsAmount ({ state }) {
  //   const uid = firebase.auth().currentUser.uid;
  //   const productsAmount = (await firebase.database().ref(`/users/${uid}/cart/productsAmount`).once('value')).val();
  //   state.productsAmount = productsAmount || 0;
  // }
}
