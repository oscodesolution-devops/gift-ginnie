import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex justify-center items-center relative">
      <button
        onClick={() => navigate("/")}
        className="uppercase px-32 font-semibold py-4 bg-primaryDark text-primary dark:bg-white dark:text-black"
      >
        Home
      </button>
      {/* <svg
        className="framer-1peputy absolute bg-red-500"
        data-framer-component-type="RichTextContainer"
        viewBox="0 0 362 169"
        style={{
          outline: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          flexShrink: 0,
          opacity: 0.02,
          transform: "translate(-50%, -50%)",
        }}
      >
        <foreignObject
          width="100%"
          height="100%"
          className="framer-fit-text"
          transform="scale(1)"
          style={{ overflow: "visible", transformOrigin: "center center" }}
        >
          <p
            className="framer-text"
            style={{
              "--font-selector": "SW50ZXItQmxhY2s=",
              "--framer-font-size": "168.82357688367594px",
              "--framer-font-weight": "900",
              "--framer-letter-spacing": "1px",
              "--framer-line-height": "1em",
              "--framer-text-color":
                "var(--token-ad4d2a8b-0add-4634-8710-f4704da278ff, rgb(13, 13, 13))",
            }}
          >
            404
          </p>
        </foreignObject>
      </svg> */}
    </div>
  );
}
