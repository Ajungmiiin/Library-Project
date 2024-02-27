import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/ui/Layout/MainNavigation';

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
