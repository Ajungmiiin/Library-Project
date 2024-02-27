import { createUserWithEmailAndPassword } from 'firebase/auth';
import { redirect } from 'react-router-dom';
import AuthForm from '../components/Form/AuthForm';
import { login } from '../utils/auth';
import { auth } from '../utils/firebase';

function Auth() {
  return <AuthForm />;
}

export default Auth;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'login';

  const formData = await request.formData();

  const userInfo = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  if (mode !== 'signup' && mode !== 'login') {
    throw new Error('질못된 경로입니다.');
  }

  // 회원가입
  if (mode === 'signup') {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        userInfo.email,
        userInfo.password
      );
      await login(auth, userInfo.email, userInfo.password);
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          return '이미 사용 중인 이메일입니다.';
        case 'auth/weak-password':
          return '비밀번호는 6글자 이상이어야 합니다.';
        case 'auth/network-request-failed':
          return '네트워크가 불안정 합니다.';
        case 'auth/invalid-email':
          return '잘못된 이메일 형식입니다.';
        case 'auth/internal-error':
          return '잘못된 요청입니다.';
        default:
          return '로그인에 실패 하였습니다';
      }
    }
  }
  // 로그인
  if (mode === 'login') {
    try {
      await login(auth, userInfo.email, userInfo.password);
    } catch (err) {
      console.error(err);
      switch (err.code) {
        case 'auth/user-not-found' || 'auth/wrong-password':
          return '이메일 또는 비밀번호가 일치하지 않습니다.';

        case 'auth/network-request-failed':
          return '네트워크가 불안정 합니다.';

        default:
          return '로그인에 실패 하였습니다.';
      }
    }
  }
  return redirect('/');
}
