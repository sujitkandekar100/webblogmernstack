import axios from "axios";
import { useEffect, useState } from "react";
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

    // Loading blogs based on selected category or switching to home on double-click
    const loadBlogByCategory = (category) => {
        setBlogs(null);
        setCategoryDropdownVisible(false);

        const lowerCaseCategory = category.toLowerCase();

        if (pageState === lowerCaseCategory) {
            // If the category is clicked twice, reset to home
            setPageState("home");
        } else {
            // Load the selected category's blogs
            setPageState(lowerCaseCategory);
        }
    };

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
            <div className="my-8 flex justify-center items-center gap-4 flex-wrap rounded-lg">
                <div className="relative w-full max-w-lg flex rounded-lg">
                    {/* Search Bar */}
                    <SearchBar />

                    <button
            className="bg-white p-3 rounded-lg border border-gray-300 flex items-center justify-center"
            onClick={() => setCategoryDropdownVisible(!categoryDropdownVisible)}
        >
            {/* Icon always visible */}
            <i className="fi fi-rr-list text-xl"></i>

            {/* Heading hidden on small screens */}
            <h6 className="ml-2 hidden sm:block">Filter</h6>
        </button>

                    {/* Dropdown for Categories */}
                    {categoryDropdownVisible && (
                        <div className="absolute top-full right-0 mt-2 w-full max-w-xs  border border-gray-300 rounded-lg shadow-lg z-10">
                            <div className="flex gap-3 flex-wrap p-2">
                                {categories.map((category, index) => {
                                    // Check if this category is selected
                                    const isActive = pageState === category.toLowerCase();

                                    return (
                                        <button
                                            key={index}
                                            className={`btn-light px-4 py-2 rounded-lg ${isActive ? "bg-black text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                                            onClick={() => loadBlogByCategory(category)}
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
                            fetchDataFun={pageState === "home" ? fetchLatestBlogs : fetchBlogsByCategory}
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
