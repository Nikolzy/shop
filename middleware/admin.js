import * as firebase from 'firebase/app';
import 'firebase/auth';

export default async function ({ redirect, $dialog }) {
  return await new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged((user) => {
      (async function () {
        let userInfo = (await firebase.database().ref(`/users/${user.uid}/info`).once('value')).val();
        if (user && userInfo.isAdmin) {
          resolve(user);
        } else if (user) {
          setTimeout(() => {
            $dialog.notify.error('У вам немає прав адміністратора!', {
              position: 'top-right',
              timeout: 3000
            })
          }, 1000)
          return redirect('/');
        } else {
          return redirect('/login');
        }
      })()
    })
  })
}

