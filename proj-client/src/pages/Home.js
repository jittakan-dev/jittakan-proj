import React, { useRef, useState, useCallback, useEffect } from "react";
import Project from "../interface-components/Project";
import Profile from "../interface-components/Profile";
import Contact from "../interface-components/Contact";
import ScrollIndicator from "../interface-components/ScrollIndicator";
import Logo from "../interface-components/Logo";

const Home = () => {
  const [, setWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(true);
  const [isProgressBarActive, setIsProgressBarActive] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [menu, setMenu] = useState(1);
  const [selectedMenu, setSelectedMenu] = useState(1);
  const refs = {
    contact: useRef(null),
    main: useRef(null),
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = useCallback(() => {
    setIsContactOpen((prevOpen) => !prevOpen);
  }, []);

  const handleScroll = useCallback(
    (isScrollTop) => {
      setIsContactOpen(false);
      if (isScrollTop) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        const tabRefOffsetTop = refs.main.current.offsetTop;
        const offsetTop = refs.contact.current.offsetTop;
        window.scrollTo({
          top: offsetTop - tabRefOffsetTop,
          behavior: "smooth",
        });
      }
    },
    [refs.main, refs.contact]
  );

  const handleTabClick = useCallback(
    (event) => {
      const selectedTab = event.target;
      const selectedContent = refs.main.current.querySelector(
        `#${selectedTab.dataset.tab}`
      );
      const tabContents = refs.main.current.querySelectorAll(".tab-content");

      tabContents.forEach((content) => {
        content.style.display = content === selectedContent ? "block" : "none";
      });

      setIsProgressBarActive(selectedTab.dataset.tab === "tab-2");
      setMenu(Number(selectedTab.dataset.tab.split("-")[1]));
    },
    [setIsProgressBarActive, setMenu, refs.main]
  );

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  if (isLoading) {
    return (
      <p className="flex flex-col justify-center items-center w-full h-full p-10 m-10 z-40 text-white">
        Loading
      </p>
    );
  }
  return (
    <>
      <div className="flex relative min-h-screen w-full justify-center items-center bg-darkGB">
        <ScrollIndicator />
        <div className="flex flex-col min-h-screen w-11/12 text-xl sx:text-base smr:text-base-l sm:text-base-s md:text-base lg:text-base-l xl:text-lg 2xl:text-xl text-blackGB bg-darkLGB">
          <div className="grid grid-cols-6 sx:grid-cols-5 smr:grid-cols-5 2xl:grid-cols-6 gap-x-0.7 sticky top-0 z-20 h-full w-full border-b-3 border-darkLGB bg-darkLGB">
            <div
              style={{
                maxHeight: isContactOpen ? "32rem" : "0",
                transition: "max-height 0.5s",
              }}
              className="col-span-6 sx:col-span-5 smr:col-span-5 2xl:col-span-6 row-span-1 text-3xl sx:text-xl smr:text-2xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl"
            >
              <div className="flex flex-row w-full h-auto justify-center items-center py-12 sx:py-10 smr:py-10 2xl:py-12 text-whiteY">
                <button
                  data-tab="tab-1"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    handleTabClick(ev);
                    handleScroll(true);
                    setIsProgressBarActive(false);
                    setMenu(1);
                    setSelectedMenu(1);
                  }}
                  className={`mx-8 sx:mx-4 smr:mx-6 2xl:mx-8 pb-2 cursor-pointer border-red-600 ${
                    selectedMenu === 1 ? "border-b-8" : ""
                  }`}
                >
                  Projects
                </button>

                <button
                  data-tab="tab-2"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    handleTabClick(ev);
                    handleScroll(true);
                    setIsProgressBarActive(true);
                    setMenu(2);
                    setSelectedMenu(2);
                  }}
                  className={`mx-8 sx:mx-4 smr:mx-6 2xl:mx-8 pb-2 cursor-pointer border-red-600 ${
                    selectedMenu === 2 ? "border-b-8" : ""
                  }`}
                >
                  About
                </button>

                <button
                  data-tab="tab-3"
                  onClick={(ev) => {
                    ev.stopPropagation();
                    handleScroll(false);
                    setSelectedMenu(3);
                  }}
                  className={`mx-8 sx:mx-4 smr:mx-6 2xl:mx-8 pb-2 cursor-pointer border-red-600 ${
                    selectedMenu === 3 ? "border-b-8" : ""
                  }`}
                >
                  Contact
                </button>
              </div>
            </div>

            <div className="col-span-1 row-span-1 block sx:hidden smr:hidden sm:block md:block lg:block xl:block 2xl:block text-black bg-whiteMY">
              <div className="flex flex-col justify-end items-start w-full h-full">
                <div className="w-1/5 h-full p-2 border-r-3 border-darkLGB bg-whiteG"></div>
              </div>
            </div>

            <div className="col-span-5 row-span-1 flex flex-row w-full h-auto bg-darkLGB">
              <div className="flex justify-start items-start w-full h-full bg-whiteY">
                <div className="pl-20 sx:pl-2 smr:pl-2 sm:pl-10 md:pl-12 lg:pl-20 xl:pl-20 2xl:pl-20 absolute">
                  <Logo />
                </div>
                <div className="flex flex-col justify-start items-start w-full h-full border-r-3 bg-whiteG border-darkLGB">
                  <div className="w-2/6 h-full p-2 border-r-3 border-darkLGB bg-whiteB"></div>
                </div>
                <div className="flex flex-col justify-end items-start w-full h-full ">
                  <div className="w-full h-1/3 p-2 border-t-3 border-darkLGB bg-whiteB"></div>
                </div>
              </div>
              <div className="flex-none w-2/12 sx:w-4/12 smr:w-4/12 2xl:w-2/12 px-10 sx:px-6 smr:px-10 2xl:px-10 py-12 sx:py-10 smr:py-10 2xl:py-12 border-l-3 border-darkLGB bg-whiteY">
                <div className="flex flex-row w-auto h-full justify-center items-center text-2xl sx:text-xl smr:text-xl sm:text-xl md:text-xl lg:text-2xl xl:text-2xl 2xl:text-2xl">
                  <div
                    onClick={handleClick}
                    className={`flex p-2 cursor-pointer border-b-8 hover:border-red-700 ${
                      isContactOpen ? "border-red-700" : "border-lightGB"
                    }`}
                  >
                    {isContactOpen ? "Close" : "Open"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <main
            ref={refs.main}
            className="sticky grid grid-cols-6 sx:grid-cols-5 smr:grid-cols-5 2xl:grid-cols-6 grid-rows-2 gap-0.7 h-full w-full border-b-3 border-darkLGB"
          >
            <div className="col-span-1 row-span-2 h-auto w-full flex sx:hidden smr:hidden 2xl:flex flex-col bg-whiteDG">
              <div className="w-full sticky top-2/4 z-20 text-3xl sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl text-left bg-whiteDG">
                <div className="p-1 my-10 py-8 border-b-4 border-darkLGB">
                  <p className="w-fit">
                    {menu === 1 ? "PROJECT" : menu === 2 ? "ABOUT" : null}
                    <span className="text-4xl lg:text-xl xl:text-xl 2xl:text-4xl">
                      .
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-5 row-span-2">
              <div id="tab-1" className="tab-content flex flex-col">
                <Project />
              </div>

              <div
                id="tab-2"
                style={{ display: "none" }}
                className="tab-content flex flex-col"
              >
                <Profile active={isProgressBarActive} />
              </div>
            </div>
          </main>

          <div ref={refs.contact}>
            <Contact />
          </div>

          <div className="w-full py-10 px-6 text-center text-whiteY">
            © 2023 JITTAKAN-ProJ. Jittakan is a developer located in Bangkok,
            Thailand.
            <br /> All Rights Reserved.
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
