import { useState, useRef, useEffect } from "react";

export let activeTabLineRef;
export let activeTabRef;

const InPageNavigation = ({ routes, defaultHidden = [], defaultActiveIndex = 0, children }) => {
  activeTabLineRef = useRef();
  activeTabRef = useRef();

  let [inPageNavIndex, setInPageNavIndex] = useState(null);
  let [isResizeEventAdded, setIsResizeEventAdded] = useState(false);
  let [width, setWidth] = useState(window.innerWidth);

  const changePageState = (btn, i) => {
    let { offsetWidth, offsetLeft } = btn;

    // Set the style properties with a smooth transition
    activeTabLineRef.current.style.width = offsetWidth + "px";
    activeTabLineRef.current.style.left = offsetLeft + "px";

    setInPageNavIndex(i);
  };

  useEffect(() => {
    if (width > 766 && inPageNavIndex !== defaultActiveIndex) {
      changePageState(activeTabRef.current, defaultActiveIndex);
    }

    if (!isResizeEventAdded) {
      window.addEventListener("resize", () => {
        if (!isResizeEventAdded) {
          setIsResizeEventAdded(true);
        }

        setWidth(window.innerWidth);
      });
    }
  }, [width]);

  useEffect(() => {
    // Ensure the initial position is set with the transition effect
    if (inPageNavIndex === null) {
      setInPageNavIndex(defaultActiveIndex);
      changePageState(activeTabRef.current, defaultActiveIndex);
    }
  }, [inPageNavIndex, defaultActiveIndex]);

  return (
    <>
      {/* Tab Container */}
      <div className="relative mb-8 border-b border-gray-200 flex flex-nowrap overflow-x-auto ">
        {routes.map((route, i) => {
          return (
            <button
              ref={i === defaultActiveIndex ? activeTabRef : null}
              key={i}
              className={
                "p-2 sm:p-3 md:p-4 px-4 sm:px-6 md:px-8 capitalize text-xs sm:text-sm md:text-base lg:text-lg transition-all duration-300 ease-in-out " +
                (inPageNavIndex === i
                  ? " text-black font-bold border border-gray-300 border-b-0"
                  : " text-gray-500 hover:text-gray-700 border-b-2 border-transparent") +
                (defaultHidden.includes(route) ? " md:hidden " : " ") +
                " rounded-md mx-1 sm:mx-2"
              }
              onClick={(e) => {
                changePageState(e.target, i);
              }}
            >
              {route}
            </button>
          );
        })}

        {/* Tab Indicator Line with smoother transitions */}
        <hr
          ref={activeTabLineRef}
          className="absolute bottom-0 duration-300 ease-in-out transition-all  "
        />
      </div>

      {/* Render children based on selected tab */}
      {Array.isArray(children) ? children[inPageNavIndex] : children}
    </>
  );
};

export default InPageNavigation;
