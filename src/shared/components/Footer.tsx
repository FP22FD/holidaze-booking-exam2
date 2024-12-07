import {
  PiFacebookLogoLight,
  PiHeartStraightFill,
  PiTiktokLogoLight,
  PiTwitterLogoLight,
  PiYoutubeLogoLight,
} from 'react-icons/pi';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer
      className="row-start-3 col-span-12 max-h-[100px} overflow-y-auto mt-20"
      role="contentinfo"
      aria-label="Footer section"
    >
      <div className="bg-primary-dark-blue flex flex-col items-center text-typography-primary-white">
        <nav aria-label="Social media links">
          <div className="flex pt-9 space-x-6">
            <Link
              className="duration-300 ease-in hover:scale-125"
              to="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
            >
              <PiFacebookLogoLight className="w-6 h-6 " aria-hidden="true" />
            </Link>
            <Link
              className="duration-300 ease-in hover:scale-125"
              to="https://www.twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Twitter page"
            >
              <PiTwitterLogoLight className="w-6 h-6 " aria-hidden="true" />
            </Link>
            <Link
              className="duration-300 ease-in hover:scale-125"
              to="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our TikTok page"
            >
              <PiTiktokLogoLight className="w-6 h-6 text-typography-primary-white" aria-hidden="true" />
            </Link>
            <Link
              className="duration-300 ease-in hover:scale-125"
              to="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Youtube page"
            >
              <PiYoutubeLogoLight className="w-6 h-6 text-typography-primary-white" aria-hidden="true" />
            </Link>
          </div>
        </nav>

        <div className="flex flex-col items-center p-4 text-center text-body-small font-medium">
          <p className="mb-1">&copy; 2024 Holidaze Booking. All Rights Reserved</p>
          <p>
            Made with <PiHeartStraightFill className="inline text-status-error-red" aria-label="heart icon" />
            <span className="ml-1">by Fernanda Gomes</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
