import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const CertificateAddOrEdit = (props) => {
  const backToProjectNavigate = useNavigate();
  const formRef = useRef(null);
  const id = useParams().id;
  const [certificateBackendItem, setCertificationBackendItem] = useState({
    certificateName: "",
    certificateCode: "",
    certificateYear: "",
    certificateScore: "",
    certificateAward: "",
    certificateProgress: "",
  });

  useEffect(() => {
    async function fetchData() {
      if (id !== "add") {
        const certificateItemSelected = await (
          await fetch(`/certificates/${id}`)
        ).json();
        setCertificationBackendItem(certificateItemSelected);
      }
    }

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCertificationBackendItem((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const remove = async (id) => {
    await fetch(`/certificates/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      backToProjectNavigate(
        "/adminonwarpdriveaheadtomultiverse/dashboard/?tab=certificates"
      );
    });
  };
  const reset = () => {
    setCertificationBackendItem({
      certificateName: "",
      certificateCode: "",
      certificateYear: "",
      certificateScore: "",
      certificateAward: "",
      certificateProgress: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(
      "/certificates" +
        (certificateBackendItem.id ? "/" + certificateBackendItem.id : ""),
      {
        method: certificateBackendItem.id ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(certificateBackendItem),
      }
    ).then(() => {
      backToProjectNavigate(
        "/adminonwarpdriveaheadtomultiverse/dashboard/?tab=certificates"
      );
    });
  };
  return (
    <>
      <div className="w-full my-6 p-6 ">
        <div className="flex mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-4">
              Certificates {" : " + certificateBackendItem.certificateName}
            </h1>
          </div>
          <div className="grow"></div>
          <div className=""></div>
        </div>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col w-full py-4 justify-start items-center text-left text-lg border-y-2 border-slate-500"
        >
          <div className="w-2/3">
            <div className="font-bold p-4">Name</div>
            <div className="p-4">
              <input
                type="text"
                name="certificateName"
                id="certificateName"
                value={certificateBackendItem.certificateName || ""}
                onChange={handleChange}
                className="p-2 w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex">
              <div className="w-1/2">
                <div className="font-bold p-4">Code</div>
                <div className="p-4">
                  <input
                    type="text"
                    name="certificateCode"
                    id="certificateCode"
                    value={certificateBackendItem.certificateCode || ""}
                    onChange={handleChange}
                    className="p-2 w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="font-bold p-4">Progress</div>
                <div className="p-4">
                  <input
                    type="number"
                    name="certificateProgress"
                    id="certificateProgress"
                    min="0"
                    max="100"
                    value={certificateBackendItem.certificateProgress || 0}
                    onChange={handleChange}
                    className="p-2 w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex">
              <div className="w-1/2">
                <div className="font-bold p-4">Score</div>
                <div className="p-4">
                  <input
                    type="text"
                    name="certificateScore"
                    id="certificateScore"
                    value={certificateBackendItem.certificateScore || 0}
                    onChange={handleChange}
                    className="p-2 w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="font-bold p-4">Year</div>
                <div className="p-4">
                  <input
                    type="text"
                    name="certificateYear"
                    id="certificateYear"
                    value={certificateBackendItem.certificateYear || 0}
                    onChange={handleChange}
                    className="p-2 w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="font-bold p-4">The Award</div>
            <div className="p-4">
              <textarea
                id="certificateAward"
                name="certificateAward"
                value={certificateBackendItem.certificateAward || ""}
                onChange={handleChange}
                rows="4"
                className="p-2 w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end p-4 font-bold space-x-6">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  reset();
                }}
                className="p-6 bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                CLEAR
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  remove(certificateBackendItem.id);
                }}
                className="p-6 bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                DEL
              </button>
              <button
                tag={Link}
                to="/adminonwarpdriveaheadtomultiverse/dashboard/?tab=certificates"
                onClick={(e) => {
                  e.preventDefault();
                  backToProjectNavigate(
                    "/adminonwarpdriveaheadtomultiverse/dashboard/?tab=certificates"
                  );
                }}
                className="p-6 bg-slate-600 text-white font-semibold hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-600"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="p-6 bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                SAVE
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default CertificateAddOrEdit;
