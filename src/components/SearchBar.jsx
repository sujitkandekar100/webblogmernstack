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
        <div className={`relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl ${className}`}>
            <input
                type="text"
                placeholder={placeholder}
                className="w-full bg-gray-100 p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 pl-10 sm:pl-12 md:pl-14 pr-12 sm:pr-14 rounded-xl placeholder:text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                onKeyDown={handleSearch}
            />
            {/* Search icon */}
            <i className="fi fi-rr-search absolute right-3 sm:right-5 top-1/2 transform -translate-y-1/2 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-500"></i>
        </div>
    );
};

export default SearchBar;
