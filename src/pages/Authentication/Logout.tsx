import PropTypes from "prop-types";
import  { useEffect } from "react";
import { Navigate } from "react-router-dom";

// import { logoutUser } from "../../slices/thunks";

//redux
import {  useDispatch } from "react-redux";

import withRouter from "../../Components/Common/withRouter";

const Logout = () => {
  const dispatch = useDispatch();

  // const { isUserLogout } = useSelector((state) => ({
  //   isUserLogout: state.Login.isUserLogout,
  // }));

const isUserLogout = false
  useEffect(() => {
    // dispatch(logoutUser());
  }, [dispatch]);

  if (isUserLogout) {
    return <Navigate to="/login" />;
  }

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};


export default withRouter(Logout);