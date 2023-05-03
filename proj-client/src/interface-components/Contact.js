import React from "react";
import ContactForm from "./ContactForm";

const Contact = () => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-6 sx:grid-cols-5 smr:grid-cols-5 2xl:grid-cols-6 grid-rows-1 gap-0.7 relative h-auto w-full">
        <div className="col-span-1 row-span-1 block sx:hidden smr:hidden 2xl:block z-10 bg-whiteDG border-r-4 border-darkLGB">
          <div className="w-full text-3xl sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl text-left sticky top-2/4 z-20 bg-whiteDG">
            <div className="p-1 py-8 my-10 border-b-4 border-darkLGB">
              CONTACT
              <span className="text-4xl lg:text-xl xl:text-xl 2xl:text-4xl">
                .
              </span>
            </div>
          </div>
        </div>
        <div className="col-span-3 sx:col-span-6 smr:col-span-6 2xl:col-span-3 row-span-1 sx:row-span-2 smr:row-span-2 2xl:row-span-1 bg-whiteY">
          <div className="border-b-3 border-darkLGB">
            <div className="flex">
              <div className="p-6 sx:p-3 smr:p-3 sm:p-3 md:p-3 lg:p-6 xl:p-6 2xl:p-6 border-r-3 border-darkLGB bg-whiteG"></div>
              <div className=" p-10 sx:p-6 smr:p-6 sm:p-6 md:p-6 lg:p-8 xl:p-8 2xl:p-10">
                <p className="pl-2  mb-5 md:mb-4 lg:mb-4 text-3xl sx:text-1.5xl smr:text-1.5xl sm:text-1.5xl md:text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl border-l-8 border-darkLGB">
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
                  href="https://github.com/jittakan-dev"
                  className="pl-1 font-bold text-2xl"
                >
                  Github
                </a>
                , Or follow highlights and experiments on
                <a
                  href="https://www.instagram.com/jt.geldmeister/"
                  className="pl-1 font-bold text-2xl"
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
                sn.jittakan@gmail.com
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
        <div className="col-span-2 sx:col-span-6 smr:col-span-6 2xl:col-span-2 row-span-1 order-first z-10 bg-whiteY">
          <div className="hidden sx:block smr:block 2xl:hidden p-10 sx:p-6 smr:p-6 sm:p-6 md:p-6 lg:p-8 xl:p-9 2xl:p-10 text-right text-3xl sx:text-3xl smr:text-3xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-3xl 2xl:text-3xl">
            <span className="p-1 border-b-8  border-darkLGB">Contact</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Contact;
