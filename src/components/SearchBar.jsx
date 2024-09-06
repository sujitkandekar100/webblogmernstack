import { useNavigate } from "react-router-dom";

const SearchBar = ({ placeholder = "Search", className = "" }) => {
    const navigate = useNavigate();

    const handleSearch = (e) => {
        let query = e.target.value;

        if (e.keyCode === 13 && query.length) {
            navigate(`/search/${query}`);
        }
    };

    return (
        <div className={`relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl ${className}`}>
            <input
                type="text"
                placeholder={placeholder}
                className="w-full bg-gray-100 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 pl-10 sm:pl-12 md:pl-14 pr-12 sm:pr-14 rounded-xl placeholder:text-gray-500 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                onKeyDown={handleSearch}
            />
            {/* Search icon */}
            <i className="fi fi-rr-search absolute right-3 sm:right-5 top-1/2 transform -translate-y-1/2 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-500"></i>
        </div>
    );
};

export default SearchBar;
