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
        <div className={`relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-6xl ${className}`}>
            <input
                type="text"
                placeholder={placeholder}
                className="w-full bg-grey p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6 pl-4 sm:pl-6 md:pl-8 pr-10 sm:pr-12 rounded-xl placeholder:text-dark-grey text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                onKeyDown={handleSearch}
            />
            <i className="fi fi-rr-search absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-dark-grey"></i>
        </div>
    );
};

export default SearchBar;
