import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { ProjectProgress } from "../utilities/Helper";
const Project = () => {
  const [toggleStates, setToggleStates] = useState({});
  const [sortOrder, setSortOrder] = useState("asc");
  const [project, setProject] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(1);
  const [item, setProjectItem] = useState(1);
  const scrollRefs = useRef([]);
  let totalProjectProgress = 0;
  let totalProjectNumber = 0;

  const handleScrollTo = useCallback(
    (index) => {
      const offsetTop = scrollRefs.current[index].offsetTop;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    },
    [scrollRefs]
  );

  const toggleHandler = useCallback((index) => {
    setToggleStates((prevToggleStates) => ({
      ...prevToggleStates,
      [index]: !prevToggleStates[index],
    }));
  }, []);

  const sortedProjects = useMemo(() => {
    if (!project || !Array.isArray(project) || project.length === 0) {
      setLoading(true);
      return [];
    }
    return project
      .slice()
      .sort((a, b) =>
        sortOrder === "asc"
          ? a.projectProgress - b.projectProgress
          : b.projectProgress - a.projectProgress
      );
  }, [project, sortOrder]);

  const fetchProjects = useCallback(async () => {
    try {
      const response = await fetch("/projects", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setProject(data);
      scrollRefs.current = scrollRefs.current.slice(0, data.length);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchProjects();
  }, [fetchProjects]);

  if (loading) {
    return (
      <p className="flex flex-col justify-center items-center w-full h-full p-10 m-10 z-40 text-white">
        Loading
      </p>
    );
  }

  return (
    <React.Fragment>
      <div className="w-full h-auto bg-whiteDY">
        <div className="w-full h-full relative flex justify-end items-center"></div>
        <div className="flex border-b-3 border-darkLGB">
          <div className="w-full border-darkLGB">
            <div className="w-full justify-end items-center hidden sx:flex smr:flex sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden px-4 pt-2 sx:pt-4 smr:pt-4 2xl:pt-2 text-3xl">
              <span className="p-1 border-b-8 border-darkLGB">Projects</span>
            </div>
            <div className="flex flex-row justify-end items-center px-6 sx:px-3 smr:px-6 2xl:px-6 py-4 sx:py-0 smr:py-0 sm:py-0 md:py-4 lg:py-4 xl:py-4 2xl:py-4 text-1.5xl sx:text-base-l smr:text-lg sm:text-base-l md:text-base-l lg:text-lg xl:text-xl 2xl:text-1.5xl">
              Progress :
              <button
                onClick={(ev) => {
                  setSortOrder("asc");
                  setOrder(1);
                }}
                className={`p-1 ${order === 1 ? "font-semibold" : ""}`}
              >
                ASC
              </button>
              <span className="py-2">/</span>
              <button
                onClick={(ev) => {
                  setSortOrder("desc");
                  setOrder(2);
                }}
                className={`p-1 ${order === 2 ? "font-semibold" : ""}`}
              >
                DESC
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row w-full">
        <div className="w-4/5 sx:w-full smr:w-full sm:w-full md:w-full lg:w-4/5 xl:w-4/5 2xl:w-4/5 bg-whiteG">
          {sortedProjects.map((project, index) => {
            totalProjectProgress += project.projectProgress;
            totalProjectNumber = index + 1;
            return (
              <div
                key={project.id}
                ref={(ref) => (scrollRefs.current[index] = ref)}
              >
                <button
                  onClick={(ev) => {
                    toggleHandler(index);
                    handleScrollTo(index);
                    setProjectItem(project.id);
                  }}
                  className={`group flex flex-col h-auto w-full relative border-b-3 border-darkLGB bg-whiteG cursor-pointer hover:text-green-900 ${
                    item === project.id ? "text-green-900" : "text-blackGB"
                  }`}
                >
                  <div className="grid grid-cols-5 grid-rows-1 gap-0.7 h-full w-full">
                    <div className="col-span-5 row-span-1">
                      <div className="flex flex-row h-full w-full items-center justify-center">
                        <div className="flex sx:hidden smr:hidden sm:hidden md:flex lg:flex xl:flex 2xl:flex items-end justify-center p-6 h-full w-auto border-r-3 border-darkLGB">
                          {toggleStates[index] ? (
                            <FontAwesomeIcon icon={faAngleUp} />
                          ) : (
                            <FontAwesomeIcon icon={faAngleDown} />
                          )}
                        </div>
                        <div className="grow"></div>
                        <div className="flex flex-col items-end justify-end border-l-3 border-darkLGB">
                          <div
                            className={`flex flex-row sx:flex-col-reverse smr:flex-col-reverse sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row w-full h-full 
                            items-center sx:items-end smr:items-end sm:items-end md:items-end lg:items-center xl:items-center 2xl:items-center 
                            justify-center border-b-3 sx:border-b-0 smr:border-b-0 sm:border-b-3 md:border-b-3 lg:border-b-3 xl:border-b-3 2xl:border-b-3 border-darkLGB group-hover:bg-mustard ${
                              item === project.id ? "bg-mustard" : "bg-lightGB"
                            }`}
                          >
                            <div className="flex flex-col justify-center items-center h-full">
                              <div className="p-2 text-3xl sx:text-xl smr:text-xl sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl">
                                {project.projectName}
                              </div>
                            </div>
                            <div className="flex justify-center items-center h-full border-l-3 border-b-0 sx:border-b-3 smr:border-b-3 sm:border-b-0 md:border-b-0 lg:border-b-0 xl:border-b-0 2xl:border-b-0 border-darkLGB bg-whiteG">
                              <div className="p-2 text-8xl sx:text-6xl smr:text-6xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-7xl 2xl:text-8xl">
                                0{index + 1}
                              </div>
                            </div>
                          </div>
                          <div className="p-2 flex sx:hidden smr:hidden sm:flex md:flex lg:flex xl:flex 2xl:flex">
                            <ProjectProgress
                              progress={project.projectProgress}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
                <div
                  style={{ display: toggleStates[index] ? "block" : "none" }}
                  className="bg-whiteDG"
                >
                  <div className="flex flex-col">
                    <div className="flex flex-row sx:flex-col smr:flex-col 2xl:flex-row border-b-3 border-darkLGB">
                      <div className="p-10 sx:p-6 smr:p-10 sm:p-6 md:p-6 lg:p-8 xl:p-8 2xl:p-10">
                        <div className="p-2 text-left text-2xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl border-b-8 border-darkLGB">
                          The
                          <br className="block sx:hidden smr:hidden 2xl:block" />
                          Why
                        </div>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: project.problemDetail
                            ? project.problemDetail
                            : "",
                        }}
                        className="p-10 sx:p-6 smr:p-10 sm:p-6 md:p-6 lg:p-8 xl:p-8 2xl:p-10 text-left border-l-3 sx:border-l-0 smr:border-l-0 2xl:border-l-3 border-t-0 sx:border-t-3 smr:border-t-3 2xl:border-t-0 border-darkLGB"
                      ></div>
                    </div>

                    {project.problemImageUrl ? (
                      <div className="flex flex-col w-full h-full p-6 items-center justify-center relative bg-darkLGB">
                        <div className="w-full h-full bg-transparent absolute inset-0"></div>
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/proj-images/" +
                            project.problemImageUrl
                          }
                          alt=""
                          className="w-auto h-auto"
                        />
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="flex flex-row w-full justify-end items-center border-b-3 border-darkLGB">
                      <div className="p-10 sx:p-6 smr:p-6 sm:p-6 md:p-6 lg:p-8 xl:p-8 2xl:p-10">
                        <div className="p-2 text-right text-2xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl border-b-8 border-darkLGB">
                          The Solution
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row sx:flex-col smr:flex-col 2xl:flex-row w-full border-b-3 border-darkLGB">
                      <div className="flex flex-col w-6/12 sx:w-full smr:w-full 2xl:w-6/12 p-10 sx:p-6 smr:p-10 sm:p-6 md:p-6 lg:p-8 xl:p-8 2xl:p-10 text-justify ">
                        <div className="flex">
                          <div className="text-left text-xl sm:text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-xl border-b-4 border-darkLGB">
                            The Build
                          </div>
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: project.buildDetail
                              ? project.buildDetail
                              : "",
                          }}
                          className="py-6 text-left overflow-hidden"
                        ></div>
                      </div>
                      <div className="flex flex-col w-6/12 sx:w-full smr:w-full 2xl:w-6/12 p-10 sx:p-6 smr:p-10 sm:p-6 md:p-6 lg:p-8 xl:p-8 2xl:p-10 text-justify border-l-3 sx:border-l-0 smr:border-l-0 2xl:border-l-3 border-t-0 sx:border-t-3 smr:border-t-3 2xl:border-t-0 border-darkLGB">
                        <div className="flex">
                          <div className="text-right text-xl sm:text-lg md:text-xl lg:text-xl xl:text-xl 2xl:text-xl border-b-4 border-darkLGB">
                            The Operation
                          </div>
                        </div>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: project.operationDetail
                              ? project.operationDetail
                              : "",
                          }}
                          className="py-6 text-left overflow-hidden"
                        ></div>
                      </div>
                    </div>
                  </div>

                  {project.buildImageUrl ? (
                    <div className="flex flex-col w-full h-full p-6 items-center justify-center relative bg-darkLGB">
                      <div className="w-full h-full bg-transparent absolute inset-0"></div>
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/proj-images/" +
                          project.buildImageUrl
                        }
                        alt=""
                        className="w-full h-full"
                      />
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="flex flex-row sx:flex-col smr:flex-col 2xl:flex-row w-full justify-center items-center border-b-3 border-darkLGB">
                    <div className="flex flex-col w-7/12 sx:w-full smr:w-full 2xl:w-7/12 p-10 sx:p-6 smr:p-10 sm:p-6 md:p-6 lg:p-8 xl:p-8 2xl:p-10  text-justify border-r-3 sx:border-r-0 smr:border-r-0 2xl:border-r-3 border-b-0 sx:border-b-3 smr:border-b-3 2xl:border-b-0 border-darkLGB">
                      <div className="flex">
                        <div className="p-2 text-left text-2xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl border-b-8 border-darkLGB">
                          The Challenge
                        </div>
                      </div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: project.challengeDetail
                            ? project.challengeDetail
                            : "",
                        }}
                        className="py-6 text-left"
                      ></div>
                    </div>
                    <div className="flex flex-col justify-center items-center w-5/12 sx:w-full smr:w-full 2xl:w-5/12 p-10 sx:p-6 smr:p-10 sm:p-6 md:p-6 lg:p-8 xl:p-8 2xl:p-10 border-b-3 sx:border-b-0 smr:border-b-0 2xl:border-b-3 border-darkLGB">
                      <a
                        className="p-4 sm:p-2 text-2xl sx:text-xl smr:text-2xl sm:text-xl md:text-xl lg:text-xl xl:text-2xl 2xl:text-2xl text-whiteY  bg-darkLGB border-4 border-darkLGB hover:text-darkLGB hover:bg-whiteY hover:border-darkLGB"
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {project.projectName}
                      </a>
                    </div>
                  </div>

                  <div className="flex w-full justify-center items-center p-6 sx:p-6 smr:p-10 sm:p-6 md:p-6 lg:p-8 xl:p-8 2xl:p-6 text-whiteY border-b-3 border-darkLGB bg-darkLGB">
                    <div className="py-1 sx:py-0 smr:py-0 sm:py-0 2xl:py-1 mr-10 sx:mr-2 smr:mr-2 sm:mr-2 md:mr-2 lg:mr-4 xl:mr-6 2xl:mr-10 text-2xl sx:text-lg smr:text-lg sm:text-lg md:text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl border-b-3 border-whiteY">
                      End of {project.projectName}
                    </div>

                    <div className="p-10 sx:p-2 smr:p-2 sm:p-2 md:p-2 lg:p-4 xl:p-6 2xl:p-10 hover:text-slate-300">
                      <button onClick={() => handleScrollTo(index)}>
                        <FontAwesomeIcon
                          icon={faCircleArrowUp}
                          className="text-4xl sx:text-3xl smr:text-3xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-4xl"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col sx:hidden smr:hidden sm:hidden md:hidden lg:block xl:block 2xl:block w-1/5 lg:w-1/5 xl:w-1/5 2xl:w-1/5 bg-whiteDY border-l-8 border-b-3 border-darkLGB">
          <div className="flex flex-col sticky top-1/3 z-30 pl-10 my-5 justify-center items-start w-full h-auto ">
            <div className="w-full py-2 text-6xl lg:text-5xl xl:text-5xl 2xl:text-6xl border-b-3 border-darkLGB">
              {totalProjectProgress / totalProjectNumber
                ? Math.floor(totalProjectProgress / totalProjectNumber)
                : 0}
              %
            </div>
            <div className="py-2 text-2xl lg:text-xl xl:text-xl 2xl:text-2xl">
              <span className="text-4xl lg:text-xl xl:text-xl 2xl:text-4xl pr-2">
                {totalProjectNumber ? totalProjectNumber : 0}
              </span>
              <span>Projects.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full h-full p-8 bg-whiteY border-b-4 border-darkLGB"></div>

      <div className="grid grid-cols-5 grid-rows-1 gap-0.7 relative h-full w-full border-b-4 border-darkLGB">
        <div
          className="col-span-3 sx:col-span-6 smr:col-span-6 2xl:col-span-3 row-span-1 
        pr-10 sx:pr-0 smr:pr-0 sm:pr-0 md:pr-0 lg:pr-8 xl:pr-8 2xl:pr-10 py-10 sx:py-0 smr:py-0 sm:py-0 md:py-0 lg:py-8 xl:py-8 2xl:py-10 bg-whiteY"
        >
          <div
            className="p-10 sx:p-6 smr:p-6 sm:p-6 md:p-6 lg:p-8 xl:p-8 2xl:p-10 
            border-r-3 sx:border-r-0 smr:border-r-0 sm:border-r-0 md:border-r-0 lg:border-r-3 xl:border-r-3 2xl:border-r-3
            border-t-3 sx:border-t-0 smr:border-t-0 sm:border-t-0 md:border-t-0 lg:border-t-3 xl:border-t-3 2xl:border-t-3
          border-b-3 sx:border-b-0 smr:border-b-0 sm:border-b-0 md:border-b-0 lg:border-b-8 xl:border-b-8 2xl:border-b-8 border-darkLGB bg-whiteG"
          >
            <p className="pl-2 mb-5 md:mb-4 lg:mb-4 text-3xl sx:text-1.5xl smr:text-1.5xl sm:text-1.5xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl border-l-8 border-darkLGB">
              Product-focused development
            </p>
            <p>
              This portfolio serves as a platform to showcase my thoughts and
              ideas as I build apps that aim to provide a memorable experience
              by utilizing influential factors. My objective is to minimize any
              constraints and maximize the potential of each possibility.
            </p>
            <p className="my-5 md:mb-4 lg:mb-4 2xl:mb-5 border-b-3 border-darkLGB"></p>
            <p className="pl-2  mb-5 md:mb-4 lg:mb-4 text-3xl sx:text-1.5xl smr:text-1.5xl sm:text-1.5xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl border-l-8 border-darkLGB">
              Holistic process
            </p>
            <p>
              Imagine being in a high-pressure situation where a deadline is
              fast approaching, and you're staring at a blank page, feeling your
              adrenaline levels spike. In such a situation, all you need to do
              is seek superpower assistance, and that is where I come in. My
              superpower includes a wide range of skills, such as gathering
              requirements, designing systems, coding, testing, and deployment.
              Furthermore, it involves frequent communication and collaboration
              with developers, stakeholders, and end-users.
            </p>
          </div>
        </div>
        <div className="flex  flex-col justify-center items-center col-span-2 sx:col-span-6 smr:col-span-6 row-span-1 bg-whiteY">
          <div
            className="p-10 sx:p-6 smr:p-6 sm:p-6 md:p-6 lg:p-8 xl:p-8 2xl:p-10 border-t-4 border-b-3 border-darkLGB 
            bg-whiteG"
          >
            <p className="pl-2  mb-5 md:mb-4 lg:mb-4 text-3xl sx:text-1.5xl smr:text-1.5xl sm:text-1.5xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl border-l-8 border-darkLGB">
              The offer
            </p>
            <p>
              I provide <span className="font-bold">The services</span> in
              designing and developing software products, including both online
              and offline applications, with a focus on prioritizing
              functionality and
              <span className="pl-1 font-IBMPlexSerifSemiBoldItalic text-green-hightlight">
                user satisfaction.
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full h-full p-10 sx:p-2 smr:p-2 sm:p-2 md:p-2 lg:p-10 xl:p-10 2xl:p-10 bg-whiteDY "></div>
    </React.Fragment>
  );
};

export default Project;
