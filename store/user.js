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
