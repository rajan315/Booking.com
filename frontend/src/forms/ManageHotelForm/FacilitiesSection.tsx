import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();

  // Ensure to handle `watch` result properly
  const facilityWatch = watch("facilities") || [];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {hotelFacilities.map((facility) => (
          <label 
            key={facility}
            className={
                facilityWatch.includes(facility) ? "cursor-pointer bg-blue-400 text-sm px-4 py-2 font-semibold"
                : "cursor-pointer bg-gray-300 text-sm px-4 py-2 font-semibold"
            }
          >
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
              className="hidden"
            />
            {facility}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-sm font-bold">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
