import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/inpage-navigation.component";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPost from "../components/nobanner-blog-post.component";
import { activeTabRef } from "../components/inpage-navigation.component";
import NoDataMessage from "../components/nodata.component";
import { filterPaginationData } from "../common/filter-pagination-data";
import LoadMoreDataBtn from "../components/load-more.component";

const HomePage = () => {
    const [blogs, setBlog] = useState(null);
    const [trendingBlogs, setTrendingBlog] = useState(null);
    const [pageState, setPageState] = useState("home");
    const [searchBoxVisibility, setSearchBoxVisibility] = useState(false); // Added search box visibility state

    const categories = [
        "programming",
        "hollywood",
        "film making",
        "social media",
        "cooking",
        "tech",
        "finance",
        "travel",
    ];

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

                setBlog(formattedData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

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

                setBlog(formattedData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchTrendingBlogs = () => {
        axios
            .get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
            .then(({ data }) => {
                setTrendingBlog(data.blogs);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const loadBlogByCategory = (e) => {
        let category = e.target.innerText.toLowerCase();

        setBlog(null);

        if (pageState === category) {
            setPageState("home");
            return;
        }

        setPageState(category);
    };

    useEffect(() => {
        activeTabRef.current.click();

        if (pageState === "home") {
            fetchLatestBlogs({ page: 1 });
        } else {
            fetchBlogsByCategory({ page: 1 });
        }

        if (!trendingBlogs) {
            fetchTrendingBlogs();
        }
    }, [pageState]);

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            console.log("Searching for:", e.target.value);
        }
    };

    return (
        <AnimationWrapper>
            <div className="text-center font-bold block mt-12 leading-tight">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Discover What AI</h1>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Can Do?</h1>
            </div>
            <div className="relative w-full max-w-md mx-auto mt-4">
                <div
                    className={
                        "absolute bg-white w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto " +
                        (searchBoxVisibility ? "show" : "hide")
                    }
                >
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
                        onKeyDown={handleSearch}
                    />
                    <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
                </div>

                <div className="flex items-center gap-3 md:gap-6 ml-auto">
                    <button
                        className="md:hidden bg-[#24a0ed] w-12 h-12 rounded-full flex items-center justify-center"
                        onClick={() => setSearchBoxVisibility((currentVal) => !currentVal)}
                    >
                        <i className="fi fi-rr-search text-xl"></i>
                    </button>
                </div>
            </div>

            <section className="flex flex-col gap-10">
                {/* latest blogs */}
                <InPageNavigation routes={[pageState, "trending blogs"]}>
                    <div className="flex gap-3 flex-wrap">
                        <>
                            {blogs == null ? (
                                <Loader />
                            ) : (
                                blogs.results.length ?
                                    blogs.results.map((blog, i) => {
                                        return (
                                            <AnimationWrapper
                                                transition={{
                                                    duration: 1,
                                                    delay: i * 0.1,
                                                }}
                                                key={i}
                                            >
                                                <BlogPostCard
                                                    content={blog}
                                                    author={blog.author.personal_info}
                                                />
                                            </AnimationWrapper>
                                        );
                                    })
                                    : <NoDataMessage message="No blogs published" />
                            )}
                            <LoadMoreDataBtn state={blogs} fetchDataFun={(pageState === "home" ? fetchLatestBlogs : fetchBlogsByCategory)} />
                        </>
                    </div>
                    <div className="w-full">
                        {trendingBlogs == null ? (
                            <Loader />
                        ) : (
                            trendingBlogs.length ?
                                trendingBlogs.map((blog, i) => {
                                    return (
                                        <AnimationWrapper
                                            transition={{
                                                duration: 1,
                                                delay: i * 0.1,
                                            }}
                                            key={i}
                                        >
                                            <MinimalBlogPost
                                                blog={blog}
                                                index={i}
                                            />
                                        </AnimationWrapper>
                                    );
                                })
                                : <NoDataMessage message="No trending blogs" />
                        )}
                    </div>
                </InPageNavigation>
                {/* filters and trending blogs */}
            </section>
        </AnimationWrapper>
    );
};

export default HomePage;
