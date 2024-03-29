import axios from "axios";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "./UserActions";

//update
export const updateUser = async (user, dispatch) => {
  // console.log(user);
  dispatch(updateUserStart());
  try {
    const res = await axios.put("/users/"+user.id, user, {
      headers: {
        token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
      },
    });
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};