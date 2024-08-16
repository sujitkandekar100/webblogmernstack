/* eslint-disable react/prop-types */
import { getDay } from "../common/date";
import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author }) => {
    let { publishedAt, tags, title, des, banner, activity: { total_likes }, blog_id: id } = content;
    let { fullname, profile_img, username } = author;

    return (
        <Link to={`/blog/${id}`} className="flex flex-col gap-4 items-start border border-grey p-4 w-full rounded-md mb-4 max-w-md">
            <img src={banner} className="w-full h-48 rounded-md object-cover mb-4" alt="Blog Banner" />
            
            <div className="flex gap-2 items-center mb-4">
                <img src={profile_img} className="w-8 h-8 rounded-full" alt="Author" />
                <div className="flex-1">
                    <p className="line-clamp-1 font-semibold">{fullname} @{username}</p>
                    <p className="text-sm text-grey">{getDay(publishedAt)}</p>
                </div>
            </div>

            <h1 className="blog-title text-lg font-bold">{title}</h1>

            <p className="my-3 text-sm text-grey line-clamp-3">{des}</p>

            <div className="flex justify-between items-center w-full mt-4">
                <span className="btn-light py-1 px-3 rounded-md bg-light-grey text-dark-grey">{tags[0]}</span>
                <span className="flex items-center gap-2 text-dark-grey">
                    <i className="fi fi-rr-heart text-xl"></i>
                    {total_likes}
                </span>
            </div>
        </Link>
    )
}

export default BlogPostCard;
