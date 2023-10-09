import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";

type SortByProps = {
  countries: string[];
  onCountrySelect: (country: string) => void;
};

const SortBy: React.FC<SortByProps> = ({ countries, onCountrySelect }) => {
  return (
    <Dropdown
      overlay={
        <Menu onClick={(e) => onCountrySelect(e.key.toString())}>
          {countries.map((country) => (
            <Menu.Item key={country}>{country}</Menu.Item>
          ))}
        </Menu>
      }
    >
      <Button>
        Country <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default SortBy;