import Layout from "../components/Layout";

const About = () => {
  return (
    <>
      <Layout>
        <div className="size-full flex p-4 centred bg-primary text-secondary dark:bg-primaryDark dark:text-secondaryDark">
          <div className="centred w-full bg-primary-dark dark:bg-primaryDark-light py-8 rounded-lg">
            <h1 className="text-4xl font-bold">About</h1>
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
        </div>
      </Layout>
    </>
  );
};

export default About;
