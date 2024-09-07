import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mocked categories or tags
const categories = [
  "Programming", "Hollywood", "Film Making", "Social Media", "Cooking", "Tech", "Finance", "Travel"
];

const SearchBar = ({ placeholder = "Search", className = "", onCategorySearch }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    // Handle input change and filter suggestions
    const handleInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filter categories based on query
        if (query.length > 0) {
            const filteredSuggestions = categories.filter(category => 
                category.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    // Handle selecting a suggestion or pressing Enter
    const handleSearch = (e) => {
        if (e.keyCode === 13 && searchQuery.length) {
            // Trigger search with both category and search term
            onCategorySearch(searchQuery);
            navigate(`/search/${searchQuery}`);
            setSuggestions([]); // Clear suggestions after search
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        onCategorySearch(suggestion); // Pass selected category to the parent
        navigate(`/search/${suggestion}`);
        setSuggestions([]); // Clear suggestions after selection
    };

    return (
        <div className={`relative w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-4xl ${className}`}>
            <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleSearch}
                placeholder={placeholder}
                className="w-full bg-gray-100 p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 pl-10 sm:pl-12 md:pl-14 pr-12 sm:pr-14 rounded-xl placeholder:text-gray-500 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            />
            {/* Search Icon */}
            <i className="fi fi-rr-search absolute right-3 sm:right-5 top-1/2 transform -translate-y-1/2 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-500"></i>

            {/* Autocomplete Suggestions */}
            {suggestions.length > 0 && (
                <ul className="absolute top-full left-0 w-full  border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg z-10">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
