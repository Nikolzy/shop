import * as firebase from 'firebase/app';
import 'firebase/auth';

export default function ({ redirect }) {
  // console.log($auth, firebase.auth())
  // const user = firebase.auth().currentUser;
  // if (!user) {
  //   return redirect('/login');
  // }
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user, resolve(user))
        resolve(user);
      } else {
        return redirect('/login');
      }
    })
  })
}

