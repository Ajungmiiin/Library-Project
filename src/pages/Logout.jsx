import { signOut } from 'firebase/auth';
import { redirect } from 'react-router-dom';
import { auth } from '../utils/firebase';

export function action() {
  localStorage.removeItem('user');
  signOut(auth);
  return redirect('/');
}
