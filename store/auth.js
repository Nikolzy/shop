import * as firebase from "firebase/app";
import 'firebase/auth'

export const state = {
  user: {}
}
export const actions = {
  async register({ dispatch, commit }, { email, password, name }) {
    await firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
      const uid = firebase.auth().currentUser.uid;
      firebase.database().ref(`/users/${uid}/info`).set({
        name, email
      })
      firebase.auth().currentUser.getIdToken(true).then((token) => {
        document.cookie = `ACCESS_TOKEN=${token};`
      })
    }).catch(e => {
      console.log(e)
    })
  },
  async login ({ dispatch, commit }, { email, password }) {
    await firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
      firebase.auth().currentUser.getIdToken(true).then((token) => {
        document.cookie = `ACCESS_TOKEN=${token};`
      })
    }).catch(e => {
      console.log(e)
    })
  },
  getUid() {
    const user = firebase.auth().currentUser;
    return user ? user.uid : null;
  },
}
