import React, { useState } from "react";
import { Destination } from "../utils/types";
import AppHeader from "../components/Header";
import { PlusOutlined } from "@ant-design/icons";
import { useCountries } from "../hooks/useCountries";
import AddDestination from "../components/AddDestination";
import { useSearchFilter } from "../hooks/useSearchFilter";
import { useDestinations } from "../hooks/useDestinations";
import DestinationCard from "../components/DestinationCard";
import { Button, Layout, Row, Col, Space, Spin } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import DestinationModal from "../components/DestinationDetailsModal";

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
    navigate(`/destination/${destination._id}`);
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

  if (destinationsLoading || countriesLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

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
        <Row gutter={[16, 16]}>
          {filteredDestinations &&
            filteredDestinations.map((destination, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <DestinationCard
                  destination={destination}
                  onClick={() => handleDestinationClick(destination)}
                />
              </Col>
            ))}
        </Row>
        <DestinationModal
          destination={selectedDestination}
          open={!!selectedDestination}
          onClose={handleCloseModal}
          bodyStyle={{ overflow: "auto" }}
          onViewMoreClick={handleViewMoreClick}
        />
        <Button
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          size="large"
          onClick={handleOpenAddDestinationModal}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 1000,
          }}
        />
        <AddDestination
          visible={isAddDestinationVisible}
          onClose={handleCloseAddDestinationModal}
        />
      </Content>
    </Layout>
  );
};

export default HomePage;
