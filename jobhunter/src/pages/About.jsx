import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GithubIcon from "@mui/icons-material/GitHub";
import EnvelopeIcon from "@mui/icons-material/Email";

const About = () => {
  const [aboutPage, setAboutPage] = useState(true);
  const [helpPage, setHelpPage] = useState(false);

  useEffect(() => {
    document.title = "About jobHunter";
  }, []);

  const openAboutPage = () => {
    setAboutPage(true);
    setHelpPage(false);
  };

  const openHelpPage = () => {
    setAboutPage(false);
    setHelpPage(true);
  };

  return (
    <>
      <Layout>
        <div className="w-full h-dvh flex flex-col gap-4 bg-primary text-secondary dark:bg-primaryDark dark:text-secondaryDark relative xsm:mt-28 sm:mt-32 lg:mt-0 lg:p-4">
          <div className="bg-primary-dark dark:bg-primaryDark-light py-8 rounded-lg w-full">
            <div className="flex justify-evenly items-center w-full h-full gap-4">
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
            </div>
          </div>

          {aboutPage && (
            <div className="w-full relative bg-primary-dark dark:bg-primaryDark-light p-4 rounded-lg text-secondary dark:text-secondaryDark overflow-y-auto xsm:mb-4 lg:mb-0">
              <div className="absolute top-2 right-2">
                <div className="bg-primary/60 dark:bg-primaryDark/50 py-2 px-4 rounded-xl font-black tracking-widest z-50">
                  v.1.0.0
                </div>
              </div>
              <div className="flex flex-col p-2">
                <h1 className="text-2xl font-bold mb-4 font-averia">
                  About jobHunter
                </h1>
                <p className="text-secondary dark:text-secondaryDark text-lg">
                  Hi, I&apos;m Marius and I built jobHunter!{" "}
                  <span role="img" aria-label="wave">
                    👋
                  </span>
                </p>
                <br />
                <p>
                  This might come as a surprise, but the jobHunter team is just
                  me! I do all of the design, development, and maintenance of
                  the app. I&apos;m a self-taught developer and I&apos;m always
                  looking for ways to improve my skills and learn new things.
                </p>
                <br />
                <p>
                  I built jobHunter because I wanted a tool to help me keep
                  track of my job applications and interviews. I hope you find
                  it useful too!
                </p>
                <br />
                <p>
                  I know how hard it can be to find a job, especially in this
                  year, 2024 as I am writing this, when the job market is so
                  competitive. I have been looking for jobs for a while and I
                  know how stressful it can be to keep track of all the
                  applications and where you are in the process. jobHunter is
                  here to help you with that! You can keep track of all your
                  applications in one place and see where you are in the
                  process, as well as visualize through charts and graphs how
                  many applications you have sent and how many interviews you
                  have had.
                </p>
                <br />
                <p>
                  My hope is that this app will improve your life and help you
                  find the job of your dreams.
                </p>
                <br />
                <p>
                  Feel free to reach out to me or follow me on social media.
                  I&apos;d love to hear from you!
                </p>
                <br />
                <p>- Marius</p>
              </div>
              <div className="flex justify-center items-center gap-4 mt-4">
                <a
                  href="http://www.linkedin.com/in/marius-bobitiu"
                  className="font-bold text-xl py-2 px-4 bg-primary/60 dark:bg-primaryDark/50 rounded-lg"
                >
                  <LinkedInIcon fontSize="large" className="mb-1 mr-1" />
                  \in\marius-bobitiu
                </a>
                <a
                  href="http://www.github.com/MariusBobitiu"
                  className="font-bold text-xl py-2 px-4 bg-primary/60 dark:bg-primaryDark/50 rounded-lg"
                >
                  <GithubIcon fontSize="large" className="mb-1 mr-1" />
                  \MariusBobitiu
                </a>
                <a
                  href="mailto:marius@mariusbobitiu.dev"
                  className="font-bold text-xl py-2 px-4 bg-primary/60 dark:bg-primaryDark/50 rounded-lg"
                >
                  <EnvelopeIcon fontSize="large" className="mb-1 mr-1" />
                  Say Hi{" "}
                  <span role="img" aria-label="wave">
                    👋
                  </span>
                </a>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold mb-4 font-averia">
                  Tech Stack
                </h1>
                <div className="flex justify-center items-center gap-4 flex-wrap">
                  <img
                    src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white"
                    alt="React"
                  />
                  <img
                    src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white"
                    alt="Redux"
                  />
                  <img
                    src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"
                    alt="Node.js"
                  />
                  <img
                    src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"
                    alt="npm"
                  />
                  <img
                    src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"
                    alt="Express"
                  />
                  <img
                    src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white"
                    alt="PostgreSQL"
                  />
                  <img
                    src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"
                    alt="Tailwind CSS"
                  />
                  <img
                    src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white"
                    alt="VS Code"
                  />
                  <img
                    src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"
                    alt="GitHub"
                  />
                  <img
                    src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"
                    alt="Figma"
                  />
                </div>
                <h3 className="text-lg font-bold">
                  Thank you to all the developers who have contributed to these
                  amazing tools and libraries!{" "}
                </h3>
                <div className="flex justify-center items-center gap-4 flex-wrap">
                  <img
                    src="https://img.shields.io/badge/chart.js-FF6384?style=for-the-badge&logo=chart.js&logoColor=white"
                    alt="chart.js"
                  />
                  <img
                    src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"
                    alt="React Router"
                  />
                  <img
                    src="https://img.shields.io/badge/mui-0081CB?style=for-the-badge&logo=material-ui&logoColor=white"
                    alt="Material-UI"
                  />
                  <img
                    src="https://img.shields.io/badge/mui-icons-0081CB?style=for-the-badge&logo=material-ui&logoColor=white"
                    alt="Material-UI Icons"
                  />
                  <img
                    src="https://img.shields.io/badge/react_tailwind_datepicker-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"
                    alt="React Datepicker"
                  />
                  <img
                    src="https://img.shields.io/badge/jwt.io-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white"
                    alt="JWT.io"
                  />
                  <img
                    src="https://img.shields.io/badge/redux_persist-764ABC?style=for-the-badge&logo=redux&logoColor=white"
                    alt="Redux Persist"
                  />
                  <img
                    src="https://img.shields.io/badge/sequelize-3997D8?style=for-the-badge&logo=sequelize&logoColor=white"
                    alt="Sequelize"
                  />
                  <img
                    src="https://img.shields.io/badge/luxon-FF6872?style=for-the-badge&logo=luxon&logoColor=white"
                    alt="Luxon"
                  />
                </div>
              </div>
              <div className="flex flex-col mt-4">
                <h3 className="text-2xl font-bold mb-4 font-averia">
                  Features
                </h3>
                <ul className="list-disc list-inside">
                  <li>Sign up and log in to your account</li>
                  <li>
                    Add, edit, and delete job applications with details like
                    company name, job title, and application status
                  </li>
                  <li>
                    View your applications and their status in a table format,
                    with the ability to sort by column, and quickly update the
                    status of an application
                  </li>
                  <li>
                    Visualize your applications and interviews with charts and
                    graphs
                  </li>
                  <li>Dark mode</li>
                </ul>
              </div>
              <div className="flex flex-col mt-4">
                <h3 className="text-2xl font-bold mb-4 font-averia">
                  Future Features
                </h3>
                <p>
                  If you have any suggestions for features you&apos;d like to
                  see in jobHunter, please reach out to me at the email address
                  below!
                </p>
                <p className="italic">
                  <a
                    href="mailto:jobHunter@mariusbobitiu.dev"
                    className="text-accent font-bold dark:text-accentDark"
                  >
                    jobHunter@mariusbobitiu.dev
                  </a>
                </p>
              </div>
            </div>
          )}
          {helpPage && (
            <div className="w-full text-secondary dark:text-secondaryDark bg-primary dark:bg-primaryDark-light p-4 rounded-lg flex flex-col gap-2 xsm:mb-4 lg:mb-0">
              <h1 className="text-2xl text-secondary dark:text-secondaryDark font-bold mb-4">
                Help & Support
              </h1>
              <p>
                I&apos;m here to help! If you have any questions or need
                assistance, please don&apos;t hesitate to reach out.
              </p>
              <br />
              <p className="text-xl font-bold text-secondary-dark dark:text-secondaryDark-light">
                Feature Requests & Bug Reports
              </p>
              <p>
                If you have any feature requests or bug reports, please use the
                link below to submit an issue on Github.
              </p>
              <a
                href="https://jobhunter.featurebase.app"
                className="text-accent text-lg font-bold dark:text-accentDark tracking-wider py-2 px-6 rounded-lg bg-primary/60 dark:bg-primaryDark/50 hover:bg-primary/50 dark:hover:bg-primaryDark/50"
                target="_blank"
              >
                Submit a Feature Request or Bug Report
              </a>
              <p className="text-xl font-bold mt-4 text-secondary-dark dark:text-secondaryDark-light">
                Add Feedback on Featurebase
              </p>
              <p>
                Easy access to the latest features and updates on jobHunter. Add
                your feedback and upvote features you&apos;d like to see in the
                app.
              </p>
              <p>
                Also, you can see what features are planned, in progress, and
                completed. You can also see what bugs are known and what bugs
                have been fixed.
              </p>
              <div className="w-full flex gap-2 px-6 py-2">
                <img
                  src="https://i.postimg.cc/Jhjnk466/image.png"
                  alt="Add Feedback on Featurebase"
                  className="bg-cover bg-center w-1/2"
                />
                <img
                  src="https://i.postimg.cc/MGZdfhHB/image.png"
                  alt="Add Feedback on Featurebase"
                  className="bg-cover bg-center w-1/2"
                />
              </div>
              <p className="text-xl font-bold text-secondary-dark dark:text-secondaryDark-light">
                For Developers
              </p>
              <p>
                If you are a developer and would like to contribute to the
                project, please visit the Github repository below.
              </p>
              <a
                href="https://www.github.com/MariusBobitiu/jobHunter"
                className="text-accent text-lg tracking-wider font-bold dark:text-accentDark py-2 px-6 rounded-lg bg-primary/60 dark:bg-primaryDark/50 hover:bg-primary/50 dark:hover:bg-primaryDark/50 mb-4"
                target="_blank"
              >
                Github Repository
              </a>
              <p>
                GitHub Issues are a great way to get involved with the project.
              </p>
              <div className="flex gap-2 items-center justify-between py-2 bg-primary-dark/60 dark:bg-primaryDark/50 px-6 rounded-lg">
                <p className="text-lg font-bold text-secondary-dark dark:text-secondaryDark-light">
                  GitHub Issues
                </p>
                <img
                  src="https://img.shields.io/github/issues/MariusBobitiu/jobHunter?style=for-the-badge"
                  alt="GitHub Issues"
                />
              </div>
              <p className="">
                If you wish to contact me directly, please use the email address
                below.
              </p>
              <a
                href="mailto:jobHunter@mariusbobitiu.dev"
                className="text-accent font-bold dark:text-accentDark text-lg tracking-wider py-2 px-6 rounded-lg bg-primary/60 dark:bg-primaryDark/50 hover:bg-primary/50 dark:hover:bg-primaryDark/50"
              >
                jobHunter@mariusbobitiu.dev
              </a>
              <p className="italic text-sm">
                I will do my best to respond to your email{" "}
                <b>as soon as possible.</b>
                {""}
                Thank you for using jobHunter!
              </p>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default About;
