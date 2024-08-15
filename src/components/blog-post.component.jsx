/* eslint-disable react/prop-types */
import { getDay } from "../common/date";
import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author }) => {

    let { publishedAt, tags, title, des, banner, activity: { total_likes }, blog_id: id } = content;
    let { fullname, profile_img, username } = author;

    return (
        <Link to={`/blog/${id}`} className="flex flex-col gap-4 border border-grey p-4 rounded-md mb-4 w-full max-w-md">
            <div className="w-full">
                <img src={banner} className="w-full h-48 rounded-md object-cover" alt="Blog Banner" />
            </div>
            
            <div className="w-full">
                <div className="flex gap-2 items-center mb-4">
                    <img src={profile_img} className="w-8 h-8 rounded-full" alt="Author" />
                    <p className="line-clamp-1 font-semibold">{fullname} @{username}</p>
                    <p className="min-w-fit text-sm text-grey">{getDay(publishedAt)}</p>
                </div>

                <h1 className="blog-title text-xl font-bold">{title}</h1>

                <p className="my-3 text-base font-gelasio leading-6 text-grey line-clamp-3">{des}</p>

                <div className="flex gap-4 mt-4">
                    <span className="btn-light py-1 px-4 rounded-md bg-light-grey text-dark-grey">{tags[0]}</span>
                    <span className="ml-3 flex items-center gap-2 text-dark-grey">
                        <i className="fi fi-rr-heart text-xl"></i>
                        {total_likes}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default BlogPostCard;
