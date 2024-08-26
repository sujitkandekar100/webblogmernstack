/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { getDay } from "../common/date";

const MinimalBlogPost = ({ blog, index }) => {
    // Destructuring blog object with safety checks
    const {
        title,
        banner,
        activity: { total_likes } , // Default empty object to avoid errors
        blog_id: id,
        author: { personal_info: { fullname, username, profile_img } = {} } = {},
        publishedAt,
        tags  // Assuming tags is part of the blog object
    } = blog ; // Default to an empty object to prevent destructuring of undefined

    return (
        <Link to={`/blog/${id}`} className="flex gap-5 mb-8">
            <h2 className="blog-index">{index < 10 ? "0" + (index + 1) : index}</h2>

            <div className="flex items-start gap-4 mb-4 p-4 rounded-lg shadow-md">
                <img src={banner} alt={title} className="w-16 h-16 rounded-lg" />

                <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                        <h6 className="text-lg font-semibold text-xl">{title}</h6>
                            <span className="btn-light  rounded-full  py-1 text-sm px-2">
                                {tags[1]}
                            </span>
                    
                    </div>
                </div>
                <div className="flex justify-between text-gray-600 mt-2">
                        <span className="flex  gap-2 text-dark-grey ">
                             <div className="flex items-center space-x-1">
        <i className="fi fi-ss-arrow-circle-up text-base "></i>
        <span className="leading-none">({total_likes})</span>
    </div>
                        <span className=" btn-light py-1 text-sm px-2">{tags[1]}</span>
                    </div>
            </div>
        </Link>
    );
}

export default MinimalBlogPost;
