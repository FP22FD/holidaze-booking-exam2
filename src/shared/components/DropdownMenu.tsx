import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { PiExportLight, PiHouseLineLight, PiLayoutLight, PiUserRectangleLight, PiXLight } from 'react-icons/pi';
import { usePersistContext } from '../../store/usePersistContext';

export function DropdownMenu() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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
    <div className="relative">
      <div
        className="w-8 h-8 rounded-full overflow-hidden cursor-pointer"
        onClick={() => setIsDropdownOpen((prev) => !prev)}
      >
        <img src={avatar?.url} alt="Profile Avatar" className="w-full h-full object-cover" />
      </div>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-6 w-48 bg-neutral-white border border-neutral-default rounded-lg shadow-custom">
          <div className="p-6 flex justify-end">
            <button
              aria-label="Close menu"
              onClick={() => setIsDropdownOpen(false)}
              className="focus:outline-none bg-pink-gradient rounded p-1"
            >
              <PiXLight className="w-6 h-6 text-typography-primary-white" aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-center px-6 space-x-2 mb-6">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={avatar?.url} alt="Profile Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col text-md">
              <span className="font-semibold text-primary-dark-blue text-body-medium">{name}</span>
              <span className="text-typography-primary-grey text-body-small">{userType}</span>
            </div>
          </div>

          <div className="flex flex-col px-2 space-y-4 mb-6">
            <div className="border-t border-neutral-default mb-4"></div>

            {pageLinks.map(({ label, to, icon }) => (
              <NavLink
                key={label}
                to={to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 p-3 py-2 rounded-lg pl-5 overflow-hidden relative text-primary-dark-blue hover:bg-accent-pinkLight   ${
                    isActive ? 'bg-accent-pinkLight text-status-error-red' : 'bg-transparent'
                  }`
                }
                aria-label={`Go to ${label}`}
                onClick={() => setIsDropdownOpen(false)}
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
                setIsDropdownOpen(false);
              }}
              className="flex items-center space-x-4 p-3 py-2 rounded-lg pl-5 text-primary-dark-blue hover:bg-accent-pinkLight"
              aria-label="Log out"
            >
              <PiExportLight className="w-5 h-5 rotate-[-90deg]" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
