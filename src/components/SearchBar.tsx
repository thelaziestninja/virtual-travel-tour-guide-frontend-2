import React, { useState } from "react";
import { AutoComplete, Input } from "antd";
import { Destination } from "../utils/types";
import { useNavigate } from "react-router-dom";

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

  const navigateToDestination = useNavigate();
  const [searchOptions, setSearchOptions] = useState<string[]>([]);
  

  const handleSearch = (value: string) => {
    onSearch(value)
    console.log('Handling search with value:', value);

    if (value) {
        const newOptions = destinations
        .filter(
          (destination) =>
            destination.name.toLowerCase().includes(value.toLowerCase()) ||
            destination.country.toLowerCase().includes(value.toLowerCase())
        )
        .map((destination) => destination.name);
      setSearchOptions(newOptions);

      console.log('searchOptions after update:', searchOptions);

    } else {
      setSearchOptions([]);
    }
  };

  const onSelect = (value: string) => { 
    const selectedDestination = destinations.find(
        destination => destination.name.toLowerCase() === value.toLowerCase()
    );
    if (selectedDestination) {
        navigateToDestination(`/destination/${selectedDestination._id}`);
    }
    setSearchOptions([]);  
};

  return (
    <AutoComplete
      value={value}
      options={searchOptions.map((option) => ({ value: option }))}
      onSelect={onSelect}
      onSearch={handleSearch}
      style={{ width: 200 }}
      filterOption={(inputValue, option) =>
        option ? option.value.toLowerCase().startsWith(inputValue.toLowerCase()) : false
      }
    >
      <Input placeholder="Search" />
    </AutoComplete>
  );
};

export default SearchBar;