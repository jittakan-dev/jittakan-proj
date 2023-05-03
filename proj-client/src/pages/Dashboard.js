import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import CertificateDashboard from "../dashboard-components/CertificateDashboard";
import ProjectDashboard from "../dashboard-components/ProjectDashboard";

const Dashboard = (props) => {
  const [dashboardTabButton, setDashboardTabButton] = useState(1);
  const location = useLocation();
  const selectedTab = new URLSearchParams(location.search).get("tab");

  let content;
  switch (selectedTab) {
    case "projects":
      content = <ProjectDashboard />;
      break;
    case "certificates":
      content = <CertificateDashboard />;
      break;
    default:
      content = <ProjectDashboard />;
      break;
  }
  const selectedTabIndex = selectedTab === "certificates" ? 2 : 1;

  useEffect(() => {
    setDashboardTabButton(selectedTabIndex);
  }, [selectedTabIndex]);

  return (
    <>
      <div className="w-full p-6 font-bold text-3xl border-b-2 border-slate-500">
        <Link to="/" className={`cursor-pointer`}>
          Home
        </Link>
      </div>
      <div className="w-full p-6">
        <div className="flex font-bold text-2xl">
          <Link
            to="/adminonwarpdriveaheadtomultiverse/dashboard/?tab=projects"
            className={`cursor-pointer border-red-600 ${
              dashboardTabButton === 1 ? "border-b-8" : ""
            }`}
          >
            Projects
          </Link>
          <span className="px-6">I</span>
          <Link
            to="/adminonwarpdriveaheadtomultiverse/dashboard/?tab=certificates"
            className={`cursor-pointer border-red-600 ${
              dashboardTabButton === 2 ? "border-b-8" : ""
            }`}
          >
            Certifications
          </Link>
        </div>
        <div className="grow"></div>
      </div>
      <div className="w-full mb-6 p-6">{content}</div>
    </>
  );
};

export default Dashboard;
