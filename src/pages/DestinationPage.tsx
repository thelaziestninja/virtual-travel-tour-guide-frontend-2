// import React, { useState } from "react";
// import AppHeader from '../components/Header';
// import { useDestinationById } from "../hooks/useDestinations";
// import { useNavigate, useParams } from "react-router-dom";
// // import { Destination } from "../utils/types";
// // import { Button, AutoComplete, Input } from "antd";
// // import { HomeOutlined } from "@ant-design/icons";
// // import { useNavigate } from "react-router-dom";
// // import { useFeedbacks } from "../hooks/useFeedbacks";
// // import FeedbackForm from "../components/FeedbackForm";
// // import FeedbackList from "../components/FeedbackList";

// const DestinationPage: React.FC = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const { data: destination, isLoading, error } = useDestinationById(id);

//     const handleHomeClick = () => {
//         navigate('/');
//       };
    
//       const handleSearch = (value: string) => {
//         // Assuming there's a destination name to id mapping function
//         // replace `getDestinationId` with your actual function to get the destination id by name
//         const destinationId = getDestinationId(value);
//         navigate(`/destination/${destinationId}`);
//       };
    
//       if (isLoading) {
//         return <div>Loading...</div>;
//       }
    
//       if (error) {
//         return <div>Error: {error.message}</div>;
//       }
    
//       return (
//         <div>
//           <AppHeader onHomeClick={handleHomeClick} onSearch={handleSearch} query="" />
//           {destination && (
//             <>
//               <h2>{destination.name}</h2>
//               <p>{destination.description}</p>
//               <p>Country: {destination.country}</p>
//               <p>Best time to visit: {destination.best_time_to_visit}</p>
//             </>
//           )}
//           <h3>Feedbacks</h3>
//           {/* Feedbacks rendering will go here */}
//         </div>
//       );
//     };
    
//     export default DestinationPage;
