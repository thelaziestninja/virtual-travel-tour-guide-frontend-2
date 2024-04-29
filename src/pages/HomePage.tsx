import {
  selectedCountryAtom,
  selectedDestinationAtom,
  destinationFormVisibleAtom,
} from "../state/homeAtoms";
import { useAtom } from "jotai";
import { Layout, Space } from "antd";
import { Destination } from "../types";
import React, { useEffect } from "react";
import { useCountries } from "../hooks/useCountries";
import AppHeader from "../components/home/header/Header";
import { useDestinations } from "../hooks/useDestinations";
import { useSearchFilter } from "../hooks/useSearchFilter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LoadingSpinner } from "../components/home/LoadingSpinner";
import { DestinationsList } from "../components/home/DestinationList";
import AddDestination from "../components/home/addModal/AddDestination";
import { AddDestinationButton } from "../components/home/AddDestinationButton";
import DestinationModal from "../components/home/card/DestinationDetailsModal";

const { Content } = Layout;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });

  const [selectedDestination, setSelectedDestination] = useAtom(
    selectedDestinationAtom
  );
  const [selectedCountry, setSelectedCountry] = useAtom(selectedCountryAtom);

  const [isAddDestinationVisible, setIsAddDestinationVisible] = useAtom(
    destinationFormVisibleAtom
  );

  const {
    data: destinations,
    error: destinationsError,
    isLoading: destinationsLoading,
  } = useDestinations();

  const {
    data: countries,
    error: countriesError,
    isLoading: countriesLoading,
  } = useCountries();

  const { query, setQuery, filteredDestinations } = useSearchFilter(
    destinations,
    searchParams.get("q") || "",
    selectedCountry
  );

  const handleViewMoreClick = (destination: Destination) => {
    navigate(`/destination/${destination.id}`);
  };

  const handleSearch = (value: string) => {
    console.log("Before setting query:", value);
    setQuery(value);
    console.log("Set Search value:", value);
    setSearchParams(new URLSearchParams({ q: value }));
    console.log(" Set Search params:", searchParams);
  };

  useEffect(() => {
    if (selectedCountry) {
      console.log("selectedCountry", selectedCountry);
    }
  }, [selectedCountry]);

  const navigateHome = () => {
    setSelectedCountry(null);
    setSearchParams({ q: "" });
    setQuery("");
    navigate("/");
  };

  if (destinationsLoading || countriesLoading) return <LoadingSpinner />;

  if (destinationsError || countriesError) {
    return (
      <div>
        An error occurred:{" "}
        {destinationsError?.message || countriesError?.message}
      </div>
    );
  }

  return (
    <Layout style={{ background: "none" }}>
      <AppHeader
        countries={countries || []}
        destinations={destinations || []}
        selectedCountry={selectedCountry}
        onCountrySelect={(country: string) => setSelectedCountry(country)}
        onHomeClick={navigateHome}
        onSearch={handleSearch}
        query={query}
      />
      <Content style={{ padding: "0 150px" }}>
        <Space
          direction="vertical"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100px",
          }}
        >
          <h2>Destinations</h2>
        </Space>
        <DestinationsList
          destinations={filteredDestinations || []}
          onDestinationClick={setSelectedDestination}
        />
        <DestinationModal
          destination={selectedDestination}
          open={!!selectedDestination}
          onClose={() => setSelectedDestination(null)}
          bodyStyle={{ overflow: "auto" }}
          onViewMoreClick={handleViewMoreClick}
        />
        <AddDestinationButton
          onClick={() => setIsAddDestinationVisible(true)}
        />
        <AddDestination
          visible={isAddDestinationVisible}
          onClose={() => setIsAddDestinationVisible(false)}
        />
      </Content>
    </Layout>
  );
};

export default HomePage;
