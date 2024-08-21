import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author }) => {
    let { title, des, banner, tags, activity: { total_likes }, blog_id: id } = content;

    // Determine the class for the card height based on the description length
    const isLongDescription = des.length > 100; // Adjust this threshold as needed
    const cardHeightClass = isLongDescription ? 'min-h-[450px]' : 'min-h-[350px]';

    return (
        <Link 
            to={`/blog/${id}`} 
            className={`shadow-md rounded-lg bg-white flex flex-col text-left text-[14px] text-[#000] ${cardHeightClass}`}
        >
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
                    <div className="flex gap-2 mt-1">
                        <b className="text-xl font-bold block leading-tight">{title}</b>
                        <i className="fi fi-rs-social-network text-xl"></i>
                        ({total_likes}) 
                    </div>
                    <div className="flex items-center text-gray-600 mt-2">
                        <span className="flex items-center gap-2 text-dark-grey">
                            <span className="btn-light py-1 text-sm px-2">{tags[0]}</span>
                        </span>
                        <span className="btn-light py-1 text-sm px-2">3 Demo</span>
                    </div>
                    
                    <p className="my-3 text-base font-gelasio leading-6 line-clamp-3">{des}</p>
                </div>
            </div>
        </Link>
    );
};

export default BlogPostCard;
