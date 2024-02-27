import { Form, Link, useActionData, useSearchParams } from 'react-router-dom';
import useInput from '../../Hooks/useInput';
import Input from '../ui/Input/Input';
import Section from '../ui/Layout/Section';

function AuthForm({ onSubmit }) {
  let err = 'text-sm text-red-600 mb-2';
  const {
    value: emailValue,
    hasError: emailIsInvalid,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
  } = useInput('', checkedEmailValidation);

  const {
    value: passwordValue,
    hasError: passwordIsInvalid,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
  } = useInput('', chneckedPasswordValidation);
  const error = useActionData();
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';

  let InputStyle = 'border p-3  text-sm w-full mb-2 focus:border-neutral-600';

  function checkedEmailValidation(value) {
    return value.length !== '' && value.includes('@');
  }

  function chneckedPasswordValidation(value) {
    return value.length >= 6;
  }

  return (
    <Section>
      <h1 className="text-center text-lg mb-4 font-bold">
        {isLogin ? '로그인' : '회원가입'}
      </h1>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <Form method="post" className="max-w-[380px] m-auto">
        <Input
          input={{
            value: emailValue,
            id: 'email',
            type: 'email',
            name: 'email',
            onChange: handleEmailChange,
            onBlur: handleEmailBlur,
            placeholder: '아이디',
            className: `${InputStyle} ${
              !isLogin && emailIsInvalid && 'border-red-600'
            }`,
          }}
          labelStyle="font-bold text-sm block mb-2 "
        />
        {!isLogin && emailIsInvalid && (
          <p className={err}>유효한 이메일 형식이 아닙니다.</p>
        )}
        <Input
          labelStyle="font-bold text-sm block mb-2 "
          input={{
            value: passwordValue,
            id: 'password',
            name: 'password',
            type: 'password',
            onChange: handlePasswordChange,
            onBlur: handlePasswordBlur,
            placeholder: '비밀번호',
            className: `${InputStyle} ${
              !isLogin && passwordIsInvalid && 'border-red-600'
            }`,
          }}
        />
        {!isLogin && passwordIsInvalid && (
          <p className={err}>최소 6자 이상 입력해주세요.</p>
        )}
        <button className="w-full bg-neutral-600 py-2 text-white font-bold mb-2 ">
          {isLogin ? '로그인' : '회원가입'}
        </button>
        <Link
          className="block text-end text-sm text-gray-400"
          to={`?mode=${isLogin ? 'signup' : 'login'}`}
        >
          {isLogin ? '아이디가 없으신가요?' : '로그인하러가기'}
        </Link>
      </Form>
    </Section>
  );
}

export default AuthForm;
