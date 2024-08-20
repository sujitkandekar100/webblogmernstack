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
                    <div className="flex gap-2 mt-1">
                      <b className="text-xl font-bold block leading-tight">{title}</b>
                       <i class="fi fi-rs-social-network text-xl "></i>
                        ({total_likes}) 
                </div>
                    <div className="flex items-center text-gray-600 mt-2">
                       
                   <span className=" flex items-center gap-2 text-dark-grey">
                        <span className="btn-light py-1 text-sm px-2 ">{tags[0]}</span>
                    </span>
                    <div className="ml-auto btn-light py-1 px-2 rounded bg-gray-100 text-gray-800" style={{ fontSize: '5px' }}>
    3 Demo
</div>


                    </div>
                    
                    <p className=" my-3 text-base font-gelasio leading-6 line-clamp-3">{des}</p>
                </div>
                
                
            </div>
           

        </Link>
    );
};

export default BlogPostCard;
