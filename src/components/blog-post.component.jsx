/* eslint-disable react/prop-types */
import { getDay } from "../common/date";
import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author }) => {
    let { publishedAt, tags, title, des, banner, activity: { total_likes }, blog_id: id } = content;
    let { fullname, profile_img, username } = author;

    return ( 
        <Link to={`/blog/${id}`} className="flex gap-8 items-center border-b border-grey pb-5 mb-4 hover:scale-105  w-full max-w-[50%] hover:shadow-lg transition duration-300">
             <div className="h-32 aspect-square bg-grey">
                <div className="w-full">
                <img src={banner} className="w-full h-24 rounded-md object-cover" alt="Blog Banner" />
            </div>
            </div>
            <div className="w-full">
                <div className="flex gap-2 items-center mb-7">
                    <img src={profile_img} className="w-8 h-8 rounded-full" alt={`${fullname}'s profile`} />
                    <p className="line-clamp-1">{fullname} @{username}</p>
                    <p className="min-w-fit">{ getDay(publishedAt) }</p>
                </div>

                <h1 className="text-2xl font-semibold">{title}</h1>

                <p className="my-3 text-lg leading-7 line-clamp-2">{des}</p>

                <div className="flex gap-4 mt-7">
                    <span className="btn-light py-1 px-4">{tags[0]}</span>
                    <span className="ml-3 flex items-center gap-2 text-dark-grey">
                        <i className="fi fi-rr-heart text-xl"></i>
                        { total_likes }
                    </span>
                </div>
            </div>
            
           
        </Link>
    );
}

export default BlogPostCard;
