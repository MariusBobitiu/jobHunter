import Sidebar from "./page/Sidebar";
import PropTypes from "prop-types";

export default function Layout({ children }) {
  return (
    <main className="w-full overflow-hidden bg-primary dark:bg-primaryDark xsm:flex xsm:flex-col lg:grid lg:grid-cols-12">
      <div className="xsm:fixed xsm:top-0 xsm:left-0 xsm:z-20 xsm:w-full lg:relative lg:col-span-2 bg-tertiary">
        <Sidebar />
      </div>
      <div className="lg:col-span-10 h-dvh bg-primary dark:bg-primaryDark">
        {children}
      </div>
    </main>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
