import { Form, Link, NavLink, useRouteLoaderData } from 'react-router-dom';

function MainNavigation() {
  // 현재 로그인 상태 확인
  const isLogin = useRouteLoaderData('root');
  const navBtnActiveStyle = 'text-[#525252]';
  return (
    <header className="w-full max-w-[1280px] m-auto p-4 md:p-6 text-lg md:text-2xl border-b md:flex md:justify-between md:items-center md:px-8 md:border-none">
      <Link to="/">
        <h1 className="text-2xl mb-5 md:m-0 md:text-3xl">My Library ,</h1>
      </Link>
      <nav className="text-base md:text-xl">
        <ul className="flex gap-8 text-[18px]  font-bold md:justify-center text-gray-300">
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? navBtnActiveStyle : '')}
              to="/"
            >
              {' '}
              내 서재
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? navBtnActiveStyle : '')}
              to="search"
            >
              검색
            </NavLink>
          </li>
          <li>
            {isLogin && (
              <Form action="logout" method="post">
                <button className="text-gray-300">로그아웃</button>
              </Form>
            )}
            {!isLogin && (
              <Link className="text-neutral-600" to="/auth?mode=login">
                로그인
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
