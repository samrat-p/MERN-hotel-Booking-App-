import { FormProvider, useForm } from "react-hook-form";
import DetalisSection from "./DetalisSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  facilities: string[];
  imageFiles: FileList; //filelist rathar than array of strings
  adultCount: number;
  childCount: number;
};
const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();
  return (
    <FormProvider {...formMethods}>
      <form>
        <DetalisSection/>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
