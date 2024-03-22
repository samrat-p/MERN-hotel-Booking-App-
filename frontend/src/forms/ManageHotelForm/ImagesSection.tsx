import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="div">
      <h2 className="text-2xl font-bold mb-3"> Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;
              if (totalLength === 0) {
                return "at least one image should be added";
              }
              if (totalLength > 6) {
                return "You have added too much images cannot be more than 6";
              }
            },
          })}
        />
      </div>
      {errors.imageFiles && (
            <span className="text-red-500 text-bold">
              {errors.imageFiles.message}
            </span>
          )}
    </div>
  );
};
export default ImagesSection;
