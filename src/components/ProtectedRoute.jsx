import React from "react";
import { Navigate } from "react-router-dom";
import ControlPanel from "../pages/ControlPanel/index";

function ProtectedRoute(props) {
  const { isAuthorized, logout, admin } = props;

  return (
    <div>
      {isAuthorized ? (
        <>
          <ControlPanel logout={logout} admin={admin} />

          {/* <Outlet /> */}
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
}

export default ProtectedRoute;
