import { Outlet } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { BackToTop } from './BackToTop';

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-50 via-white to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};
