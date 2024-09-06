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

    return (
        <>
            <div className=" px-4 text-gray-800 font-semibold py-2 rounded-t border-t border-r border-l -mb-px">
                    <hr
                    ref={activeTabLineRef}
                    className="bg-white px-4 text-gray-800 font-semibold py-2 rounded-t border-t border-r border-l -mb-px"
                />
                {
                    routes.map((route, i) => {
                        return (
                            <button
                                ref={i === defaultActiveIndex ? activeTabRef : null}
                                key={i}
                                className={
                                    "p-4 px-5 capitalize " +
                                    (inPageNavIndex === i
                                        ? "text-black border border-white rounded " // Active tab style
                                        : "text-dark-grey border border-transparent rounded") + // Non-active tab style
                                    (defaultHidden.includes(route) ? " md:hidden " : "")
                                }
                                onClick={(e) => { changePageState(e.target, i); }}
                            >
                                {route}
                            </button>
                         
                        );
                    })
                }

                {/* The active tab indicator line */}
              

            {/* Rendering children based on the current tab */}
            {Array.isArray(children) ? children[inPageNavIndex] : children}
        </>
    );
};

export default InPageNavigation;
