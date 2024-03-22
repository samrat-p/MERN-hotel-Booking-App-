import { FormProvider, useForm } from "react-hook-form";
import DetalisSection from "./DetalisSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImageSection from "./ImagesSection";

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
  currency: string[]; //add currency with pricepermonth
};
const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();
  const {handleSubmit} = formMethods;
  const onSubmit = handleSubmit((formData:HotelFormData)=>{
    //create new formdata object & call our api
    console.log(formData);

  })
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <DetalisSection/>
        <TypeSection/>
        <FacilitiesSection/>
        <GuestsSection/>
        <ImageSection/>
        <span className="flex justify-end">
          <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">Save</button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
