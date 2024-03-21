import { FormProvider, useForm } from "react-hook-form";
import DetalisSection from "./DetalisSection";
import TypeSection from "./TypeSection";

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
  starRating:number;
  childCount: number;
};
const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10">
        <DetalisSection/>
        <TypeSection/>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
