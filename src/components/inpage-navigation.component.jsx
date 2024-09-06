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
        <div className="p-8">
            {/* Horizontal Tab Navigation */}
            <ul className="grid grid-flow-col text-center text-gray-500 p-1">
                {routes.map((route, i) => (
                    <li key={i}>
                        <a
                            href={`#${route}`}
                            ref={i === defaultActiveIndex ? activeTabRef : null}
                            className={`flex justify-center py-4 transition-all duration-300 ease-in-out
                                ${inPageNavIndex === i
                                    ? "bg-white border-l border-t border-r border-gray-100 rounded-tl-lg rounded-tr-lg text-black"
                                    : "hover:bg-gray-100"} `}
                            onClick={(e) => {
                                e.preventDefault();
                                changePageState(e.target, i);
                            }}
                        >
                            {route}
                        </a>
                    </li>
                ))}
            </ul>

            {/* Content Box Below Navigation */}
            <div className="bg-white shadow border border-gray-100 p-8 text-gray-700 rounded-lg -mt-2">
                {Array.isArray(children) ? children[inPageNavIndex] : children}
            </div>
        </div>
    );
};

export default InPageNavigation;
