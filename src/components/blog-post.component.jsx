/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author }) => {
    let { publishedAt, tags, title, des, banner, activity: { total_likes }, blog_id: id } = content;
    let { fullname, profile_img, username } = author;

    return (
        <Link to={`/blog/${id}`} className="flex gap-8 items-center border-b border-grey pb-5 mb-4">
            <div className="w-full max-w-[300px]"> {/* Set max width for the card */}
                <div className="h-28 w-full bg-grey">
                    <img src={banner} className="w-full h-full object-cover" alt="Banner" />
                </div>
                <h1 className="blog-title text-lg font-semibold mt-2">{title}</h1> {/* Adjusted text size */}
                <p className="my-3 text-sm leading-6 line-clamp-2">{des}</p> {/* Adjusted text size and leading */}
                <div className="flex gap-4 mt-7">
                    <span className="btn-light py-1 px-4">{tags[0]}</span>
                    <span className="ml-3 flex items-center gap-2 text-dark-grey">
                        <i className="fi fi-rr-heart text-xl"></i>
                        {total_likes}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default BlogPostCard;
