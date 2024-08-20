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
                    <div className="flex gap-2 mt-7">
                      <b className="text-lg font-bold block leading-tight">{title}</b>
                       <i class="fi fi-rs-social-network text-xl "></i>
                        ({total_likes}) 
                </div>
                    <div className="flex items-center text-gray-600 mt-2">
                       
                   <span className="ml-3 flex items-center gap-2 text-dark-grey">
                        <span className="btn-light py-1 text-xs px-2 ">{tags[0]}</span>
                    </span>
                        <div className="ml-auto btn-light rounded bg-gray-200 text-gray-800 px-2 py-1 text-sm">
                            Free
                        </div>
                    </div>
                    
                    <p className=" my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">{des}</p>
                </div>
                
                
            </div>
           

        </Link>
    );
};

export default BlogPostCard;
