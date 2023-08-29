import React, { useState, useEffect, useContext } from "react";
import { useFirebase } from "./hooks/useFirebase";
import { BrowserRouter as Router } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const { auth } = useFirebase();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(!!user);
      setIsCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <Router>{authenticated ? <PrivateRoutes /> : <PublicRoutes />}</Router>
  );
}

export default App;
