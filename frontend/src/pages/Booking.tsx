import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Booking = () => {
  const search = useSearchContext();
  const { hotelId } = useParams();
  const [numberOfNights, setNumberOfNights] = useState<number>(0)
  const { data: hotel } = useQuery(
    "fetchHotelByID",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

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
