import notFound from "../assets/images/404.jpg";

const NotFound = () => {
  return (
    <div className="flex justify-center mt-20">
      <img className="w-[50%]" src={notFound} alt="Not Found" />
    </div>
  );
};

export default NotFound;
