export const state = () => ({
  productsAmount: 0,
  cartItems: {}
});

export const getters = {
  getProductsAmount: state => state.productsAmount
};

export const mutations = {
  updateProductsAmount(state, payload) {
    state.cartItems[payload.id] = +payload.count;
    let sum = 0;
    for (let key in state.cartItems) {
      sum += state.cartItems[key];
    }
    state.productsAmount = sum;
  }
};
