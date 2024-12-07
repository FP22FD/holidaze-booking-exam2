import { NavLink } from 'react-router-dom';
import Button from './Button';
import logo from '../../assets/images/logo.svg';
import {
  PiExportLight,
  PiHouseLineLight,
  PiLayoutLight,
  PiTextAlignJustifyLight,
  PiUserRectangleLight,
  PiXLight,
} from 'react-icons/pi';
import { usePersistContext } from '../../store/usePersistContext';

interface Props {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export function MenuMobile({ isMobileMenuOpen, toggleMobileMenu }: Props) {
  const { userType, profileData, logOut } = usePersistContext();

  const pageLinks = [
    { label: 'Home', to: '/', icon: <PiHouseLineLight className="w-5 h-5" /> },
    { label: 'Profile', to: '/profile', icon: <PiUserRectangleLight className="w-5 h-5" /> },
    ...(userType === 'manager'
      ? [{ label: 'Dashboard', to: '/admin', icon: <PiLayoutLight className="w-5 h-5" /> }]
      : []),
  ];

  const name = profileData?.name ?? 'Guest';
  const avatar = profileData?.avatar ?? { url: '' };

  return (
    <>
      <div className="md:hidden flex items-center justify-between w-full p-4">
        <NavLink to="/" aria-label="Go to homepage">
          <img src={logo} alt="Website logo" className="h-7 w-auto" />
        </NavLink>

        <button
          onClick={toggleMobileMenu}
          className="relative"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {!isMobileMenuOpen ? (
            <PiTextAlignJustifyLight className="w-8 h-8" aria-hidden="true" />
          ) : (
            <PiXLight className="w-8 h-8" aria-hidden="true" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className={`fixed top-0 right-0 h-full w-64 bg-neutral-white shadow-custom z-40 transition-transform duration-300 transform flex flex-col ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          role="menu"
          aria-label="Mobile navigation"
        >
          <div className="p-6 flex justify-end">
            <button
              onClick={toggleMobileMenu}
              aria-label="Close menu"
              className="focus:outline-none bg-pink-gradient rounded p-1"
            >
              <PiXLight className="w-6 h-6 text-typography-primary-white" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col space-y-4">
              {userType !== 'guest' && (
                <>
                  <div className="flex items-center px-6 space-x-2 mb-6">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <img src={avatar?.url} alt="Profile Avatar" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex flex-col text-md">
                      <span className="font-semibold text-primary-dark-blue">{name}</span>
                      <span className="text-typography-primary-grey text-body-medium">{userType}</span>
                    </div>
                  </div>

                  <div className="flex flex-col px-6 space-y-4 mb-6">
                    <div className="border-t border-neutral-default mb-4"></div>

                    {pageLinks.map(({ label, to, icon }) => (
                      <NavLink
                        key={label}
                        to={to}
                        onClick={toggleMobileMenu}
                        className={({ isActive }) =>
                          `flex items-center space-x-2 p-3 py-2 rounded-lg pl-5 overflow-hidden relative text-primary-dark-blue hover:bg-accent-pinkLight   ${
                            isActive ? 'bg-accent-pinkLight text-status-error-red' : 'bg-transparent'
                          }`
                        }
                        aria-label={`Go to ${label}`}
                      >
                        {({ isActive }) => (
                          <>
                            <div
                              className={`absolute w-1.5 top-0 bottom-0 left-0  ${
                                isActive ? 'bg-pink-gradient' : 'bg-transparent'
                              }`}
                            ></div>
                            <div className="flex space-x-4">
                              {icon}
                              <span>{label}</span>
                            </div>
                          </>
                        )}
                      </NavLink>
                    ))}

                    <button
                      onClick={() => {
                        logOut();
                        toggleMobileMenu();
                      }}
                      className="flex items-center space-x-4 p-3 py-2 rounded-lg pl-5 text-primary-dark-blue hover:bg-accent-pinkLight"
                      aria-label="Log out"
                    >
                      <PiExportLight className="w-5 h-5 rotate-[-90deg]" />
                      <span>Log out</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col items-center space-y-4 px-6 mb-20">
              {userType !== 'manager' && (
                <NavLink to="/auth/register/admin" className="text-primary-dark-blue hover:text-accent-pink font-bold">
                  List Your Property
                </NavLink>
              )}

              {userType === 'guest' && (
                <div className="flex space-x-4">
                  <Button type="button" label="Login" ariaLabel="Login" to="/auth/login" variant="secondary" />
                  <Button type="button" label="Register" ariaLabel="Register" to="/auth/register" variant="primary" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
