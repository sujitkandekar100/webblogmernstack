import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author }) => {
    let { title, des, banner, tags, activity: { total_likes }, blog_id: id } = content;

    return (
        <Link to={`/blog/${id}`} className="w-full shadow-md rounded-lg bg-white flex flex-col items-start justify-start">
            {/* Image Section */}
            <img
                className="w-full h-56 rounded-t-lg object-cover"
                loading="lazy"
                alt={title}
                src={banner}
            />
            
            {/* Content Section */}
            <div className="p-4 w-full">
                <b className="text-lg font-bold">{title}</b>
                
                <div className="flex items-center text-gray-600 mt-2">
                    <span className="text-sm font-medium">{`4.1 `}</span>
                    <img
                        className="h-4 w-4 ml-1"
                        loading="lazy"
                        alt="star"
                        src="/svgpartsvg.svg"
                    />
                    <div className="ml-auto rounded bg-gray-200 text-gray-800 px-2 py-1 text-sm">
                        Free
                    </div>
                </div>
                
                <p className="text-sm text-gray-700 mt-2">{des}</p>
                
                <button className="mt-4 py-2 px-4 bg-gray-100 text-black rounded-lg self-center">
                    Try it out
                </button>
            </div>
        </Link>
    );
};

export default BlogPostCard;
