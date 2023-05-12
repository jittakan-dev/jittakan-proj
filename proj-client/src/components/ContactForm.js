import React, { useState } from "react";

const ContactForm = () => {
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setAlert(false);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clearMessage = (e) => {
    setFormData({
      ...formData,
      message: "",
    });
  };

  const clearForm = (e) => {
    setFormData({
      ...formData,
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleSubmit = (e) => {
    e.stopPropagation();
    if (
      formData.name === "" ||
      formData.name === null ||
      formData.email === "" ||
      formData.email === null
    ) {
      return;
    }

    setLoading(true);

    fetch("/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...formData,
        message:
          "Sender :" +
          formData.name +
          " Email :" +
          formData.email +
          " Message :" +
          formData.message,
      }),
    })
      .then((response) => {
        setAlert(true);
        clearForm();
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col w-full h-auto justify-center items-center bg-whiteG">
      <div className="w-full p-10 pb-6 text-2xl border-b-3 border-darkLGB bg-lightGB text-white">
        <p className="pl-2  mb-5 md:mb-4 lg:mb-4 text-3xl sx:text-1.5xl smr:text-1.5xl sm:text-1.5xl md:text-2xl mdh:text-2xl lg:text-2xl lgh:text-2xl xl:text-2xl 2xl:text-3xl border-l-8 border-yellow-400">
          Send message to me.
        </p>
      </div>
      <div className="w-full p-10 sx:p-6 smr:p-6 sm:p-6 md:p-6 lg:p-8 xl:p-8 2xl:p-10">
        <div className="mb-4">
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            onFocus={(e) => setAlert(false)}
            placeholder="Please enter your name here."
            value={formData.name}
            id="name"
            name="name"
            className="w-full p-3 sx:p-2 smr:p-2 sm:p-2 md:p-2 lg:p-3 xl:p-3 2xl:p-3 text-left  text-darkLGB placeholder-darkLGB border-3 border-darkLGB bg-whiteY focus:outline-none focus:ring-1 focus:ring-darkLGB"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            onChange={(e) => handleChange(e)}
            onFocus={(e) => setAlert(false)}
            placeholder="Then your email is in this box."
            value={formData.email}
            id="email"
            name="email"
            className="w-full p-3 sx:p-2 smr:p-2 sm:p-2 md:p-2 lg:p-3 xl:p-3 2xl:p-3 text-left text-darkLGB placeholder-darkLGB border-3 border-darkLGB bg-whiteY focus:outline-none focus:ring-1 focus:ring-darkLGB"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            onFocus={(e) => setAlert(false)}
            placeholder="Your subject is here."
            value={formData.subject}
            id="subject"
            name="subject"
            className="w-full p-3 sx:p-2 smr:p-2 sm:p-2 md:p-2 lg:p-3 xl:p-3 2xl:p-3 text-left text-darkLGB placeholder-darkLGB border-3 border-darkLGB bg-whiteY focus:outline-none focus:ring-1 focus:ring-darkLGB"
          />
        </div>
        <div className="mb-4">
          <textarea
            onChange={(e) => handleChange(e)}
            onFocus={(e) => setAlert(false)}
            rows="2"
            placeholder="Finally, your message."
            value={formData.message}
            id="message"
            name="message"
            className="w-full p-4 sx:p-2 smr:p-2 sm:p-2 md:p-2 lg:p-3 xl:p-3 2xl:p-4 text-left text-darkLGB placeholder-darkLGB border-3 border-darkLGB bg-whiteY focus:outline-none focus:ring-1 focus:ring-darkLGB"
          />
        </div>
        <div className="grid grid-cols-3 mt-4 text-lg sx:text-base smr:text-lg sm:text-base 2xl:text-lg text-white">
          <button
            type="reset"
            onClick={clearForm}
            className="p-3 sx:p-2 smr:p-2 sm:p-2 md:p-2 lg:p-3 xl:p-3 2xl:p-3 mr-1 self-start bg-darkLGB hover:bg-rose-700"
          >
            Clear All Form
          </button>
          <button
            type="reset"
            onClick={clearMessage}
            className="p-3 sx:p-2 smr:p-2 sm:p-2 md:p-2 lg:p-3 xl:p-3 2xl:p-3 mr-1 bg-darkLGB hover:bg-rose-700"
          >
            Clear Message
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="p-3 sx:p-2 smr:p-2 sm:p-2 md:p-2 lg:p-3 xl:p-3 2xl:p-3 bg-lime-600 hover:bg-lime-500 hover:text-darkLGB"
          >
            Submit
          </button>
        </div>
        {loading && (
          <div className="w-full mt-4 p-6 text-2xl text-center text-red-500 bg-darkLGB">
            Loading...
          </div>
        )}
        <div
          className="w-full mt-4 p-6 text-2xl text-center text-red-500 bg-darkLGB"
          style={{
            display: alert ? "block" : "none",
          }}
        >
          Your message is send :D
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
