import * as firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database'

export const actions = {
  async register ({ dispatch, commit }, { email, password, name, phone }) {
    await firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
      const uid = firebase.auth().currentUser.uid;
      firebase.database().ref(`/users/${uid}/info`).set({
        name, email, phone,
        deliveryAddress: '',
        isOwnPickUp: false,
        isValid: false
      })
      firebase.auth().currentUser.getIdToken(true).then((token) => {
        document.cookie = `ACCESS_TOKEN=${token};`
      })
    }).catch(e => {
      console.log(e)
    })
  },
  async login ({ dispatch, commit }, { email, password }) {
    await firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
      firebase.auth().currentUser.getIdToken(true).then((token) => {
        document.cookie = `ACCESS_TOKEN=${token};`
      })
    }).catch(e => {
      console.log(e)
    })
  }
}
