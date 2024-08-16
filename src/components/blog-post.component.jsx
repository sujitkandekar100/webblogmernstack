/* eslint-disable react/prop-types */
import { getDay } from "../common/date";
import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author }) => {
    let { publishedAt, tags, title, des, banner, activity: { total_likes }, blog_id: id } = content;
    let { fullname, profile_img, username } = author;

    return (
        <Link 
            to={`/blog/${id}`} 
            className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg"
        >
            <img 
                src={banner} 
                className="h-48 w-full object-cover object-center rounded-t-lg" 
                alt="Blog Banner" 
            />
            
            <div className="p-4">
                <div className="flex gap-2 items-center mb-4">
                    <img 
                        src={profile_img} 
                        className="w-8 h-8 rounded-full" 
                        alt="Author" 
                    />
                    <div className="flex-1">
                        <p className="line-clamp-1 font-semibold dark:text-white text-gray-900">
                            {fullname} @{username}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {getDay(publishedAt)}
                        </p>
                    </div>
                </div>

                <h1 className="text-lg font-medium mb-2 dark:text-white text-gray-900">
                    {title}
                </h1>

                <p className="text-base mb-2 dark:text-gray-300 text-gray-700 line-clamp-3">
                    {des}
                </p>

                <div className="flex justify-between items-center mt-4">
                    <span className="px-3 py-1 rounded-md bg-light-grey dark:bg-gray-600 text-dark-grey dark:text-gray-200">
                        {tags[0]}
                    </span>
                    <span className="flex items-center gap-2 text-dark-grey dark:text-white">
                        <i className="fi fi-rr-heart text-xl"></i>
                        {total_likes}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default BlogPostCard;
