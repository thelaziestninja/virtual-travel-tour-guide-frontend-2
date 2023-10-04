import { Button, Layout, Row, Col, Space, Spin } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Destination } from "../utils/types";
import SearchBar from "../components/SearchBar";
import { useDestinations } from "../hooks/useDestinations";
import DestinationModal from "../components/DestinationDetailsModal";
import { HomeOutlined } from "@ant-design/icons";
import DestinationCard from "../components/DestinationCard";

const { Header, Content } = Layout;

const HomePage: React.FC = () => {
  const { data: destinations, error, isLoading } = useDestinations();

  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const q = searchParams.get("q");

  const [selectedDestination, setSelectedDestination] =
    useState<Destination | null>(null);

  const [filteredDestinations, setFilteredDestinations] = useState<
    Destination[] | null
  >(null);

  const handleDestinationClick = (destination: Destination) => {
    setSelectedDestination(destination);
  };

  const handleCloseModal = () => {
    setSelectedDestination(null);
  };

  const handleSearch = (value: string) => {
    setSearchParams({ q: value });
    if (value) {
      const lowercasedValue = value.toLowerCase();
      const newFilteredDestinations = destinations?.filter((destination) => {
        const nameStartsWithValue = destination.name
          .toLowerCase()
          .startsWith(lowercasedValue);
        const countryStartsWithValue = destination.country
          .toLowerCase()
          .startsWith(lowercasedValue);

        return nameStartsWithValue || countryStartsWithValue;
      });
      setFilteredDestinations(newFilteredDestinations || []);
    } else {
      setFilteredDestinations(destinations || []);
    }
  };

  useEffect(() => {
    setFilteredDestinations(destinations || []);
  }, [destinations]);

  const navigate = useNavigate();

  const navigateHome = () => {
    setSearchParams({ q: "" });
    setFilteredDestinations(destinations || []);
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
            value={q || ""}
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
