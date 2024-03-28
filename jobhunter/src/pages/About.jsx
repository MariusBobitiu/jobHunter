import { useState } from "react";
import Layout from "../components/Layout";

const About = () => {
  const [aboutPage, setAboutPage] = useState(true);
  const [helpPage, setHelpPage] = useState(false);
  const [contactPage, setContactPage] = useState(false);

  const openAboutPage = () => {
    setAboutPage(true);
    setHelpPage(false);
    setContactPage(false);
  };

  const openHelpPage = () => {
    setAboutPage(false);
    setHelpPage(true);
    setContactPage(false);
  };

  const openContactPage = () => {
    setAboutPage(false);
    setHelpPage(false);
    setContactPage(true);
  };

  return (
    <>
      <Layout>
        <div className="size-full flex p-4 centred bg-primary text-secondary dark:bg-primaryDark dark:text-secondaryDark relative">
          <div className="absolute top-0 left-0 z-20 w-full bg-primary-dark dark:bg-primaryDark-light py-8 rounded-lg">
            <div className="flex justify-evenly items-center w-full gap-4">
              <button
                className="text-xl text-secondary dark:text-secondaryDark font-bold hover:text-secondary-dark dark:hover:text-secondaryDark-dark"
                onClick={openAboutPage}
              >
                About this project
              </button>
              <button
                className="text-lg text-secondary dark:text-secondaryDark font-bold hover:text-secondary-dark dark:hover:text-secondaryDark-dark"
                onClick={openHelpPage}
              >
                Help & Support
              </button>
              <button
                className="text-lg text-secondary dark:text-secondaryDark font-bold hover:text-secondary-dark dark:hover:text-secondaryDark-dark"
                onClick={openContactPage}
              >
                Contact
              </button>
            </div>
          </div>
          <small className="absolute bottom-2 right-4">
            <p className="text-secondary text-center dark:text-secondaryDark-dark">
              &copy; Made with 💖 by
              <a
                href="http://www.linkedin.com/in/marius-bobitiu"
                className="text-accent font-bold dark:text-accentDark"
              >
                {" "}
                Marius Bobitiu.
              </a>{" "}
              All rights reserved.
            </p>
          </small>
          {aboutPage && (
            <div className="bg-primary dark:bg-primaryDark-light p-4 rounded-lg">
              <h1 className="text-2xl text-secondary dark:text-secondaryDark font-bold">
                About this project
              </h1>
              <p className="text-secondary dark:text-secondaryDark">
                This project is a job hunting platform that allows users to
                search for jobs based on their location and job title. The
                project is built using React, Tailwind CSS, and the GitHub Jobs
                API.
              </p>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default About;
