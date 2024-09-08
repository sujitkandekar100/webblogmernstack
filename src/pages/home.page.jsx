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
    const [selectedCategory, setSelectedCategory] = useState(null); // Single category
    const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    // Categories for filtering blogs
    const categories = [
        "Programming", "Hollywood", "Film Making", "Social Media", "Cooking", "Tech", "Finance", "Travel"
    ];

    // Fetching blogs based on search query and/or selected category
    const fetchBlogs = ({ page = 1 }) => {
        const params = {
            tag: pageState,
            category: selectedCategory, // Only one category
            page
        };

        axios
            .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", params)
            .then(async ({ data }) => {
                let formattedData = await filterPaginationData({
                    state: blogs,
                    data: data.blogs,
                    page,
                    countRoute: "/search-blogs-count",
                    data_to_send: params
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

    // Search bar handler: Set pageState to the search query or category
    const handleSearch = (query) => {
        setPageState(query.toLowerCase());
    };

    // Handle single category selection
    const selectCategory = (category) => {
        const lowerCategory = category.toLowerCase();
        setSelectedCategory(prevState =>
            prevState === lowerCategory ? null : lowerCategory // Deselect if already selected
        );
    };

    // Effect to load data when pageState or selectedCategory change
    useEffect(() => {
        if (pageState === "home") {
            fetchBlogs({ page: 1 });
        } else {
            fetchBlogs({ page: 1 });
        }

        if (!trendingBlogs) fetchTrendingBlogs();
    }, [pageState, selectedCategory]);

    return (
        <AnimationWrapper>
            {/* Page Title */}
            <div className="text-center font-bold block mt-12 leading-tight">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Discover What AI</h1>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Can Do?</h1>
            </div>

            {/* Search and Filter Section */}
            <div className="my-8 flex justify-center items-center gap-4 flex-wrap rounded-lg">
                <div className="relative w-full max-w-lg flex rounded-lg">
                    {/* Search Bar */}
                    <SearchBar onCategorySearch={handleSearch} />

                    {/* Filter Button */}
                    <button
                        className="bg-white p-3 rounded-lg border border-gray-300 flex items-center justify-center"
                        onClick={() => setCategoryDropdownVisible(!categoryDropdownVisible)}
                    >
                        <i className="fi fi-rr-list text-xl"></i>
                        <h6 className="ml-2 hidden sm:block">Filter</h6>
                    </button>

                    {/* Dropdown for Categories */}
                    {categoryDropdownVisible && (
                        <div ref={dropdownRef} className="absolute top-full right-0 mt-2 w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                            <div className="flex gap-3 flex-wrap p-2">
                                {categories.map((category, index) => {
                                    const isActive = selectedCategory === category.toLowerCase();
                                    return (
                                        <button
                                            key={index}
                                            className={`btn-light px-4 py-2 rounded-lg ${isActive ? "bg-black text-white" : "hover:bg-gray-50"}`}
                                            onClick={() => selectCategory(category)}
                                        >
                                            {category}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Blog Content Section */}
            <section className="flex flex-col gap-10">
                {/* Latest Blogs and Trending Blogs */}
                <InPageNavigation routes={[pageState, "trending blogs"]}>
                    <div className="flex gap-3 flex-wrap">
                        {/* Latest Blogs */}
                        {blogs === null ? (
                            <Loader />
                        ) : blogs.results.length ? (
                            blogs.results.map((blog, i) => (
                                <AnimationWrapper
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    key={i}
                                >
                                    <BlogPostCard content={blog} author={blog.author.personal_info} />
                                </AnimationWrapper>
                            ))
                        ) : (
                            <NoDataMessage message="No blogs published" />
                        )}
                        <LoadMoreDataBtn
                            state={blogs}
                            fetchDataFun={fetchBlogs}
                        />
                    </div>

                    {/* Trending Blogs */}
                    <div className="w-full">
                        {trendingBlogs === null ? (
                            <Loader />
                        ) : trendingBlogs.length ? (
                            trendingBlogs.map((blog, i) => (
                                <AnimationWrapper
                                    transition={{ duration: 1, delay: i * 0.1 }}
                                    key={i}
                                >
                                    <MinimalBlogPost blog={blog} index={i} />
                                </AnimationWrapper>
                            ))
                        ) : (
                            <NoDataMessage message="No trending blogs" />
                        )}
                    </div>
                </InPageNavigation>
            </section>
        </AnimationWrapper>
    );
};

export default HomePage;
