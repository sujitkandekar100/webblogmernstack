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
    let [blogs, setBlog] = useState(null);
    let [trendingBlogs, setTrendingBlog] = useState(null);
    let [pageState, setPageState] = useState("home");
    let [searchQuery, setSearchQuery] = useState("");

    let categories = [
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
            .then( async ({ data }) => {
                let formatedData = await filterPaginationData({
                    state: blogs,
                    data: data.blogs,
                    page,
                    countRoute: "/all-latest-blogs-count"
                })
                setBlog(formatedData);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const fetchBlogsByCategory = ({ page = 1 }) => {
        axios
            .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", { tag: pageState, page })
            .then( async ({ data }) => {
                let formatedData = await filterPaginationData({
                    state: blogs,
                    data: data.blogs,
                    page,
                    countRoute: "/search-blogs-count",
                    data_to_send: { tag: pageState }
                })
                setBlog(formatedData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

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
        if(pageState == category){
            setPageState("home");
            return;
        }
        setPageState(category);
    }

    useEffect(() => {
        activeTabRef.current.click();
        if(pageState == "home"){
            fetchLatestBlogs({ page: 1 });
        } else {
            fetchBlogsByCategory({ page: 1 })
        }
        if(!trendingBlogs){
            fetchTrendingBlogs();
        }
    }, [pageState]);

    const handleSearch = (e) => {
        let query = e.target.value;
        if(e.keyCode == 13 && query.length){
            setSearchQuery(query);
            // Add your search handling logic here
        }
    }

    return (
        <AnimationWrapper>
            <section className="flex flex-col gap-10">
                {/* Tagline and Search */}
                <div className="text-center">
                    <h1>Discover what AI can do</h1>
                    <div className="relative w-full max-w-md mx-auto mt-4">
                        <input 
                            type="text"
                            placeholder="Search"
                            className="w-full bg-grey p-4 pl-6 pr-6 rounded-full placeholder:text-dark-grey"
                            onKeyDown={handleSearch}
                        />
                        <i className="fi fi-rr-search absolute right-6 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
                    </div>
                </div>
                
                {/* Category Filters */}
                <div className="flex justify-center mt-4">
                    <button className="filter-btn" onClick={() => setPageState("home")}>Home</button>
                    {categories.map(category => (
                        <button key={category} className="filter-btn" onClick={loadBlogByCategory}>
                            {category}
                        </button>
                    ))}
                </div>

                {/* Latest Blogs */}
                <InPageNavigation routes={[pageState, "trending blogs"]}>
                    <div className="flex gap-3 flex-wrap ">
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
                                                author={
                                                    blog.author.length
                                                        ? blog.author[0]
                                                        : {}
                                                }
                                            />
                                        </AnimationWrapper>
                                    );
                                }) : <NoDataMessage message="No Blogs found!" />
                        )}
                    </div>
                </InPageNavigation>

                {/* Trending Blogs */}
                <InPageNavigation routes={["trending blogs"]}>
                    <div className="flex gap-3 flex-wrap ">
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
                                            <BlogPostCard
                                                content={blog}
                                                author={
                                                    blog.author.length
                                                        ? blog.author[0]
                                                        : {}
                                                }
                                            />
                                        </AnimationWrapper>
                                    );
                                }) : <NoDataMessage message="No Blogs found!" />
                        )}
                    </div>
                </InPageNavigation>

            </section>
        </AnimationWrapper>
    );
};

export default HomePage;
