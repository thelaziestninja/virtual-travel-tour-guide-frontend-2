import { FC, useState, ChangeEvent } from 'react';

type SearchBarProps = {
  onSearch: (query: string) => void;
};

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <input 
        type="text" 
        value={query} 
        onChange={handleInputChange} 
        placeholder="Search by name or country..." 
      />
      <button onClick={handleSearchClick}>Search</button>
    </div>
  );
};

export default SearchBar;