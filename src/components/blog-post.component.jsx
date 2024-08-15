/* eslint-disable react/prop-types */
import { getDay } from "../common/date";
import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author }) => {

    let { publishedAt, tags, title, des, banner, activity: { total_likes }, blog_id: id } = content;
    let { fullname, profile_img, username } = author;

    return (
        <Link to={`/blog/${id}`} className="flex flex-col border border-grey p-2 rounded-md mb-4 w-full max-w-[25%]">
            <div className="w-full">
                <img src={banner} className="w-full h-24 rounded-md object-cover" alt="Blog Banner" />
            </div>

            <div className="w-full mt-2">
                <div className="flex gap-2 items-center mb-2">
                    <img src={profile_img} className="w-6 h-6 rounded-full" alt="Author" />
                    <p className="line-clamp-1 font-semibold text-sm">{fullname} @{username}</p>
                    <p className="min-w-fit text-xs text-grey">{getDay(publishedAt)}</p>
                </div>

                <h1 className="blog-title text-lg font-bold">{title}</h1>

                <p className="my-2 text-sm font-gelasio leading-5 text-grey line-clamp-2">{des}</p>

                <div className="flex gap-4 mt-2">
                    <span className="btn-light py-1 px-3 rounded-md bg-light-grey text-dark-grey text-xs">{tags[0]}</span>
                    <span className="ml-3 flex items-center gap-2 text-dark-grey text-xs">
                        <i className="fi fi-rr-heart text-lg"></i>
                        {total_likes}
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default BlogPostCard;
