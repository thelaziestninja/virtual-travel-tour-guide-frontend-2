import React from "react";
import { Button, Layout, Space } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import SearchBar from "./SearchBar";
import { Destination } from "../utils/types";
import SortBy from "./SortBy";

const { Header } = Layout;

type AppHeaderProps = {
  destinations: Destination[];
  countries: string[];
  onCountrySelect: (country: string) => void;
  onHomeClick: () => void;
  onSearch: (value: string) => void;
  query: string;
};

const AppHeader: React.FC<AppHeaderProps> = ({
  destinations,
  countries,
  onHomeClick,
  onCountrySelect,
  onSearch,
  query,
}) => {
  const navigateHome = () => {
    onHomeClick();
  };

  return (
    <Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "none",
        background: "transparent",
        padding: "0 50px",
      }}
    >
      <div style={{ flex: "none" }}>
        <Button type="primary" icon={<HomeOutlined />} onClick={navigateHome}>
          Home
        </Button>
      </div>
      <div style={{ flex: "none", display: "flex", alignItems: "center" }}>
        <Space size={16}>
          <SortBy countries={countries} onCountrySelect={onCountrySelect} />
          <SearchBar
            destinations={destinations}
            onSearch={onSearch}
            value={query}
          />
        </Space>
      </div>
    </Header>
  );
};

export default AppHeader;
