import LoadingSVG from "../assets/images/loading.svg";

const LoadingComponents = () => {
  return (
    <div className="absolute top-0 left-0 z-50 w-full h-screen centred bg-black/25">
      <img
        className="w-20 h-20 animate-spin"
        src={LoadingSVG}
        alt="Loading icon"
      ></img>
    </div>
  );
};

export default LoadingComponents;
