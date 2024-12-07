import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center mt-28">
      <h1 className="text-heading-2 text-primary-dark-blue">
        Oops! You seem to be lost.<span className="text-8xl text-status-error-red"></span>
      </h1>
      <Link className="hover:text-typography-primary-grey" to="/">
        Go to home
      </Link>
    </div>
  );
}

export default PageNotFound;
