/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author }) => {
    const { publishedAt, tags, title, des, banner, activity: { total_likes }, blog_id: id } = content;
    const { fullname, profile_img } = author;

    return (
        <Link to={`/blog/${id}`} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-transform duration-300">
            {/* Image Section */}
            <div className="w-full h-48 overflow-hidden">
                <img src={banner} className="w-full h-full object-cover rounded-t-lg" alt="Blog Banner" />
            </div>

            {/* Content Section */}
            <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">{title}</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400 mb-3">{des}</p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <img src={profile_img} className="w-8 h-8 rounded-full mr-2" alt={`${fullname}'s profile`} />
                        <p className="text-sm text-gray-700 dark:text-gray-300">{fullname}</p>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{new Date(publishedAt).toLocaleDateString()}</p>
                </div>

                <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-white bg-blue-500 py-1 px-3 rounded-md">{tags[0]}</span>
                    <span className="flex items-center text-gray-600 dark:text-gray-300">
                        <i className="fi fi-rr-heart text-lg mr-1"></i>
                        {total_likes}
                    </span>
                </div>

                {/* Call to Action Section */}
                <div className="mt-4">
                    <Link to={`/blog/${id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </Link>
                </div>
            </div>
        </Link>
    );
}

export default BlogPostCard;

