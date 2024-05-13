import { useForm } from "react-hook-form";
import {
  UserType,
  paymentIntentResponse,
} from "../../../../backend/src/shared/types";
import { CardElement } from "@stripe/react-stripe-js";

type Props = {
  currentUser: UserType;
  paymentIntent: paymentIntentResponse;
};

type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const { handleSubmit, register } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
    },
  });

  return (
    <form className="grid grid-cols-1 gap-5 px-5 py-5 border rounded border-slate-300">
      <span className="text-3xl font-bold">Confirmed Your Detalis</span>
      <div className="grid grid-cols-2 gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal"
            type="text"
            readOnly
            disabled
            {...register("lastName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Email
          <input
            className="mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal "
            type="text"
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>
        <div className="bg-blue-200 rounded-md p-4">
          <div className="font-semibold text-lg">
            Total Cost: ${paymentIntent.totalCost.toFixed(2)}
          </div>
          <div className="text-xs font-semibold">
            Included taxes and charges
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">Payment Detalis</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        ></CardElement>
      </div>
    </form>
  );
};

export default BookingForm;
