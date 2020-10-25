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
  updateProductsAmount (state, payload) {
    state.cartItems[payload.id] = {
      count: +payload.count,
      price: +payload.price,
      title: state.products.find(e => e.id === payload.id).title
    };
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
  setOrder (state) {
    const data = {};
    let price = 0;
    for (let key in state.cartItems) {
      price += state.cartItems[key].price * state.cartItems[key].count;
    }
    data.order = state.cartItems;
    data.price = price;
    state.orders.push(data);
    state.cartItems = {};

  }
};

export const actions = {
  setProducts ({ commit }, payload) {
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref(`/users/${uid}/cart/products`).set(payload);
    commit('setProducts', payload);
    commit('clearCart');
  }
}
