export const state = () => ({
  user: {
    name: '',
    email: '',
    phone: '',
    deliveryAddress: null,
    isOwnPickUp: false
  }
});

export const getters = {
  getUser: state => state.user,
};

export const mutations = {
  updateUserInfo(state, payload) {
    state.user = payload;
  }
};
