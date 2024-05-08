import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";

const Booking = () => {
  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrrentUser
  );
  //console.log(currentUser?.email)
  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <div className="bg-green-200">Booking Detalis Summary</div>
      {currentUser && <BookingForm currentUser={currentUser} />} 
    </div>
  );
}; //currentUser && means it will only display if we have a currentUser
export default Booking;
