import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';

export const state = {
  products: [],
  editedProduct: {},
  users: [],
  user: {},
  userOrders: [],
  staticsOrderNames: [],
  staticsOrderCount: []
}
export const mutations = {
  setProducts (state, payload) {
    state.products = payload;
  },
  setEditedProduct (state, payload) {
    state.editedProduct = payload;
  },
  setUsers (state, payload) {
    state.users = payload;
  },
  setUser (state, payload) {
    state.user = payload;
  },
  setOrders (state, payload) {
    state.userOrders = payload;
  },
  setStaticsOrderNames (state, payload) {
    state.staticsOrderNames = payload;
  },
  setStaticsOrderCount (state, payload) {
    state.staticsOrderCount = payload;
  },
  clearEditedProduct (state) {
    state.editedProduct = {};
  },
  clearUser (state) {
    state.user = {};
  },
  clearState (state) {
    state.products = [];
    state.editedProduct = {};
    state.users = [];
    state.user = {};
    state.userOrders = [];
  }
}

export const getters = {
  getAdminProducts: state => state.products,
  getAdminEditedProduct: state => state.editedProduct,
  getAdminUsers: state => state.users,
  getUser: state => state.user,
  getOrders: state => state.userOrders,
  getStaticsOrderNames: state => state.staticsOrderNames,
  getStaticsOrderCount: state => state.staticsOrderCount
}

export const actions = {
  async setAdminProduct ({ dispatch, commit }, payload) {
    try {
      const products = (await firebase.database().ref('/products').once('value')).val() || [];
      const generalId = (await firebase.database().ref('/generalProductId').once('value')).val();
      const id = generalId ? generalId + 1 : 1;
      const data = { ...payload, id};
      products.push(data);

      await firebase.database().ref('/products').set(products);
      await firebase.database().ref('/generalProductId').set(id);
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
  async getUsers ({ commit }) {
    const usersInfo = (await firebase.database().ref('/users').once('value')).val() || [];
    const currentUserId = await firebase.auth().currentUser.uid;
    const users = [];
    for (let key in usersInfo) {
      users.push({
        ...usersInfo[key]['info'],
        uid: key,
        isCurrentUser: key === currentUserId
      })
    }
    commit('setUsers', users);
  },
  getUserById ({ commit, state }, userId) {
    const user = state.users.find(el => el.uid === userId);
    commit('setUser', user);
  },
  async updateUserInfoById ({ commit, state }, payload) {
    const editedUserInfo = { ...payload };
    delete editedUserInfo.uid;
    delete editedUserInfo.isCurrentUser;
    await firebase.database().ref(`/users/${payload.uid}/info`).set(editedUserInfo);
    commit('clearUser');
  },
  async deleteUserById ({}, userId) {
    await firebase.database().ref(`/users/${userId}/cart`).set(null);
    await firebase.database().ref(`/users/${userId}/info`).set(null);
  },
  async getOrderByUserId ({ commit }, userId) {
    const orders = (await firebase.database().ref(`/users/${userId}/cart/orders`).once('value')).val();
    commit('setOrders', orders || []);
  },
  async getOrderForStatics ({ commit }) {
    const usersInfo = (await firebase.database().ref('/users').once('value')).val() || [];
    const orders = [];
    for (let key in usersInfo) {
      const user = usersInfo[key];
      if (user.cart && user.cart.orders) {
        orders.push(user.cart.orders)
      }
    }
    const preMadeArray = orders.flat().map(el => {
      if (el.order.length) {
        return el.order;
      }
      return Object.values(el.order)
    })
    console.log(preMadeArray.flat())
    const res = preMadeArray.flat().reduce((ac,el) => {
      ac[el.title] = ac[el.title] ? ac[el.title] + el.count : 1;
      return ac;
    },{})
    const resultOrderNames = Object.keys(res);
    const resultOrderCount = Object.values(res);
    commit('setStaticsOrderNames', resultOrderNames);
    commit('setStaticsOrderCount', resultOrderCount);
  },
  clearState ({ commit }) {
    commit('clearState');
  }
}
