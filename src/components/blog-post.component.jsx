import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author }) => {
    let { title, des, banner, tags, activity: { total_likes }, blog_id: id } = content;

    return (
        <Link 
            to={`/blog/${id}`} 
            className="shadow-md rounded-lg bg-white flex flex-col text-left text-[14px] text-[#000]">
            
            {/* Image Section */}
            <img
                className="w-full h-40 sm:h-48 rounded-t-lg object-cover"
                loading="lazy"
                alt={title}
                src={banner}
            />
            
            {/* Content Section */}
            <div className="p-4 flex flex-col justify-between h-full">
                
                {/* Title */}
                <b className="text-xl font-bold block leading-tight">{title}</b>
                
                {/* Likes and Free Badge */}
                <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center text-gray-600">
                        <i className="fi fi-rs-social-network text-xl"></i>
                        <span className="ml-1">({total_likes})</span>
                    </div>
                    <div className="ml-auto btn-light rounded bg-gray-200 text-gray-800 px-2 py-1 text-xs">
                        Free
                    </div>
                </div>
                
                {/* Tags */}
                <div className="flex items-center mt-2">
                    <span className="btn-light py-1 text-xs px-2 text-dark-grey">{tags[0]}</span>
                </div>

                {/* Description */}
                <p className="my-3 text-base font-gelasio leading-6 line-clamp-2">
                    {des}
                </p>
            </div>
        </Link>
    );
};

export default BlogPostCard;
