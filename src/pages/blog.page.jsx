import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import BlogInteraction from "../components/blog-interaction.component";
import BlogPostCard from "../components/blog-post.component";
import BlogContent from "../components/blog-content.component";
import CommentsContainer, { fetchComments } from "../components/comments.component";

export const blogStructure = {
  title: "",
  des: "",
  content: [],
  author: { personal_info: {} },
  banner: "",
  publishedAt: "",
  activity: { total_reads: 0 },
  tags: [],
};

export const BlogContext = createContext({});

const BlogPage = () => {
  let { blog_id } = useParams();

  const [blog, setBlog] = useState(blogStructure);
  const [similarBlogs, setSimilarBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [islikedByUser, setLikedByUser] = useState(false);
  const [commentsWrapper, setCommentsWrapper] = useState(false);
  const [totalParentCommentsLoaded, setTotalParentCommentsLoaded] = useState(0);

  const { title, content, banner, activity, tags, des } = blog;

  const fetchBlog = () => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/get-blog", { blog_id })
      .then(async ({ data: { blog } }) => {
        blog.comments = await fetchComments({
          blog_id: blog._id,
          setParentCommentCountFun: setTotalParentCommentsLoaded,
        });
        setBlog(blog);

        axios
          .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
            tag: blog.tags[0],
            limit: 6,
            eliminate_blog: blog_id,
          })
          .then(({ data }) => {
            setSimilarBlogs(data.blogs);
          });

        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    resetStates();
    fetchBlog();
  }, [blog_id]);

  const resetStates = () => {
    setBlog(blogStructure);
    setSimilarBlogs(null);
    setLoading(true);
    setLikedByUser(false);
    setCommentsWrapper(false);
    setTotalParentCommentsLoaded(0);
  };

  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <BlogContext.Provider
          value={{
            blog,
            setBlog,
            islikedByUser,
            setLikedByUser,
            commentsWrapper,
            setCommentsWrapper,
            totalParentCommentsLoaded,
            setTotalParentCommentsLoaded,
          }}
        >
          <CommentsContainer />
          <div className="max-w-[900px] mx-auto py-10 px-[5vw]">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
              {/* Banner Image */}
              <div className="flex-1 lg:order-2">
                <img
                  src={banner}
                  className="w-full h-auto rounded object-cover"
                  alt="Blog banner"
                />
              </div>

              {/* Blog Details: Title, Views, Visited, Tags, Description */}
              <div className="flex-1 lg:order-1">
                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="my-3 text-base font-serif leading-6 line-clamp-3 overflow-hidden text-ellipsis">
                  {des}
                </p>
                <div className="flex items-center gap-4 mb-2">
                  <span className="bg-gray-200 py-1 px-3 text-sm rounded border-2 border-transparent hover:border-black dark:hover:border-white">
                    Views: {activity.total_reads}
                  </span>
                  <Link
                    to="#"
                    className="bg-gray-200 py-1 px-3 text-sm rounded border-2 border-transparent hover:border-black dark:hover:border-white"
                  >
                    Visit our site
                  </Link>
                </div>
                {/* Skip the first two tags and display the rest */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {tags.slice(2).map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 py-1 px-3 text-sm rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <BlogInteraction />

            <div className="my-12 font-gelasio blog-page-content">
              {content.length > 0 &&
                content[0].blocks.map((block, i) => (
                  <div key={i} className="my-4 md:my-8">
                    <BlogContent block={block} />
                  </div>
                ))}
            </div>

            <BlogInteraction />

            {similarBlogs != null && similarBlogs.length > 0 && (
              <>
                <h1 className="text-2xl mt-14 mb-10 font-medium">
                  Similar Blogs
                </h1>
                <div className="flex flex-wrap gap-4">
                  {similarBlogs.map((blog, i) => (
                    <AnimationWrapper
                      key={i}
                      transition={{ duration: 1, delay: i * 0.08 }}
                    >
                      <BlogPostCard content={blog} />
                    </AnimationWrapper>
                  ))}
                </div>
              </>
            )}
          </div>
        </BlogContext.Provider>
      )}
    </AnimationWrapper>
  );
};

export default BlogPage;
