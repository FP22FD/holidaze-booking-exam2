import { Link, useLocation, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ManagerRegisterForm from './components/ManagerRegisterForm';
import logo from '/src/assets/images/logo.svg';
import { Helmet } from 'react-helmet-async';

export default function AuthPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginTab = location.pathname === '/auth/login';
  const isAdminRegister = location.pathname.startsWith('/auth/register/admin');

  const handleTabClick = (isLoginTab: boolean) => {
    navigate(isLoginTab ? '/auth/login' : '/auth/register');
  };

  const tabClasses = (active: boolean) =>
    active
      ? 'border border-b-0 border-neutral-default text-primary-dark'
      : 'bg-neutral-lighter border border-neutral-default border-x-0 border-t-0 text-typography-primary-grey';

  return (
    <div className="bg-auth-background bg-cover bg-center min-h-screen flex items-center justify-center p-6 sm:p-12 lg:pt-16">
      <Helmet>
        <title>{'Login and Register | Holidaze Booking'}</title>
        <meta name="description" content={'Log in or create an account on Holidaze to book or manage your stays.'} />
      </Helmet>

      <Link to="/">
        <img src={logo} alt="Logo" className="absolute top-8 w-auto sm:top-12 sm:left-12" />
      </Link>

      <div
        className={`bg-neutral-white shadow-custom flex flex-col ${
          isAdminRegister ? 'mt-16 max-w-4xl' : 'mt-8 rounded-lg min-h-[630px] w-full max-w-md md:max-w-lg'
        }`}
      >
        {!isAdminRegister && (
          <div className="flex">
            <button
              onClick={() => handleTabClick(true)}
              aria-selected={isLoginTab}
              aria-controls="login-tab"
              className={`w-1/2 py-2 text-center font-bold rounded-tl-lg ${tabClasses(isLoginTab)}`}
            >
              Login
            </button>
            <button
              onClick={() => handleTabClick(false)}
              aria-selected={!isLoginTab}
              aria-controls="register-tab"
              className={`w-1/2 py-2 text-center font-bold rounded-tr-lg ${tabClasses(!isLoginTab)}`}
            >
              Register
            </button>
          </div>
        )}

        <div className="justify-center items-center">
          {isAdminRegister ? <ManagerRegisterForm /> : isLoginTab ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}
