import { useEffect, useRef, useState } from "react";
import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
import NoDataMessage from "../components/nodata.component";
import LoadMoreDataBtn from "../components/load-more.component";
import SearchBar from "../components/SearchBar";
import { activeTabRef } from "../components/inpage-navigation.component";
import { filterPaginationData } from "../common/filter-pagination-data";

const HomePage = () => {
    const [blogs, setBlogs] = useState(null);
    const [trendingBlogs, setTrendingBlogs] = useState(null);
    const [pageState, setPageState] = useState("home");
    const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
    const dropdownRef = useRef(null); // Create ref for dropdown

    // Categories for filtering blogs
    const categories = [
        "Programming", "Hollywood", "Film Making", "Social Media", "Cooking", "Tech", "Finance", "Travel"
    ];

    // Fetching the latest blogs
    const fetchLatestBlogs = ({ page = 1 }) => {
        axios
            .post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs", { page })
            .then(async ({ data }) => {
                let formattedData = await filterPaginationData({
                    state: blogs,
                    data: data.blogs,
                    page,
                    countRoute: "/all-latest-blogs-count"
                });
                setBlogs(formattedData);
            })
            .catch((err) => console.log(err));
    };

    // Fetching blogs by category
    const fetchBlogsByCategory = ({ page = 1 }) => {
        axios
            .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { tag: pageState, page })
            .then(async ({ data }) => {
                let formattedData = await filterPaginationData({
                    state: blogs,
                    data: data.blogs,
                    page,
                    countRoute: "/search-blogs-count",
                    data_to_send: { tag: pageState }
                });
                setBlogs(formattedData);
            })
            .catch((err) => console.log(err));
    };

    // Fetching trending blogs
    const fetchTrendingBlogs = () => {
        axios
            .get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
            .then(({ data }) => setTrendingBlogs(data.blogs))
            .catch((err) => console.log(err));
    };

    // Loading blogs based on selected category
    const loadBlogByCategory = (category) => {
        setBlogs(null);
        setCategoryDropdownVisible(false);

        // Toggle category selection, if already selected, return to home
        if (pageState === category.toLowerCase()) {
            setPageState("home");
        } else {
            setPageState(category.toLowerCase());
        }
    };

    // Click outside handler for closing the dropdown
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setCategoryDropdownVisible(false); // Close dropdown when clicking outside
        }
    };

    // Adding event listener for click outside
    useEffect(() => {
        if (categoryDropdownVisible) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [categoryDropdownVisible]);

    // Fetch data on initial mount or when pageState changes
    useEffect(() => {
        activeTabRef.current.click();
        if (pageState === "home") {
            fetchLatestBlogs({ page: 1 });
        } else {
            fetchBlogsByCategory({ page: 1 });
        }
        if (!trendingBlogs) fetchTrendingBlogs();
    }, [pageState]);

    return (
        <AnimationWrapper>
            {/* Page Title */}
            <div className="text-center font-bold block mt-12 leading-tight">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Discover What AI</h1>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Can Do?</h1>
            </div>

            {/* Search and Filter Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center my-10 gap-4 px-5 md:px-10">
                {/* Search Bar with category search functionality */}
                <SearchBar
                    placeholder="Search by title, tags, or category..."
                    onCategorySearch={loadBlogByCategory} // Passing the category search handler
                    className="max-w-xs sm:max-w-md lg:max-w-xl xl:max-w-2xl"
                />
                {/* Category Dropdown (existing code) */}
                <div className="relative">
                    <div
                        className="relative flex justify-center items-center bg-gray-100 rounded-lg cursor-pointer text-sm sm:text-base text-gray-800 select-none px-5 py-3 focus:outline-none hover:bg-gray-200 transition-all duration-300"
                        onClick={() => setCategoryDropdownVisible(!categoryDropdownVisible)}
                    >
                        <i className="fi fi-rr-interlining leading-none mr-2" />
                        Category
                        <i className="fi fi-rr-angle-small-down leading-none ml-2" />
                    </div>

                    {categoryDropdownVisible && (
                        <div
                            ref={dropdownRef}
                            className="absolute left-0 z-10 mt-2 bg-white rounded-lg shadow-md overflow-hidden border border-gray-300 w-40"
                        >
                            <ul className="max-h-60 overflow-y-auto">
                                {categories.map((category, index) => (
                                    <li
                                        key={index}
                                        onClick={() => loadBlogByCategory(category)}
                                        className={`p-3 text-sm sm:text-base text-gray-800 cursor-pointer select-none hover:bg-gray-100 ${
                                            pageState === category.toLowerCase() ? "bg-gray-200" : ""
                                        }`}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Trending Blogs */}
            <div className="mt-10">
                <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-semibold">Trending Blogs</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 md:px-10">
                    {!trendingBlogs && <Loader />}
                    {trendingBlogs && trendingBlogs.length > 0 ? (
                        trendingBlogs.map((blog, index) => (
                            <MinimalBlogPost key={index} blog={blog} />
                        ))
                    ) : (
                        <NoDataMessage message="No trending blogs available." />
                    )}
                </div>
            </div>

            {/* Blog Posts Section */}
            <div className="mt-10">
                <div className="text-center mb-6">
                    <h2 className="text-2xl sm:text-3xl font-semibold">{pageState === "home" ? "Latest Blogs" : "Blogs in " + pageState}</h2>
                </div>

                {/* Blog Post Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 md:px-10">
                    {!blogs && <Loader />}
                    {blogs && blogs.length > 0 ? (
                        blogs.map((blog, index) => (
                            <BlogPostCard key={index} blog={blog} />
                        ))
                    ) : (
                        <NoDataMessage message="No blogs found." />
                    )}
                </div>
            </div>

            {/* Load More Button */}
            <div className="mt-10 text-center">
                {blogs && blogs.length > 0 && (
                    <LoadMoreDataBtn
                        onClick={() => {
                            if (pageState === "home") {
                                fetchLatestBlogs({ page: blogs.length / 12 + 1 });
                            } else {
                                fetchBlogsByCategory({ page: blogs.length / 12 + 1 });
                            }
                        }}
                    />
                )}
            </div>
        </AnimationWrapper>
    );
};

export default HomePage;
