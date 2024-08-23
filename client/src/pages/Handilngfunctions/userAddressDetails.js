import { toast } from "react-toastify";
import API_URL from "../../constant/data";

export const getUserAddressDetails = async ({setAddress}) => {
    try {
      const response = await fetch(`${API_URL}/api/getAddress`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setAddress(data);
    } catch (error) {
      console.log("The error is", error)
    }
  }


  export const updateAddressDetails = async (editAddress,{setAddress}) => {
    try {
        const response = await fetch(`${API_URL}/api/updateAddress`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editAddress)
        });
        const data = await response.json();
        if (response.ok) {
          console.log("Address saved or updated in database:", data);
          toast("Address Updated Successfully!")
          getUserAddressDetails({setAddress});
        } else {
          throw new Error("Failed to update address");
        }
      } catch (error) {
        console.log("Error in updating the address", error);
      }
  }