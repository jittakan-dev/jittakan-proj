import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const CertificateDashboard = (props) => {
  const navigate = useNavigate();
  const [certificateBackend, setCertificationBackend] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCertifications = useCallback(async () => {
    try {
      const response = await fetch("/certificates", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setCertificationBackend(data);
    } catch (error) {
      console.error("Error fetching certificates:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCertifications();
  }, [fetchCertifications]);

  const remove = async (id) => {
    await fetch(`/certificates/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      const updatedcertificateBackend = [...certificateBackend].filter(
        (i) => i.id !== id
      );
      setCertificationBackend(updatedcertificateBackend);
      navigate(
        "/adminonwarpdriveaheadtomultiverse/dashboard/?tab=certificates"
      );
    });
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="flex mb-6">
        <div className="grow"></div>
        <div className="bg-green-500 p-4 text-lg">
          <button
            onClick={() =>
              navigate(
                "/adminonwarpdriveaheadtomultiverse/dashboard/certificates/add"
              )
            }
          >
            Add Certification
          </button>
        </div>
      </div>
      <div className="grid grid-cols-11 gap-y-4 py-4 text-center text-lg auto-cols-auto border-y-2 border-slate-500">
        <div className="font-bold col-span-1 p-4">No</div>
        <div className="font-bold col-span-2 p-4">Name</div>
        <div className="font-bold col-span-1 p-4">Code</div>
        <div className="font-bold col-span-1 p-4">Year</div>
        <div className="font-bold col-span-1 p-4">Score</div>
        <div className="font-bold col-span-2 p-4"> Award</div>
        <div className="font-bold col-span-1 p-4"> Progress</div>
        <div className="font-bold col-span-2 p-4">Actions</div>
        {certificateBackend.map((certificate, index) => (
          <React.Fragment key={index}>
            <div className="col-span-1 font-bold p-4 bg-slate-200">
              {certificate.id}
            </div>
            <div
              className={`col-span-2 p-4 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } truncate`}
            >
              {certificate.certificateName}
            </div>
            <div
              className={`col-span-1 p-4 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } truncate`}
            >
              {certificate.certificateCode}
            </div>
            <div
              className={`col-span-1 p-4 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } truncate`}
            >
              {certificate.certificateYear}
            </div>
            <div
              className={`col-span-1 p-4 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } truncate`}
            >
              {certificate.certificateScore}
            </div>
            <div
              className={`col-span-2 p-4 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } truncate`}
            >
              {certificate.certificateAward}
            </div>
            <div
              className={`col-span-1 p-4 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } truncate`}
            >
              {certificate.certificateProgress}
            </div>
            <div
              className={`col-span-2 p-4 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              }  truncate flex flex-row justify-center items-center space-x-6`}
            >
              <button
                tag={Link}
                to={"/certificates/" + certificate.id}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(
                    "/adminonwarpdriveaheadtomultiverse/dashboard/certificates/" +
                      certificate.id
                  );
                }}
                className="bg-slate-500 p-2"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  remove(certificate.id);
                }}
                className="bg-red-600 p-2"
              >
                DEL
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default CertificateDashboard;
