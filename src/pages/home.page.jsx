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
import SearchBar from "../components/SearchBar";

const HomePage = () => {
    const [blogs, setBlog] = useState(null);
    const [trendingBlogs, setTrendingBlog] = useState(null);
    const [pageState, setPageState] = useState("home");
    const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);

    const categories = [
        "Programming",
        "Hollywood",
        "Film Making",
        "Social Media",
        "Cooking",
        "Tech",
        "Finance",
        "Travel",
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

    const loadBlogByCategory = (category) => {
        setBlog(null);
        setCategoryDropdownVisible(false);

        if (pageState === category) {
            setPageState("home");
            return;
        }

        setPageState(category.toLowerCase());
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

    return (
        <AnimationWrapper>
            <div className="text-center font-bold block mt-12 leading-tight">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Discover What AI</h1>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Can Do?</h1>
            </div>
<div className="my-8 flex justify-center items-center gap-4 flex-wrap rounded-lg">
  <div className="relative w-full max-w-lg flex">
    {/* Search Bar with square left side and rounded right side */}
    <SearchBar 
      className="w-full p-3"
      style={{
        borderTopLeftRadius: '0px',  // Square on the top-left corner
        borderBottomLeftRadius: '0px',  // Square on the bottom-left corner
        borderTopRightRadius: '8px',  // Rounded on the top-right corner
        borderBottomRightRadius: '8px',  // Rounded on the bottom-right corner
        border: '1px solid #ddd'  // Adding a border around the input
      }}
    />

    {/* Filter Button with rounded right corners */}
    <button 
      className="bg-white p-3 rounded-lg border border-gray-300 flex items-center justify-center"
      onClick={() => setCategoryDropdownVisible(!categoryDropdownVisible)}
    >
      <i className="fi fi-rr-list text-xl"></i>
    <h6>Filter</h6>
    </button>

    {/* Dropdown for categories */}
    {categoryDropdownVisible && (
      <div 
        className="absolute top-full right-0 mt-2 w-full max-w-xs bg-white border border-gray-300 rounded-lg shadow-lg z-10"
        style={{ 
          transform: 'translateX(-100%)' 
        }}
      >
        <div className="flex gap-3 flex-wrap p-2">
          {categories.map((category, index) => (
            <button 
              key={index} 
              className="btn-light px-4 py-2  bg-gray-100 hover:bg-gray-200 rounded-lg"
              onClick={() => loadBlogByCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
</div>
            <section className="flex flex-col gap-10">
                {/* Latest blogs */}
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
                {/* Filters and trending blogs */}
            </section>
        </AnimationWrapper>
    );
};

export default HomePage;
