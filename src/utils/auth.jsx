import { signInWithEmailAndPassword } from 'firebase/auth';

export const authLoader = () => {
  const user = localStorage.getItem('user') !== null;

  return user;
};

export const getUserId = () => {
  const userId = localStorage.getItem('user');
  return userId;
};

export const login = async (auth, email, password) => {
  const response = await signInWithEmailAndPassword(auth, email, password);
  const userId = response.user.uid;
  localStorage.setItem('user', userId);
};
