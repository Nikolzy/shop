import * as firebase from 'firebase/app';
import 'firebase/auth';

export default function ({ redirect }) {
  const user = firebase.auth().currentUser
  if (!user) {
    return redirect('/login');
  }
}
