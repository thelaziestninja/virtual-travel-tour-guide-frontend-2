import { Layout } from "antd";
import React, { useState, useEffect } from "react";
import { Destination } from "../utils/types";
import SearchBar from "../components/SearchBar";
import { useDestinations } from "../hooks/useDestinations";
import DestinationModal from "../components/DestinationDetailsModal";

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>An error occurred: {error.message}</div>;
  }

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          borderBottom: "none",
          background: "transparent",
          padding: 0,
        }}
      >
        <SearchBar destinations={destinations || []} onSearch={handleSearch} />
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
