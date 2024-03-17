import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
    const{showToast} = useAppContext();
  const mutation = useMutation(apiClient.signOut, {
    onSuccess: () => {
        showToast({message: "Signed Out!", type:"SUCCESS"})
      //showtoast
    },
    onError: (error:Error) => {
      showToast({message: error.message, type: "ERROR"})
    },
  });
 
  const handelClick = () =>{
    mutation.mutate();
  }
  return (
    <button onClick={handelClick} className="text-blue-600 px-3 font-bold bg-white hover:bg:gray=100">
      Sign Out
    </button>
  );
};
export default SignOutButton;
