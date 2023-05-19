import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import ProgressBar from "../components/ProgressBar.js";

const Profile = function (props) {
  const date = new Date();
  const options = { month: "short" };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const month = formatter.format(date);

  const [completeCertificates, setCompleteCertificates] = useState([]);
  const [incompleteCertificates, setIncompleteCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const profileTabRef = useRef(null);
  const [profileMenu, setProfileMenu] = useState(1);

  const handleProfileScrollTop = () => {
    const tabRefOffsetTop = document.querySelector("#profile-tab").offsetTop;
    window.scrollTo({ top: tabRefOffsetTop, behavior: "smooth" });
  };
  const handleTabClick = useCallback(
    (event) => {
      const selectedTab = event.target;
      const profileTabLinks =
        profileTabRef.current.querySelectorAll(".profile-tab-link");
      const profileTabContents = profileTabRef.current.querySelectorAll(
        ".profile-tab-content"
      );
      profileTabLinks.forEach((link) => {
        link.classList.toggle("active", link === selectedTab);
      });
      selectedTab.classList.add("active");
      profileTabContents.forEach((content) => {
        content.style.display =
          content.id !== selectedTab.dataset.tab ? "none" : "block";
      });
    },
    [profileTabRef]
  );

  const parseYear = useMemo(
    () => (certificate) =>
      new Date(certificate.certificateYear.split("/").reverse().join("-")),
    []
  );

  const processData = useMemo(
    () => (data) => {
      const incomplete = [];
      const complete = [];

      for (let i = 0; i < data.length; i++) {
        const certificate = data[i];
        if (certificate.certificateProgress < 100) {
          incomplete.push(certificate);
        } else {
          complete.push(certificate);
        }
      }

      if (complete.length > 0) {
        complete.sort((a, b) => parseYear(b) - parseYear(a));
      }

      return { incomplete, complete };
    },
    [parseYear]
  );

  const fetchAndSetData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/certificates", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const { incomplete, complete } = processData(data);
      setIncompleteCertificates(incomplete);
      setCompleteCertificates(complete);
    } catch (error) {
      console.error(error);
      setIncompleteCertificates([]);
      setCompleteCertificates([]);
    } finally {
      setLoading(false);
    }
  }, [processData]);

  useEffect(() => {
    setLoading(true);
    fetchAndSetData();
  }, [fetchAndSetData]);

  if (loading) {
    return (
      <p className="flex flex-col justify-center items-center w-full h-full p-10 m-10 z-40 text-white">
        Loading
      </p>
    );
  }
  return (
    <>
      <div className="bg-whiteY">
        <div className="w-full justify-end items-center hidden sx:flex smr:flex sm:flex md:flex mdh:flex lg:hidden lgh:flex xl:hidden 2xl:hidden px-4 pt-2 sx:pt-4 smr:pt-4 2xl:pt-2 pb-3 text-3xl border-b-3 border-darkLGB bg-whiteG">
          <span className="p-1 border-b-8 border-darkLGB">About</span>
        </div>
      </div>
      <div className="flex flex-row sx:flex-col smr:flex-col 2xl:flex-row w-full border-b-4 border-darkLGB bg-whiteY">
        <div className="flex flex-col w-5/12 sx:w-full smr:w-full sm:w-5/12 md:w-5/12 mdh:w-4/12 lg:w-4/12 lgh:w-4/12 xl:w-4/12 2xl:w-4/12">
          <div className="p-6 border-b-3 border-darkLGB"></div>
          <div className="flex flex-col w-full justify-center items-start border-t-3 sx:border-t-3 smr:border-t-3 sm:border-t-0 md:border-t-0 lg:border-t-0 xl:border-t-0 2xl:border-t-0 border-darkLGB">
            <div className="flex flex-col w-full h-fit justify-center items-start p-10 sx:p-10 smr:p-10 sm:p-6 md:p-6 lg:p-10 xl:p-10 2xl:p-10 border-b-3 border-darkLGB bg-mustard">
              <p className="text-left pl-2 pt-10 sx:pt-0 smr:pt-0 sm:pt-10 md:pt-10 lg:pt-10 xl:pt-10 2xl:pt-10 text-3xl sx:text-2xl smr:text-2xl sm:text-1.5xl md:text-2xl mdh:text-2xl lg:text-2xl lgh:text-2xl xl:text-2xl 2xl:text-3xl border-l-8 border-darkLGB">
                Jittakan <br /> Suwannakhon
              </p>
            </div>
            <div className="flex flex-col w-full h-fit justify-center items-start p-10 sx:p-10 smr:p-10 sm:p-6 md:p-6 lg:p-10 xl:p-10 2xl:p-10 text-1.5xl sx:text-lg smr:text-xl sm:text-lg md:text-xl mdh:text-xl lg:text-xl lgh:text-xl xl:text-xl 2xl:text-1.5xl bg-whiteG ">
              <div className="flex flex-col justify-center items-start">
                <p className="text-left">
                  <span className="font-extrabold">+</span> Java and JS
                  technologist.
                </p>
                <p className="text-left">
                  <span className="font-extrabold">+</span> Technical
                  communicator.
                </p>
                <p className="text-left">
                  <span className="font-extrabold">+</span> Lone survivor.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center items-center p-10 sx:p-10 smr:p-10 sm:p-6 md:p-6 lg:p-10 xl:p-10 2xl:p-10 py-6 w-full border-y-3 border-darkLGB text-white bg-olive">
              <p className="w-full font-bold pb-2 mb-4 text-4xl sx:text-2xl smr:text-2xl sm:text-2xl md:text-2xl mdh:text-3xl lg:text-3xl xl:text-3xl 2xl:text-4xl border-b-4 border-white">
                Goals
              </p>
              <div className="flex flex-row sx:flex-row smr:flex-row sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-start items-center sx:items-center smr:items-center sm:items-start md:items-center lg:items-center xl:items-center 2xl:items-center w-full text-left">
                <span className="font-semibold text-6xl sx:text-5xl smr:text-5xl sm:text-5xl md:text-5xl mdh:text-5xl lg:text-5xl lgh:text-5xl xl:text-6xl 2xl:text-6xl">
                  {incompleteCertificates.length}
                </span>
                <span className="px-4 font-semibold text-2xl block sx:block smr:block sm:hidden md:block lg:block xl:block 2xl:block">
                  -
                </span>
                <span className="font-semibold text-3xl sx:text-2xl smr:text-2xl sm:text-2xl md:text-2xl mdh:text-2xl  lg:text-2xl lgh:text-2xl xl:text-3xl 2xl:text-3xl">
                  Ongoing
                </span>
              </div>
              <div className="flex flex-row sx:flex-row smr:flex-row sm:flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row justify-start items-center sx:items-center smr:items-center sm:items-start md:items-center lg:items-center xl:items-center 2xl:items-center w-full text-left">
                <span className="font-semibold text-6xl sx:text-5xl smr:text-5xl sm:text-5xl md:text-5xl  mdh:text-5xl lg:text-5xl lgh:text-5xl xl:text-6xl 2xl:text-6xl">
                  {completeCertificates.length}
                </span>
                <span className="px-4 font-semibold text-2xl block sx:block smr:block sm:hidden md:block lg:block xl:block 2xl:block">
                  -
                </span>
                <span className="font-semibold text-3xl sx:text-2xl smr:text-2xl sm:text-2xl md:text-2xl mdh:text-2xl lg:text-2xl lgh:text-2xl xl:text-3xl 2xl:text-3xl">
                  Completed
                </span>
              </div>

              <p className="w-full pt-4 mt-4 text-right text-2xl sx:text-2xl smr:text-2xl sm:text-2xl md:text-2xl mdh:text-2xl lg:text-2xl lgh:text-2xl xl:text-2xl 2xl:text-2xl border-t-4 border-white">
                {date.getDate()} / {month} / {date.getFullYear()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-7/12 sx:w-full smr:w-full sm:w-7/12 md:w-7/12 mdh:w-8/12 lg:w-8/12 lgh:w-8/12 xl:w-8/12 2xl:w-8/12 p-10 sx:p-6 smr:p-10 sm:p-4 md:p-6 lg:p-8 xl:p-8 2xl:p-10 border-l-4 sx:border-l-0 smr:border-l-0 2xl:border-l-4 border-darkLGB bg-whiteDY ">
          <div className="flex justify-end items-center p-1 mb-5 md:mb-4 lg:mb-4 xl:mb-5 2xl:mb-5 text-3xl md:text-2xl text-darkLGB border-b-3 border-darkLGB">
            <p className="pr-2 mb-5 md:mb-4 lg:mb-4 text-3xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl border-r-8 border-darkLGB">
              Me
            </p>
          </div>
          <p>
            Hey, I am Jittakan, and I am a passionate developer.
            <br />
            <br />
            As an experienced full-stack developer, I possess a moderate command
            over a short range of technologies, including Java, the Spring
            Framework, and its related libraries, as well as Spring foundation,
            such as Jakarta EE. I am also fond of the JavaScript family,
            including Node.js, React.js, and Angular.js. SQL query commands and
            stored procedures are a must for me to complete the circle. My
            passion lies in the development of applications, ranging from simple
            HTML files to intricate applications. This includes all aspects of
            the process, such as
            <span className="px-1  break-words">designing</span>,
            <span className="px-1  break-words">developing</span>, and
            <span className="px-1  break-words">devops-ing.</span>
          </p>
          <br />
          <p>
            As a proactive problem-solver, my approach is to make incremental
            improvements and optimize performance by breaking down problems into
            small clusters. I constantly combine creativity and feasibility
            (sometimes reality) asynchronously to conquer each cluster. Finally,
            I unite all the solved problems into a provable solution with an
            O(log n) complexity as close to 1 as possible.
          </p>
          <br />
          <p>
            Besides facing in front of laptop monitors, I'm passionate about
            many creative pursuits, such as art and architecture appreciation,
            city riding, playing board games, and participating in various
            exercises and sports. These activities keep me healthy, sharpen my
            strategic thinking skills, and help me maintain a balance between my
            extroverted and introverted sides.
          </p>
        </div>
      </div>

      <div
        id="profile-tab"
        ref={profileTabRef}
        className="flex flex-row relative sx:flex-col-reverse smr:flex-col-reverse 2xl:flex-row w-full h-full justify-center items-start bg-whiteY border-b-4 border-darkLGB"
      >
        <div className="flex flex-col w-8/12 sx:w-full smr:w-full sm:w-8/12 2xl:w-8/12 h-full border-t-3 border-darkLGB">
          <div
            id="profile-tab-1"
            className="profile-tab-content w-full h-full border-r-8 sx:border-r-0 smr:border-r-0 2xl:border-r-8 border-darkLGB"
          >
            <div className="flex">
              <div className="p-6 sx:p-3 smr:p-3 sm:p-3 md:p-3 lg:p-6 xl:p-6 2xl:p-6 border-r-3 border-darkLGB bg-whiteG"></div>
              <div className="flex flex-col w-full p-10 sx:p-6 smr:p-10 sm:p-4 md:p-6 lg:p-8 2xl:p-10">
                <div className="mb-4 md:mb-2 lg:mb-3 pb-4 md:pb-2 lg:pb-3  text-2xl sm:text-lg md:text-xl mdh:text-1.5xl lg:text-2xl lgh:text-1.5xl xl:text-2xl 2xl:text-2xl text-right sx:text-center smr:text-center 2xl:text-right border-b-3 border-darkLGB">
                  Undone Goals
                </div>
                {incompleteCertificates.map((certificate) => {
                  return (
                    <ProgressBar
                      key={certificate.id}
                      name={certificate.certificateName}
                      code={certificate.certificateCode}
                      award={certificate.certificateAward}
                      year={certificate.certificateYear}
                      progress={certificate.certificateProgress}
                      score={certificate.certificateScore}
                      height={24}
                      active={props.active}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div
            id="profile-tab-2"
            className="profile-tab-content w-full h-full border-r-8 sx:border-r-0 smr:border-r-0 2xl:border-r-8 border-darkLGB"
            style={{ display: "none" }}
          >
            <div className="flex">
              <div className="p-6 sx:p-3 smr:p-3 sm:p-3 md:p-3 lg:p-6 xl:p-6 2xl:p-6 border-r-3 border-darkLGB bg-whiteG"></div>
              <div className="flex flex-col w-full p-10 sx:p-6 smr:p-10 sm:p-4 md:p-6 lg:p-8 2xl:p-10">
                <div
                  className="mb-4 md:mb-2 lg:mb-3 xl:mb-4 2xl:mb-4 pb-4 md:pb-2 lg:pb-3 xl:pb-4 2xl:pb-4 text-2xl sm:text-lg md:text-xl mdh:text-1.5xl lg:text-2xl lgh:text-1.5xl xl:text-2xl 2xl:text-2xl 
                text-right sx:text-center smr:text-center 2xl:text-right border-b-3 border-darkLGB"
                >
                  Completed Goals
                </div>
                {completeCertificates.map((certificate) => {
                  return (
                    <div
                      key={certificate.id}
                      className="flex flex-col py-4 text-ellipsis overflow-hidden text-left border-b-3 border-darkLGB"
                    >
                      <div className="">
                        {certificate.certificateName} (
                        {certificate.certificateCode})
                      </div>
                      {certificate.certificateAward && (
                        <div className="text-pink-800">
                          Award: {certificate.certificateAward}
                        </div>
                      )}
                      <div className="flex flex-row w-full">
                        <div className="flex-none">
                          {certificate.certificateYear}
                        </div>
                        <div className="grow"></div>
                        <div className="flex-none">
                          {certificate.certificateProgress === 100
                            ? "Completed"
                            : "Progressing"}
                          -
                          <span className="text-pink-800">
                            [ {certificate.certificateScore} ]
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div
          ref={profileTabRef}
          className="flex flex-col sticky sx:relative smr:relative 2xl:sticky top-1/4 w-4/12 sx:w-full smr:w-full sm:4/12 2xl:w-4/12"
        >
          <div className="flex flex-col w-full py-10 text-left sx:text-center smr:text-center 2xl:text-left text-2xl sx:text-xl smr:text-xl sm:text-base md:text-base-l  mdh:text-xl lg:text-lg lgh:text-xl xl:text-xl 2xl:text-2xl">
            <div className="flex flex-col w-full p-4 justify-center items-start border-t-3 border-b-4 border-darkLGB">
              <button
                data-tab="profile-tab-1"
                onClick={(ev) => {
                  ev.stopPropagation();
                  handleTabClick(ev);
                  setProfileMenu(1);
                  handleProfileScrollTop();
                }}
                className={`profile-tab-link active m-4 pl-4 border-l-8  cursor-pointer ${
                  profileMenu === 1
                    ? "border-red-700 font-semibold"
                    : "border-darkLGB"
                }`}
              >
                This year targets
              </button>
              <button
                data-tab="profile-tab-2"
                onClick={(ev) => {
                  ev.stopPropagation();
                  handleTabClick(ev);
                  setProfileMenu(2);
                  handleProfileScrollTop();
                }}
                className={`profile-tab-link active m-4 pl-4 border-l-8  cursor-pointer ${
                  profileMenu === 2
                    ? "border-red-700 font-semibold"
                    : "border-darkLGB"
                }`}
              >
                Met milestones
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full h-full p-10 sx:p-2 smr:p-2 sm:p-2 md:p-2 lg:p-10 xl:p-10 2xl:p-10 bg-whiteG"></div>
    </>
  );
};

export default Profile;
