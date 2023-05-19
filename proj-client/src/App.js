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
import Logo from "../src/components/Logo";
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
  const [browser, setBrowser] = useState("");

  const handleLogin = (dataLogin) => {
    setLoginStatus(dataLogin);
  };

  useEffect(() => {
    const userAgent = navigator.userAgent;
    let browserName;

    if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
      browserName = "Opera";
      setBrowser("OP");
    } else if (userAgent.indexOf("Edg") > -1) {
      browserName = "Microsoft Edge";
      setBrowser("ED");
    } else if (userAgent.indexOf("Chrome") > -1) {
      browserName = "Google Chrome";
      setBrowser("CH");
    } else if (userAgent.indexOf("Safari") > -1) {
      browserName = "Apple Safari";
      setBrowser("SA");
    } else if (userAgent.indexOf("Firefox") > -1) {
      browserName = "Mozilla Firefox";
      setBrowser("FF");
    } else if (
      userAgent.indexOf("MSIE") > -1 ||
      userAgent.indexOf("Trident/") > -1
    ) {
      browserName = "Microsoft Internet Explorer";
      setBrowser("IE");
    } else {
      browserName = "unknown";
      setBrowser("UN");
    }

    function handleResize() {
      setIsMobile(window.innerWidth < 320);
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Router>
      {browser === "SA" ? (
        <div className="flex flex-col min-w-full w-full min-h-screen h-full  px-10 text-lg text-slate-200 bg-whiteB">
          <div className="top-0 w-3/12 sz:w-full sx:w-11/12 smr:w-7/12 sm:w-4/12 md:w-4/12 mdh:w-5/12 lg:w-4/12 lgh:w-5w/12 xl:w-3/12 2xl:w-3/12">
            <Logo />
          </div>
          <div className="w-fit self-end flex flex-col justify-end items-end text-2xl sz:text-xl sx:text-1.5xl smr:text-xl sm:text-xl md:text-2xl mdh:text-4xl lg:text-2xl lgh:text-4xl xl:text-3xl 2xl:text-3xl mt-10 sz:mt-10 sx:mt-10 smr:mt-8 sm:mt-6 md:mt-8 lg:mt-8 xl:mt-8 2xl:mt-10 text-right text-darkGB">
            <div>
              The Safari and Webkit version is coming soon.
              <br />
              <span>:D</span>
            </div>
            <div className="w-fit mt-2 text-right text-3xl sz:text-2xl sx:text-2xl smr:text-2xl sm:text-2xl md:text-3xl mdh:text-5xl lg:text-3xl lgh:text-5xl xl:text-4xl 2xl:text-4xl text-red-600 bg-mustard p-2">
              use another browser
            </div>
            <br />
          </div>
        </div>
      ) : (
        <>
          {isMobile ? (
            <div className="flex flex-col min-w-full w-full min-h-screen h-full  px-10 text-lg text-slate-200 bg-whiteB">
              <div className="top-0 w-3/12 sz:w-full sx:w-11/12 smr:w-7/12 sm:w-4/12 md:w-4/12 mdh:w-5/12 lg:w-4/12 lgh:w-5w/12 xl:w-3/12 2xl:w-3/12">
                <Logo />
              </div>
              <div className="w-fit self-end flex flex-col justify-end items-end text-2xl sz:text-xl sx:text-1.5xl smr:text-xl sm:text-xl md:text-2xl mdh:text-4xl lg:text-2xl lgh:text-4xl xl:text-3xl 2xl:text-3xl mt-10 sz:mt-10 sx:mt-10 smr:mt-8 sm:mt-6 md:mt-8 lg:mt-8 xl:mt-8 2xl:mt-10 text-right text-darkGB">
                <div>
                  The web is optimized for larger devices for the best
                  experience.
                  <br />
                  <span>:D</span>
                </div>
                <div className="w-fit mt-2 text-right text-3xl sz:text-2xl sx:text-2xl smr:text-2xl sm:text-2xl md:text-3xl mdh:text-5xl lg:text-3xl lgh:text-5xl xl:text-4xl 2xl:text-4xl text-red-600 bg-mustard p-2">
                  use a larger device
                </div>
                <br />
              </div>
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
        </>
      )}
    </Router>
  );
};

export default App;
