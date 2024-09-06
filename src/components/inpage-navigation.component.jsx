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

        activeTabLineRef.current.style.width = offsetWidth + "px";
        activeTabLineRef.current.style.left = offsetLeft + "px";

        setInPageNavIndex(i);
    };

    useEffect(() => {
        if (width > 766 && inPageNavIndex != defaultActiveIndex) {
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

    return (
        <>
            {/* Updated Navigation Bar */}
            <div className="relative mb-8 bg-white flex flex-nowrap overflow-x-auto justify-between space-x-2">

                {routes.map((route, i) => {
                    return (
                        <button
                            ref={i === defaultActiveIndex ? activeTabRef : null}
                            key={i}
                            className={`p-4 px-5 capitalize rounded-full transition-all duration-300 ease-in-out
                                ${inPageNavIndex === i
                                    ? "bg-blue-500 text-white font-bold"
                                    : "bg-gray-200 text-dark-grey hover:bg-blue-200"} 
                                ${defaultHidden.includes(route) ? " md:hidden " : " "}`}
                            onClick={(e) => { changePageState(e.target, i) }}
                        >
                            {route}
                        </button>
                    );
                })}

                {/* Active Tab Underline */}
                <hr ref={activeTabLineRef} className="absolute bottom-0 h-1 bg-blue-500 transition-all duration-300 ease-in-out" />
            </div>

            {/* Render Children based on the active tab */}
            {Array.isArray(children) ? children[inPageNavIndex] : children}
        </>
    );
};

export default InPageNavigation;
