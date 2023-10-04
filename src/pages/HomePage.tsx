import React, { useState } from "react";
import { Destination } from "../utils/types";
import SearchBar from "../components/SearchBar";
import { HomeOutlined } from "@ant-design/icons";
import { useSearchFilter } from "../hooks/useSearchFilter";
import { useDestinations } from "../hooks/useDestinations";
import DestinationCard from "../components/DestinationCard";
import { Button, Layout, Row, Col, Space, Spin } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import DestinationModal from "../components/DestinationDetailsModal";

const { Header, Content } = Layout;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams({ q: "" });

  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  const { data: destinations, error, isLoading } = useDestinations();

  const { query, setQuery, filteredDestinations } = useSearchFilter(
    destinations,
    searchParams.get("q") || ""
  );

  const handleDestinationClick = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  const handleCloseModal = () => {
    setSelectedDestination(null);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    setSearchParams(new URLSearchParams({ q: value }));
  };

  const navigateHome = () => {
    setSearchParams({ q: "" });
    setQuery("");
    navigate("/");
  };

  if (isLoading) {
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

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <Layout style={{ background: "none" }}>
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
        <div style={{ flex: "none" }}>
          <SearchBar
            destinations={destinations || []}
            onSearch={handleSearch}
            value={query || ""}
          />
        </div>
      </Header>
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
            filteredDestinations.map((destination) => (
              <Col key={destination._id} span={6}>
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
        />
      </Content>
    </Layout>
  );
};

export default HomePage;
