import {  useState } from "react";
// import { getLoggedinUser } from "../../helpers/api_helper";

const useProfile = () => {
  // const userProfileSession = getLoggedinUser();
  const token = null
  // userProfileSession &&
  // userProfileSession["token"];
  const [loading] = useState(true);
  const [userProfile] = useState(
    // userProfileSession ? userProfileSession : null
  );

  // useEffect(() => {
  //   const userProfileSession = getLoggedinUser();
  //   const token =
  //     userProfileSession &&
  //     userProfileSession["token"];
  //   setUserProfile(userProfileSession ? userProfileSession : null);
  //   setLoading(token ? false : true);
  // }, []);


  return { userProfile, loading,token };
};

export { useProfile };