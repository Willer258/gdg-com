import React, { useEffect } from "react";
import { Navigate, Path, Route } from "react-router-dom";
// import { setAuthorization } from "../helpers/api_helper";
import { useDispatch } from "react-redux";

import { useProfile } from "../Components/Hooks/UserHooks";

// import { logoutUser } from "../slices/auth/login/thunk";
import { JSX } from "react/jsx-runtime";

const AuthProtected = (props: { location?: string; children?: any; }) => {
  const dispatch = useDispatch();
  const { userProfile, loading, token } = useProfile();
  
  useEffect(() => {
    if (userProfile && !loading && token) {
      // setAuthorization(token);
    } else if (!userProfile && loading && !token) {
      // dispatch(logoutUser());
    }
  }, [token, userProfile, loading, dispatch]);

  /*
    Navigate protège l'accès aux routes non autorisées via l'URL
  */

  if (!userProfile && loading && !token) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } } as Partial<Path>} />

    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }:any) => {
  return (
    <Route
      {...rest}
      render={(props: JSX.IntrinsicAttributes) => {
        return (<> <Component {...props} /> </>);
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
