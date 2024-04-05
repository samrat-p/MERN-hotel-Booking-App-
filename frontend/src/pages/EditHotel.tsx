import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { data: hotel } = useQuery("fetchMyHotelById", () => {
    apiClient.fetchMyHotelById(hotelId || ''),
      {
        enabled: !!hotelId, //execute only when has a valid hotelid, !! defines as check for a trophy value
      }
  });
  const {mutate, isLoading} = useMutation(apiClient.updateMyHotelById, {
    onSuccess: ()=>{},
    onError : ()=>{}
  })

  const handelSave = (hotelFormData: FormData) => {
    mutate(hotelFormData) //functuon for handelsave button
  }
  return <ManageHotelForm hotel = {hotel} onSave={handelSave} isLoading={isLoading}/>
};
 export default EditHotel;