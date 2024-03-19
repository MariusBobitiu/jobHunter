import Sidebar from "./Sidebar";
import PropTypes from "prop-types";

export default function Layout({ children }) {
  return (
    <main className="w-screen h-screen overflow-hidden bg-primary grid grid-cols-12">
      <div className="col-span-2 bg-tertiary">
        <Sidebar />
      </div>
      <div className="col-span-10 bg-primary">{children}</div>
    </main>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
