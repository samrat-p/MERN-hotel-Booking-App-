import { useForm } from "react-hook-form";
import {useMutation, useQueryClient} from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmpassword: string;
}; 

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {showToast} = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>(); // uses react register,watch nd form0-submit using react-hooks, the fromstate takes an object "errors" which will handel all the errors while validate and submitting the form


const mutation = useMutation(apiClient.register, {
  onSuccess : async () => {
    showToast({message: "Registration Sucess!", type: "SUCCESS"})
    await queryClient.invalidateQueries("validateToken")
    navigate("/")
  },
  onError : (error: Error)=>{
    showToast({message: error.message, type: "ERROR"})
  }
})

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  
  // this function handels the submitfrom nd return if theres any error when submitting a form
  
  
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font bold"> Create an Account</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 text-sm font-bold flex-1">
          First Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("firstName", { required: "This field is required" })}
          ></input>
          {errors.firstName && ( //we are checking the firstname errors object, if this is true we will print out the error message in red, && that means if the left is true then execute
            <span className="text-red-500 text-bold">
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name
          <input
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("lastName", { required: "This field is required" })}
          ></input>
          {errors.lastName && ( //we are checking the lastname errors object, if this is true we will print out the error message in red, && that means if the left is true then execute
            <span className="text-red-500 text-bold">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Email
        <input
          type="email"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("email", { required: "This field is required" })}
        ></input>
        {errors.email && ( //we are checking the email fields errors object, if this is true we will print out the error message in red, && that means if the left is true then execute
          <span className="text-red-500 text-bold">{errors.email.message}</span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "The password must be more than 6 characters",
            },
          })}
        ></input>
        {errors.password && ( //we are checking the password fields errors object, if this is true we will print out the error message in red, && that means if the left is true then execute
          <span className="text-red-500 text-bold">
            {errors.password.message}
          </span>
        )}
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("confirmpassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your password do not match";
              }
            },
          })}
        ></input>
        {errors.confirmpassword && ( //we are checking the currentpassword errors object, if this is true we will print out the error message in red, && that means if the left is true then execute
          <span className="text-red-500 text-bold">
            {errors.confirmpassword.message}
          </span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 flex items-center space-x-2"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
