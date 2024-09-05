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
        <div className={`relative ${className}`}>
            <input
                type="text"
                placeholder={placeholder}
                className="w-full bg-grey p-4 pl-6 pr-12 rounded-lg placeholder:text-dark-grey"
                onKeyDown={handleSearch}
            />
            <i className="fi fi-rr-search absolute right-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
        </div>
    );
};

export default SearchBar;
