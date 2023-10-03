import { Button, Layout } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Destination } from "../utils/types";
import SearchBar from "../components/SearchBar";
import { useDestinations } from "../hooks/useDestinations";
import DestinationModal from "../components/DestinationDetailsModal";
import { HomeOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

const HomePage: React.FC = () => {
  const { data: destinations, error, isLoading } = useDestinations();

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
    setFilteredDestinations(destinations || []);
    navigate('/');
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
          />
        </div>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <h2>Destinations</h2>
        <ul>
          {filteredDestinations &&
            filteredDestinations.map((destination) => (
              <li key={destination._id}>
                {destination.image_url && destination.image_url.length > 0 ? (
                  <img
                    src={destination.image_url[0]}
                    alt={destination.name}
                    style={{ width: "300px", height: "250px" }}
                    onClick={() => handleDestinationClick(destination)}
                  />
                ) : (
                  <h3 onClick={() => handleDestinationClick(destination)}>
                    {destination.name}
                  </h3>
                )}
              </li>
            ))}
        </ul>
        <DestinationModal
          destination={selectedDestination}
          open={!!selectedDestination}
          onClose={handleCloseModal}
        />
      </Content>
    </Layout>
  );
};

export default HomePage;
