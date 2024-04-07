import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { data: hotel } = useQuery(
    "fetchMyHotelById", 
    () => apiClient.fetchMyHotelById(hotelId || ""),
      {
        enabled: !!hotelId, //execute only when has a valid hotelid, !! defines as check for a trophy value
      }
  );
  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: "hotel Saved", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "error saving hotel", type: "ERROR" });
    },
  });

  const handelSave = (hotelFormData: FormData) => {
    mutate(hotelFormData); //functuon for handelsave button
  };
  
  return (
    <ManageHotelForm hotel={hotel} onSave={handelSave} isLoading={isLoading} />
  );
};
export default EditHotel;
