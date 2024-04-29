import React from "react";
import { Button, Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useAtom } from "jotai";
import { selectedCountryAtom } from "../../../state/homeAtoms";

type SortByProps = {
  countries: string[];
  selectedCountry: string | null;
  onCountrySelect: (country: string) => void;
};

const SortBy: React.FC<SortByProps> = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useAtom(selectedCountryAtom);

  if (!countries || countries.length === 0) {
    return null;
  }

  return (
    <Dropdown
      overlay={
        <Menu onClick={(e) => setSelectedCountry(e.key.toString())}>
          {countries.map((country) => (
            <Menu.Item key={country}>{country}</Menu.Item>
          ))}
        </Menu>
      }
    >
      <Button>
        {selectedCountry ? selectedCountry : "Country"}{" "}
        <DownOutlined
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </Button>
    </Dropdown>
  );
};

export default SortBy;
