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
                <div>
                    <b className="text-lg font-bold block leading-tight">{title}</b>                 
                    <div className="flex items-center text-gray-600 mt-2">
                        <i className="fi fi-rr-heart text-xl"></i>
                        { total_likes } 
                        <div className="ml-auto rounded bg-gray-200 text-gray-800 px-2 py-1 text-sm">
                            Free
                        </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mt-2 line-clamp-4">{des}</p>
                </div>
                
                
            </div>
        </Link>
    );
};

export default BlogPostCard;
