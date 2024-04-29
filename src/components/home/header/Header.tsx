import React from "react";
import SortBy from "./SortBy";
import SearchBar from "./SearchBar";
import { Button, Layout, Space } from "antd";
import { Destination } from "../../../types";
import { HomeOutlined } from "@ant-design/icons";

const { Header } = Layout;

type AppHeaderProps = {
  destinations?: Destination[];
  countries?: string[];
  selectedCountry?: string | null;
  onCountrySelect?: (country: string) => void;
  onHomeClick: () => void;
  onSearch?: (value: string) => void;
  query?: string;
};
const AppHeader: React.FC<AppHeaderProps> = ({
  destinations = [],
  countries = [],
  selectedCountry = null,
  onHomeClick,
  onCountrySelect = () => {},
  onSearch,
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
        <Button
          type="primary"
          icon={
            <HomeOutlined
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            />
          }
          onClick={navigateHome}
        />
      </div>
      <div style={{ flex: "none", display: "flex", alignItems: "center" }}>
        <Space size={16}>
          <SortBy
            countries={countries}
            onCountrySelect={onCountrySelect}
            selectedCountry={selectedCountry}
          />
          {onSearch ? ( // Checking specifically for onSearch prop
            <SearchBar destinations={destinations} onSearch={onSearch} />
          ) : null}
        </Space>
      </div>
    </Header>
  );
};

export default AppHeader;
