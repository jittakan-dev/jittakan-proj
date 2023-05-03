import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import ProjectAddOrEdit from "./pages/ProjectAddOrEdit";
import CertificateAddOrEdit from "./pages/CertificateAddOrEdit";
import DashboardLogin from "./pages/DashboardLogin";
const Home = React.lazy(() => import("./pages/Home"));

const PRIVATE_ROUTES = [
  {
    path: "/adminonwarpdriveaheadtomultiverse/dashboard",
    component: <Dashboard />,
  },
  {
    path: "/adminonwarpdriveaheadtomultiverse/dashboard/projects/:id",
    component: <ProjectAddOrEdit />,
  },
  {
    path: "/adminonwarpdriveaheadtomultiverse/dashboard/certificates/:id",
    component: <CertificateAddOrEdit />,
  },
];

const App = () => {
  const [loginStatus, setLoginStatus] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const handleLogin = (dataLogin) => {
    setLoginStatus(dataLogin);
  };

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 319);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Router>
      {isMobile ? (
        <div className="flex flex-col min-w-full w-full min-h-screen h-full p-10 justify-center items-center text-lg bg-whiteDG">
          <p className="border-8 border-darkLGB p-6">
            The web is optimized for larger devices. Please use a larger device
            for the best experience.
          </p>
        </div>
      ) : (
        <Routes>
          <Route
            exact
            path="/"
            element={
              <React.Suspense fallback={<>...</>}>
                <Home />
              </React.Suspense>
            }
          />
          <Route
            path="/adminonwarpdriveaheadtomultiverse"
            element={<DashboardLogin onLogin={handleLogin} />}
          />
          <Route
            path="*"
            element={
              loginStatus ? (
                <Navigate to="/adminonwarpdriveaheadtomultiverse/dashboard" />
              ) : (
                <Navigate to="/adminonwarpdriveaheadtomultiverse" />
              )
            }
          />
          {PRIVATE_ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                loginStatus ? (
                  route.component
                ) : (
                  <Navigate to="/adminonwarpdriveaheadtomultiverse" />
                )
              }
            />
          ))}
        </Routes>
      )}
    </Router>
  );
};

export default App;
