import firebase from "firebase/app";
// import 'firebase/auth'
export const state = {
  user: {}
}
export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION: (state, { authUser, claims }) => {

    const { uid, email, emailVerified } = authUser
    // state.user = { uid, email, emailVerified }
  }
}
export const actions = {
  // onAuthStateChangedAction: (ctx, { authUser, claims }) => {
  //   if (!authUser) {
  //     // claims = null
  //     // Perform logout operations
  //   } else {
  //     // Do something with the authUser and the claims object...
  //   }
  // }
  async register({ dispatch, commit }, { email, password }) {
    try {
      console.log(email, password)
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      const uid = await dispatch('getUid');
      await firebase.database().ref(`/users/${uid}/info`).set({
        bill: 100000,
        email
      })
    } catch (e) {
      commit('setError', e)
      throw e;
    }
  },
  getUid() {
    const user = firebase.auth().currentUser;
    return user ? user.uid : null;
  }
}
