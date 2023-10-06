import React, { useState } from "react";
import { AutoComplete, Input } from "antd";
import { Destination } from "../utils/types";

type SearchBarProps = {
  destinations: Destination[];
  onSearch: (value: string) => void;
  value: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  destinations,
  onSearch,
  value,
}) => {
  const [searchOptions, setSearchOptions] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    onSearch(value)
    
    if (value) {
      const newOptions = destinations
        .filter(
          (destination) =>
            destination.name.toLowerCase().includes(value.toLowerCase()) ||
            destination.country.toLowerCase().includes(value.toLowerCase())
        )
        .map((destination) => destination.name);
      setSearchOptions(newOptions);
    } else {
      setSearchOptions([]);
    }
  };

  const onSelect = (value: string) => {
    onSearch(value);
    setSearchOptions([]); // Clear options after selection
  };

  return (
    <AutoComplete
      value={value}
      options={searchOptions.map((option) => ({ value: option }))}
      onSelect={onSelect}
      onSearch={handleSearch}
      style={{ width: 200 }}
    >
      <Input.Search size="large" placeholder="Search" />
    </AutoComplete>
  );
};

export default SearchBar;
