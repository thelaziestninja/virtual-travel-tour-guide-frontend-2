import { useAtom } from "jotai";
import React, { useState } from "react";
import { AutoComplete, Input } from "antd";
import { Destination } from "../../../types";
import { useNavigate } from "react-router-dom";
import { searchTextAtom } from "../../../state/uiAtoms";

type SearchBarProps = {
  destinations: Destination[];
  onSearch: (value: string) => void;
  // value: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  destinations,
  onSearch,
  // value,
}) => {
  const [searchOptions, setSearchOptions] = useState<{ value: string }[]>([]);
  const [searchText, setSearchText] = useAtom(searchTextAtom);
  const navigateToDestination = useNavigate();

  const handleSearch = (value: string) => {
    onSearch(value); // This should update the application's state and URL params
    setSearchText(value); // Update the local state for the search text
    const filteredOptions = destinations
      .filter((dest) => dest.name.toLowerCase().includes(value.toLowerCase()))
      .map((dest) => ({ value: dest.name }));
    setSearchOptions(filteredOptions);
  };

  const onSelect = (value: string) => {
    const selectedDestination = destinations.find(
      (destination) => destination.name.toLowerCase() === value.toLowerCase()
    );
    if (selectedDestination) {
      console.log("Navigating to:", `/destination/${selectedDestination.id}`);
      navigateToDestination(`/destination/${selectedDestination.id}`);
    }
    setSearchOptions([]);
  };

  return (
    <AutoComplete
      value={searchText}
      options={searchOptions}
      onSelect={onSelect}
      onSearch={handleSearch}
      style={{ width: 200 }}
      filterOption={(inputValue, option: { value: string } | undefined) =>
        option
          ? option.value.toLowerCase().includes(inputValue.toLowerCase())
          : false
      }
    >
      <Input placeholder="Search destination" />
    </AutoComplete>
  );
};

export default SearchBar;
