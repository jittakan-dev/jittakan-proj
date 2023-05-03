import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ProjectAddOrEdit = (props) => {
  const backToProjectNavigate = useNavigate();
  const formRef = useRef(null);
  const id = useParams().id;
  const [projectBackendItem, setProjectBackendItem] = useState({
    projectName: "",
    problemDetail: "",
    problemImageUrl: "",
    operationDetail: "",
    buildDetail: "",
    buildImageUrl: "",
    challengeDetail: "",
    link: "",
    projectProgress: "",
  });

  useEffect(() => {
    async function fetchData() {
      if (id !== "add") {
        const projectItemSelected = await (
          await fetch(`/projects/${id}`)
        ).json();
        setProjectBackendItem(projectItemSelected);
      }
    }

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProjectBackendItem((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  const remove = async (id) => {
    await fetch(`/projects/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      backToProjectNavigate(
        "/adminonwarpdriveaheadtomultiverse/dashboard/?tab=projects"
      );
    });
  };
  const reset = () => {
    setProjectBackendItem({
      projectName: "",
      problemDetail: "",
      problemImageUrl: "",
      operationDetail: "",
      buildDetail: "",
      buildImageUrl: "",
      challengeDetail: "",
      link: "",
      projectProgress: "",
    });
  };
  const handleSubmit = async (e) => {
    console.log(projectBackendItem);
    e.preventDefault();
    await fetch(
      "/projects" + (projectBackendItem.id ? "/" + projectBackendItem.id : ""),
      {
        method: projectBackendItem.id ? "PUT" : "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectBackendItem),
      }
    ).then(() => {
      backToProjectNavigate(
        "/adminonwarpdriveaheadtomultiverse/dashboard/?tab=projects"
      );
    });
  };
  return (
    <div className="w-full my-6 p-6 ">
      <div className="flex mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-4">
            Projects {" : " + projectBackendItem.projectName}
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
              name="projectName"
              id="projectName"
              value={projectBackendItem.projectName || ""}
              onChange={handleChange}
              className="p-2 w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex">
            <div className="w-1/2">
              <div className="font-bold p-4">The Link</div>
              <div className="p-4">
                <input
                  type="text"
                  name="link"
                  id="link"
                  value={projectBackendItem.link || ""}
                  onChange={handleChange}
                  className="p-2 w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="font-bold p-4">The Progress</div>
              <div className="p-4">
                <input
                  type="number"
                  name="projectProgress"
                  id="projectProgress"
                  min="0"
                  max="100"
                  value={projectBackendItem.projectProgress || 0}
                  onChange={handleChange}
                  className="p-2 w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="font-bold p-4">The Why</div>
          <div className="p-4">
            <textarea
              id="problemDetail"
              name="problemDetail"
              value={projectBackendItem.problemDetail || ""}
              onChange={handleChange}
              rows="10"
              className="p-2 w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="font-bold p-4">The Problem Image</div>
          <div className="p-4">
            <input
              type="text"
              name="problemImageUrl"
              id="problemImageUrl"
              value={projectBackendItem.problemImageUrl || ""}
              onChange={handleChange}
              className="p-2 w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="font-bold p-4">The Build</div>
          <div className="p-4">
            <textarea
              id="buildDetail"
              name="buildDetail"
              value={projectBackendItem.buildDetail || ""}
              onChange={handleChange}
              rows="10"
              className="p-2 w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="font-bold p-4">The Operation</div>
          <div className="p-4">
            <textarea
              id="operationDetail"
              name="operationDetail"
              value={projectBackendItem.operationDetail || ""}
              onChange={handleChange}
              rows="10"
              className="p-2 w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="font-bold p-4">The Build Image</div>
          <div className="p-4">
            <input
              type="text"
              name="buildImageUrl"
              id="buildImageUrl"
              value={projectBackendItem.buildImageUrl || ""}
              onChange={handleChange}
              className="p-2 w-full border border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="font-bold p-4">The Challenge</div>
          <div className="p-4">
            <textarea
              id="challengeDetail"
              name="challengeDetail"
              value={projectBackendItem.challengeDetail || ""}
              onChange={handleChange}
              rows="10"
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
                remove(projectBackendItem.id);
              }}
              className="p-6 bg-red-600 text-white font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              DEL
            </button>
            <button
              tag={Link}
              to="/adminonwarpdriveaheadtomultiverse/dashboard/?tab=projects"
              onClick={(e) => {
                e.preventDefault();
                backToProjectNavigate(
                  "/adminonwarpdriveaheadtomultiverse/dashboard/?tab=projects"
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
  );
};
export default ProjectAddOrEdit;
