/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { getDay } from "../common/date";

const MinimalBlogPost = ({ blog, index }) => {
    
    let { title, banner,activity: { total_likes },blog_id: id, author: { personal_info: { fullname, username, profile_img } }, publishedAt } = blog;

    return (
        <Link to={`/blog/${id}`} className="flex gap-5 mb-8">
            <h1 className="blog-index">{ index < 10 ? "0" + (index + 1) : index}</h1>

            
              <div className="flex items-start gap-4 mb-4 p-4 bg-white rounded-lg shadow-md">
  <img src={banner} className="w-16 h-16 rounded-lg" />

  <div className="flex-1">
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-semibold">{title}</h1>
      <span className="btn-light bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm">Free</span>
    </div>

    <div className="flex items-center text-sm text-gray-600 mt-1">
      <span className="mr-1">4.2</span>
      <i className="fi fi-ss-star text-xs text-yellow-500"></i>
      <span className="ml-2">Entertainment</span>
    </div>
  </div>
</div>

               
        </Link>
    )
}

export default MinimalBlogPost;
