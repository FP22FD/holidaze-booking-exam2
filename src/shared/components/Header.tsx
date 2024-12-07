import { useState } from 'react';
import { MenuDesktop } from './MenuDesktop';
import { MenuMobile } from './MenuMobile';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="row-start-1 col-span-12 fixed bg-neutral-white w-full z-40">
      <nav className="flex p-5 border-b border-secondary w-full" aria-label="Main navigation">
        <div className="hidden md:block w-full">
          <MenuDesktop />
        </div>

        <div className="md:hidden w-full">
          <MenuMobile isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
