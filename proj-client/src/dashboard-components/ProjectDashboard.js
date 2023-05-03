import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProjectDashboard = (props) => {
  const navigate = useNavigate();
  const [projectBackend, setProjectBackend] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch("/projects", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setProjectBackend(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const remove = async (id) => {
    await fetch(`/projects/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      const updatedProjectBackend = [...projectBackend].filter(
        (i) => i.id !== id
      );
      setProjectBackend(updatedProjectBackend);
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
                "/adminonwarpdriveaheadtomultiverse/dashboard/projects/add"
              )
            }
          >
            Add Projects
          </button>
        </div>
      </div>
      <div className="grid grid-cols-10 gap-y-4 py-4 text-center text-lg auto-cols-auto border-y-2 border-slate-500">
        <div className="font-bold col-span-1 p-4">No</div>
        <div className="font-bold col-span-2 p-4">Name</div>
        <div className="font-bold col-span-3 p-4">Problem</div>
        <div className="font-bold col-span-1 p-4">Link</div>
        <div className="font-bold col-span-1 p-4"> Progress</div>
        <div className="font-bold col-span-2 p-4">Actions</div>
        {projectBackend.map((project, index) => (
          <React.Fragment key={index}>
            <div className="col-span-1 font-bold p-4 bg-slate-200">
              {project.id}
            </div>
            <div
              className={`col-span-2 p-4 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } truncate`}
            >
              {project.projectName}
            </div>
            <div
              className={`col-span-3 p-4 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } truncate`}
            >
              {project.problemDetail}
            </div>
            <div
              className={`col-span-1 p-4 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } truncate`}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline truncate"
              >
                {project.link}
              </a>
            </div>
            <div
              className={`col-span-1 p-4 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } truncate`}
            >
              {project.projectProgress}
            </div>
            <div
              className={`col-span-2 p-4 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              }  truncate flex flex-row justify-center items-center space-x-6`}
            >
              <button
                tag={Link}
                to={"/projects/" + project.id}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(
                    "/adminonwarpdriveaheadtomultiverse/dashboard/projects/" +
                      project.id
                  );
                }}
                className="bg-slate-500 p-2"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  remove(project.id);
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

export default ProjectDashboard;
