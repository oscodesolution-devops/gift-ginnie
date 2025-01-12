import { useLocation, useNavigate } from "react-router-dom";

export default function Breadcrumbs() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const pathSegments = location.pathname.split("/").filter(Boolean); // Remove any empty segments

  return (
    <div className="w-full mb-16 md:mb-20">
      <div className="text-gray-500 font-medium">
        <span
          onClick={() => navigate("/")}
          className="cursor-pointer text-gray-500 hover:underline"
        >
          Home
        </span>
        {pathSegments.length > 0 &&
          pathSegments.map((item, index) => (
            <span key={index}>
              {" "}
              /<span className="text-gray-500">{item}</span>
            </span>
          ))}
      </div>
    </div>
  );
}
