import React from "react";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-6 sx:grid-cols-5 smr:grid-cols-5 sm:grid-cols-5 md:grid-cols-5 mdh:grid-cols-5 lg:grid-cols-6 lgh:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 grid-rows-1 gap-0.7 relative h-auto w-full">
        <div className="col-span-1 row-span-1 block sx:hidden smr:hidden sm:block md:block mdh:block lg:block lgh:hidden xl:block 2xl:block z-10 bg-whiteLG border-r-3 border-darkLGB">
          <div className="w-full text-3xl sm:text-xl md:text-2xl mdh:text-2xl lg:text-2xl lgh:text-2xl xl:text-3xl 2xl:text-3xl text-left sticky top-2/4 z-20 bg-whiteLG">
            <div className="p-1 py-8 my-10 border-b-4 border-darkLGB">
              CONTACT.
            </div>
          </div>
        </div>
        <div className="col-span-3 sx:col-span-6 smr:col-span-6 sm:col-span-4 md:col-span-4 mdh:col-span-4 lg:col-span-3 lgh:col-span-6 xl:col-span-3 2xl:col-span-3 row-span-1 sx:row-span-2 smr:row-span-2 sm:row-span-2 md:row-span-2 mdh:row-span-1 lg:row-span-1 lgh:row-span-2 xl:row-span-1 2xl:row-span-1 bg-whiteY">
          <div className="border-b-3 border-darkLGB">
            <div className="flex">
              <div className="p-6 sx:p-3 smr:p-3 sm:p-3 md:p-3 lg:p-6 xl:p-6 2xl:p-6 border-r-3 border-darkLGB bg-whiteG"></div>
              <div className=" p-10 sx:p-6 smr:p-6 sm:p-6 md:p-6 lg:p-8 xl:p-8 2xl:p-10">
                <p className="pl-2  mb-5 md:mb-4 lg:mb-4 text-3xl sx:text-1.5xl smr:text-1.5xl sm:text-1.5xl md:text-2xl mdh:text-2xl lg:text-2xl lgh:text-2xl xl:text-2xl 2xl:text-3xl border-l-8 border-darkLGB">
                  For business inquiries, alliances and coffee meet up
                </p>
                <p>
                  <span className="pr-1 font-semibold">
                    Would you like to get involved?
                  </span>
                  If you have any business inquiries or partnership proposals,
                  please don't hesitate to get in touch with me. I am always
                  open to exploring
                  <span className="px-1 font-IBMPlexSerifSemiBoldItalic text-green-hightlight">
                    new alliances and collaborations
                  </span>
                  that can benefit the clients and community. Alternatively, if
                  you're in the same city and would like to discuss potential
                  opportunities over a cup of coffee, I'd be happy to arrange a
                  meet up.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full border-b-3 border-darkLGB">
            <div className="flex flex-row justify-center items-center w-full p-10 sx:p-6 smr:p-10 sm:p-6 md:p-6 lg:p-8 xl:p-8 2xl:p-10 text-left bg-mustard">
              <p>
                See full projects cases on
                <a
                  href="https://github.com/jittakan-dev?tab=repositories"
                  className="pl-1 font-bold text-2xl"
                  target="_blank"
                  rel="noreferrer"
                >
                  Github
                </a>
                , Or follow highlights and experiments on
                <a
                  href="https://www.instagram.com/jt.geldmeister/"
                  className="pl-1 font-bold text-2xl"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
                . Any interests on collaborathing? Just drop me a line!
              </p>
            </div>
            <div
              className="flex flex-col w-full justify-center items-center py-2 p-10 sx:p-6 smr:p-10 sm:p-6 md:p-6 lg:p-8 xl:p-8 2xl:p-10 
          text-2xl sx:text-lg smr:text-xl sm:text-base-lg md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl border-t-3 border-darkLGB"
            >
              <p className="w-full mt-3 p-4 cursor-pointer text-white bg-olive">
                sn.jittakan@hotmail.com
              </p>
              <p className="w-full mt-3 p-4 cursor-pointer text-white bg-olive">
                +66 097 060 8606
              </p>
              <p className="w-full mt-3 p-4 cursor-pointer text-white bg-olive">
                Work based : Online / Bangkok, Thailand
              </p>
            </div>
          </div>
          <div className="">
            <ContactForm />
          </div>
        </div>
        <div className="col-span-2 sx:col-span-6 smr:col-span-6 sm:col-span-2 md:col-span-2 mdh:col-span-6 lg:col-span-2 lgh:col-span-6 xl:col-span-2 2xl:col-span-2 row-span-1 order-first z-10 block sx:block smr:block sm:hidden md:hidden mdh:hidden lg:block lgh:block xl:block 2xl:block bg-whiteY">
          <div className="block sx:hidden smr:hidden sm:hidden md:hidden mdh:hidden lg:block lgh:block xl:block 2xl:block w-full h-1/6 sticky top-0 z-20 bg-whiteLO border-b-3 border-darkLGB "></div>
          <div className="hidden sx:block smr:block sm:block md:block mdh:hidden lg:hidden lgh:block xl:hidden 2xl:hidden p-10 sx:p-6 smr:p-6 sm:p-6 md:p-6 lg:p-8 xl:p-9 2xl:p-10 text-right text-3xl sx:text-3xl smr:text-3xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl">
            <span className="p-1 border-b-8  border-darkLGB">Contact</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Contact;
