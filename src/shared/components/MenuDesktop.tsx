import { NavLink } from 'react-router-dom';
import Button from './Button';
import logo from '../../assets/images/logo.svg';
import { DropdownMenu } from './DropdownMenu';
import { usePersistContext } from '../../store/usePersistContext';

export function MenuDesktop() {
  const { userType, logOut } = usePersistContext();

  return (
    <div className="flex w-full items-center justify-between">
      <NavLink to="/" aria-label="Go to homepage">
        <img src={logo} alt="Website logo" className="h-7 w-auto" />
      </NavLink>

      <div className="hidden md:flex items-center space-x-4">
        {userType !== 'manager' && (
          <NavLink to="/auth/register/admin" className="text-primary-dark-blue hover:text-accent-pink font-bold">
            List Your Property
          </NavLink>
        )}

        <div className="flex space-x-4">
          {userType !== 'guest' ? (
            <>
              {
                <div className="flex space-x-4">
                  {<Button type="button" label="Log out" onClick={logOut} variant="secondary" ariaLabel="log out" />}
                </div>
              }
            </>
          ) : (
            <>
              {
                <div className="flex space-x-4">
                  <Button type="button" label="Login" to="/auth/login" variant="secondary" ariaLabel="login" />
                  <Button type="button" label="Register" to="/auth/register" variant="primary" ariaLabel="register" />
                </div>
              }
            </>
          )}
        </div>

        {userType !== 'guest' && (
          <div className="flex items-center space-x-4">
            <div className="border-l border-neutral-dark h-6"></div>

            <DropdownMenu />
          </div>
        )}
      </div>
    </div>
  );
}
