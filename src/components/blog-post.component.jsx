import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author }) => {
    let { title, des, banner, tags, activity: { total_likes }, blog_id: id } = content;

    return (
        <Link to={/blog/${id}} className="shadow-md rounded-lg flex flex-col text-left text-[14px] min-h-[100px]" >
            {/* Image Section */}
            <img
                className="w-full h-40 sm:h-48 rounded-t-lg object-cover"
                loading="lazy"
                alt={title}
                src={banner}
            />
            
            {/* Content Section */}
            <div className="p-4 flex flex-col justify-end h-full overflow-hidden">
                <div>  
     <div className="flex gap-2 mt-1">
    <b className="text-xl font-bold block leading-tight">{title}</b>
    <div className="flex items-center space-x-1">
        <i className="fi fi-sr-caret-up text-2xl"></i>
        <span className="leading-none">({total_likes})</span>
    </div>
</div>


                    <div className="flex justify-between text-gray-600 mt-2">
                        <span className="flex  gap-2 text-dark-grey ">
                            <span className="btn-light py-1 text-sm px-2">{tags[0]}</span>
                        </span>
                        <span className="btn-light py-1 text-sm px-2">3 Demo</span>
                    </div>
                    
                    <p className="my-3 text-base font-gelasio leading-6 line-clamp-3 overflow-hidden text-ellipsis">
                        {des}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default BlogPostCard; 
