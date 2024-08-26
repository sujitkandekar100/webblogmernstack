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
                    <div className="line-clamp-1">
                        <h1 className="blog-title ">{title}</h1>
                    </div>
                    <div className="flex justify-between text-gray-600 mt-2">
  <div className="flex gap-2 text-dark-grey">
    <div className="flex items-center space-x-1">
      <i className="fi fi-ss-arrow-circle-up text-base"></i>
      <span className="leading-none">({total_likes})</span>
    </div>
    <span className="btn-light py-1 text-sm px-2">{tags[1]}</span>
  </div>
</div>

                </div>

               
            </div>
        </Link>
    )
}

export default MinimalBlogPost;
