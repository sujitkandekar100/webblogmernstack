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
        // Logic for handling the share button can be implemented here
        toast.success("Link copied to clipboard!");
    };

    return (
        <>
            <Toaster />
            <hr className="border-grey my-2" />

            <div className="flex gap-6 justify-between">
                <div className="flex gap-3 items-center">
                    <button
                        onClick={handleLike}
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${islikedByUser ? "bg-[#24a0ed]/20 text-[#24a0ed]" : "bg-grey/80"}`}
                    >
                        <i className={`fi ${islikedByUser ? "fi-ss-arrow-circle-up" : "fi-rs-arrow-circle-up"}`}></i>
                    </button>
                    <p className="text-xl text-dark-grey">{total_likes}</p>

                    <button
                        onClick={() => setCommentsWrapper(prevVal => !prevVal)}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80"
                    >
                        <i className="fi fi-rr-comment-alt-dots"></i>
                    </button>
                    <p className="text-xl text-dark-grey">{total_comments}</p>

                    <button
                        onClick={handleShare}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80"
                    >
                        <i className="fi fi-rr-share-square"></i>
                    </button>
                </div>

                <div className="flex gap-6 items-center">
                    {username === author_username && (
                        <Link to={`/editor/${blog_id}`} className="underline hover:text-purple">Edit</Link>
                    )}
                    <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80 hover:bg-[#24a0ed]/20 hover:text-[#24a0ed]">
                        <i className="fi fi-brands-linkedin text-xl"></i>
                    </button>
                    <button className="w-10 h-10 rounded-full flex items-center justify-center bg-grey/80 hover:bg-[#24a0ed]/20 hover:text-[#24a0ed]">
                        <i className="fi fi-sr-square-x text-xl"></i>
                    </button>
                </div>
            </div>

            <hr className="border-grey my-2" />
        </>
    );
};

export default BlogInteraction;
