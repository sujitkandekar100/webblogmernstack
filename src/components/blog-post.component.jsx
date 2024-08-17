/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author }) => {
    const { publishedAt, tags, title, des, banner, activity: { total_likes }, blog_id: id } = content;
    const { fullname, profile_img } = author;

    return (
        <Link to={`/blog/${id}`} className="flex flex-col max-w-xs border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform duration-300">
            {/* Image Section */}
            <div className="w-full h-48 overflow-hidden">
                <img src={banner} className="w-full h-full object-cover" alt="Blog Banner" />
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                    <h1 className="text-lg font-semibold mb-2">{title}</h1>
                    <p className="text-sm text-gray-600 line-clamp-2">{des}</p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <img src={profile_img} className="w-8 h-8 rounded-full mr-2" alt={`${fullname}'s profile`} />
                        <p className="text-sm text-gray-700">{fullname}</p>
                    </div>
                    <p className="text-sm text-gray-500">{new Date(publishedAt).toLocaleDateString()}</p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-white bg-blue-500 py-1 px-3 rounded-md">{tags[0]}</span>
                    <span className="flex items-center text-gray-600">
                        <i className="fi fi-rr-heart text-lg mr-1"></i>
                        {total_likes}
                    </span>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="bg-gray-100 p-3 text-center">
                <button className="py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-200 transition duration-200">
                    Read More
                </button>
            </div>
        </Link>
    );
}

export default BlogPostCard;
