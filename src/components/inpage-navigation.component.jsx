import { useState, useRef, useEffect } from "react";

export let activeTabLineRef;
export let activeTabRef;

const InPageNavigation = ({ routes, defaultHidden = [], defaultActiveIndex = 0, children }) => {

    activeTabLineRef = useRef();
    activeTabRef = useRef();

    let [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex);
    let [isResizeEventAdded, setIsResizeEventAdded] = useState(false);
    let [width, setWidth] = useState(window.innerWidth);

    // Function to change page state and active tab's appearance
    const changePageState = (btn, i) => {
        let { offsetWidth, offsetLeft } = btn;

        activeTabLineRef.current.style.width = offsetWidth + "px";
        activeTabLineRef.current.style.left = offsetLeft + "px";

        setInPageNavIndex(i); // Set active tab index
    };

    // Effect to handle the initial state and window resizing
    useEffect(() => {
        // Set the default active tab on component mount
        if (width > 766 && inPageNavIndex !== defaultActiveIndex) {
            changePageState(activeTabRef.current, defaultActiveIndex);
        }

        // Add resize event listener
        if (!isResizeEventAdded) {
            window.addEventListener('resize', () => {
                if (!isResizeEventAdded) {
                    setIsResizeEventAdded(true);
                }
                setWidth(window.innerWidth);
            });
        }
    }, [width]);

    return (
        <>
            <div className="relative mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
                {/* Render each route as a tab */}
                {routes.map((route, i) => {
                    return (
                        <button
                            ref={i === defaultActiveIndex ? activeTabRef : null} // Assign ref to the default active tab
                            key={i}
                            className={
                                "p-4 px-5 capitalize " +
                                (inPageNavIndex === i ? "text-black " : "text-dark-grey ") + // Highlight active tab
                                (defaultHidden.includes(route) ? " md:hidden " : "")
                            }
                            onClick={(e) => {
                                changePageState(e.target, i);
                            }}
                        >
                            {route}
                        </button>
                    );
                })}

                {/* Active tab underline */}
                <hr
                    ref={activeTabLineRef}
                    className="absolute bottom-0 duration-300 border-black"
                    style={{
                        transitionProperty: "width, left", // Smooth transitions for the underline
                        borderBottomWidth: "2px"
                    }}
                />
            </div>

            {/* Render corresponding content based on active tab */}
            {Array.isArray(children) ? children[inPageNavIndex] : children}
        </>
    );
};

export default InPageNavigation;
