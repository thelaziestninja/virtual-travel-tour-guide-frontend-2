import { Layout, Space } from "antd";
import { Destination } from "../types";
import React, { useState } from "react";
import AppHeader from "../components/header/Header";
import { useCountries } from "../hooks/useCountries";
import { useSearchFilter } from "../hooks/useSearchFilter";
import { useDestinations } from "../hooks/useDestinations";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddDestination from "../components/home/addModal/AddDestination";
import DestinationModal from "../components/home/card/DestinationDetailsModal";
import { LoadingSpinner } from "../components/home/LoadingSpinner";
import { DestinationsList } from "../components/home/DestinationList";
import { AddDestinationButton } from "../components/home/AddDestinationButton";

const { Content } = Layout;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams({ q: "" });

  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const [isAddDestinationVisible, setIsAddDestinationVisible] =
    useState<boolean>(false);

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

  const handleDestinationClick = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  const handleCloseModal = () => {
    setSelectedDestination(null);
  };

  const handleOpenAddDestinationModal = () => {
    setIsAddDestinationVisible(true);
  };

  const handleCloseAddDestinationModal = () => {
    setIsAddDestinationVisible(false);
  };

  const handleViewMoreClick = (destination: Destination) => {
    navigate(`/destination/${destination.id}`);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setSearchParams(new URLSearchParams({ q: value }));
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country); // Update selectedCountry state when a country is selected
  };

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
        onCountrySelect={handleCountrySelect}
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
          onDestinationClick={handleDestinationClick}
        />
        <DestinationModal
          destination={selectedDestination}
          open={!!selectedDestination}
          onClose={handleCloseModal}
          bodyStyle={{ overflow: "auto" }}
          onViewMoreClick={handleViewMoreClick}
        />
        <AddDestinationButton onClick={handleOpenAddDestinationModal} />
        <AddDestination
          visible={isAddDestinationVisible}
          onClose={handleCloseAddDestinationModal}
        />
      </Content>
    </Layout>
  );
};

export default HomePage;
