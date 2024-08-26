/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { getDay } from "../common/date";

const MinimalBlogPost = ({ blog, index }) => {
    
    let { title, banner,activity: { total_likes },blog_id: id, author: { personal_info: { fullname, username, profile_img } }, publishedAt } = blog;

    return (
        <Link to={`/blog/${id}`} className="flex gap-5 mb-8">
            <h1 className="blog-index">{ index < 10 ? "0" + (index + 1) : index}</h1>

            <div>
                <div className="flex gap-2 items-center mb-7">
                    <img src={banner} className="w-16 h-16 squared-full" />
                     <h1 className="blog-title text-sm">{title}</h1>
                   
                    
                    

                </div>

               
            </div>
        </Link>
    )
}

export default MinimalBlogPost;
