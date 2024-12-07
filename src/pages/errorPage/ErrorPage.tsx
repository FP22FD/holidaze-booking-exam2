import { Link } from 'react-router-dom';

export function ErrorPage() {
  return (
    <div>
      <h1 className="text-heading-2 text-primary-dark-blue text-center">An error has occurred.</h1>
      <Link className="hover:text-typography-primary-grey" to="/">
        Go back to Home
      </Link>
    </div>
  );
}
