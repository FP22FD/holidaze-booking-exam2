import { useState } from 'react';
import { PiMagnifyingGlass, PiXBold } from 'react-icons/pi';
import { useSearchVenues } from '../hooks/useSearchVenues';
import { Link } from 'react-router-dom';

export const AutoCompleteSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const { data: filterVenues, error } = useSearchVenues(searchTerm);

  const handleSearchClick = () => {
    setShowResults(true);
  };

  const handleKeyDown = () => {
    setShowResults(true);
  };

  const handleCloseDropdown = () => {
    setSearchTerm('');
    setShowResults(false);
  };

  return (
    <div className="w-full mx-auto p-6 lg:shadow-custom rounded-3xl mt-0">
      <div className="relative w-full mx-auto">
        <div className="relative flex items-center bg-white rounded-full p-2 mx-auto border focus:outline-none focus:ring-2 focus:ring-primary-dark-blue">
          <div className="flex-1 p-2">
            <input
              onChange={(event) => setSearchTerm(event.currentTarget.value)}
              type="text"
              placeholder="Search for Venue"
              value={searchTerm}
              autoComplete="off"
              className="w-full outline-none text-typography-primary-grey"
              id="searchbar"
              aria-label="searchbar"
              onKeyDown={handleKeyDown}
            />
          </div>

          <button
            onClick={handleSearchClick}
            aria-label="Search bar"
            className="bg-pink-gradient rounded-full p-2 ml-2 text-white relative"
          >
            <PiMagnifyingGlass size={20} />
          </button>
        </div>

        {error && <span className="text-status-error-red">{error}</span>}

        {showResults && filterVenues.length > 0 && searchTerm.length > 0 && (
          <ul className="absolute z-10 w-full bg-neutral-white border border-secondary-dark rounded mt-2 max-h-fit overflow-y-auto shadow-custom overscroll-none">
            {filterVenues.map((venue) => (
              <li key={venue.id} className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                <Link to={`/venues/${venue.id}`} className="text-typography-primary-grey">
                  {venue.name}
                </Link>
              </li>
            ))}
            <li className="absolute top-2 right-2 px-4 py-2 text-right">
              <button
                onClick={handleCloseDropdown}
                aria-label="Close search results"
                className="text-body-medium text-neutral-muted hover:text-primary-dark-blue"
              >
                <PiXBold size={20} />
              </button>
            </li>
          </ul>
        )}

        {showResults && searchTerm.length > 0 && filterVenues.length === 0 && (
          <section className="absolute z-10 w-full bg-neutral-white border border-secondary-dark rounded mt-1 max-h-48 shadow-md p-2 text-center">
            <div className="py-2 list-none text-neutral-muted flex flex-col">
              <span className="font-semibold mb-2">Unfortunately, your search returned no results</span>
              <span className="text-body-medium">Please try other search terms</span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
