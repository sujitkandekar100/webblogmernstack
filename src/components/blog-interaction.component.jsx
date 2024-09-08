import { useContext, useEffect } from "react";
import { BlogContext } from "../pages/blog.page";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const BlogInteraction = () => {
    const {
        blog,
        blog: { _id, title, blog_id, activity, activity: { total_likes, total_comments }, author: { personal_info: { username: author_username } } },
        setBlog,
        islikedByUser,
        setLikedByUser,
        setCommentsWrapper
    } = useContext(BlogContext);

    const { userAuth: { username, access_token } } = useContext(UserContext);

    useEffect(() => {
        if (access_token) {
            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/isliked-by-user", { _id }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({ data: { result } }) => {
                setLikedByUser(Boolean(result));
            })
            .catch(err => {
                console.log(err);
            });
        }
    }, [access_token, _id, setLikedByUser]);

    const handleLike = () => {
        if (access_token) {
            const updatedLikes = islikedByUser ? total_likes - 1 : total_likes + 1;
            setLikedByUser(prevVal => !prevVal);
            setBlog({ ...blog, activity: { ...activity, total_likes: updatedLikes } });

            axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/like-blog", { _id, islikedByUser }, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            })
            .then(({ data }) => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
        } else {
            toast.error("Please login to like this blog");
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(location.href);
        toast.success("Link copied to clipboard!");
    };

    return (
        <>
            <Toaster />
            {/* Responsive Container */}
            <div className="max-w-full mx-auto p-4 bg-white rounded-3xl shadow-lg border border-gray-200">
                <div className="flex flex-wrap gap-4 justify-between items-center md:gap-6">
                    
                    {/* Like and Comment Section */}
                    <div className="flex items-center gap-2 md:gap-4">
                        <button
                            onClick={handleLike}
                            className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${islikedByUser ? "bg-[#24a0ed]/20 text-[#24a0ed]" : "bg-gray-200"}`}
                        >
                            <i className={`fi ${islikedByUser ? "fi-ss-arrow-circle-up" : "fi-rs-arrow-circle-up"}`}></i>
                        </button>
                        <p className="text-base md:text-lg text-gray-700">{total_likes}</p>

                        <button
                            onClick={() => setCommentsWrapper(prevVal => !prevVal)}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-gray-200"
                        >
                            <i className="fi fi-rr-comment-alt-dots"></i>
                        </button>
                        <p className="text-base md:text-lg text-gray-700">{total_comments}</p>
                    </div>

                    {/* Edit and Share Section */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {username === author_username && (
                            <Link to={`/editor/${blog_id}`} className="underline text-[#24a0ed] hover:text-[#24a0ed] text-sm md:text-base">
                                Edit
                            </Link>
                        )}
                        <button
                            onClick={handleShare}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-gray-200 hover:bg-[#24a0ed]/20 hover:text-[#24a0ed]"
                        >
                          <i class="fi fi-rs-code-simple"></i>               
                        </button>
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-gray-200 hover:bg-[#24a0ed]/20 hover:text-[#24a0ed]"
                        >
                            <i className="fi fi-brands-linkedin text-base md:text-xl"></i>
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?text=Read ${encodeURIComponent(title)}&url=${encodeURIComponent(location.href)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center bg-gray-200 hover:bg-[#24a0ed]/20 hover:text-[#24a0ed]"
                        >
                            <i className="fi fi-brands-twitter-alt text-base md:text-xl border-gray-200"></i>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogInteraction;
