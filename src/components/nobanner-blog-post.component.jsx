/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { getDay } from "../common/date";

const MinimalBlogPost = ({ blog, index }) => {
    
    let { title,banner,total_likes,tags, blog_id: id, author: { personal_info: { fullname, username, profile_img } }, publishedAt } = blog;

    return (
        <Link to={`/blog/${id}`} className="flex gap-5 mb-8">
            <h1 className="blog-index">{ index < 10 ? "0" + (index + 1) : index}</h1>

            <div>
               

 <div
      className={`w-[278px] overflow-hidden flex flex-row items-center justify-between py-1.5 px-2.5 box-border text-left text-base text-appsmicrosoftcom-woodsmoke font-appsmicrosoftcom-roboto-regular-12 ${className}`}
    >
      <img
        className="w-[91px] relative rounded-lg h-20 overflow-hidden shrink-0 object-cover"
        alt=""
        src={banner}
      />
      <div className="w-[151px] h-[74px] overflow-hidden shrink-0 flex flex-col items-start justify-start gap-[15px]">
        <div className="self-stretch h-[19px] overflow-hidden shrink-0 flex flex-col items-start justify-start pt-px pb-0.5 pl-0 pr-8 box-border">
          <div className="relative font-semibold">{title}</div>
        </div>
        <div className="w-[91px] h-10 overflow-hidden shrink-0 flex flex-col items-start justify-start gap-[3px] text-xs text-appsmicrosoftcom-jumbo">
          <div className="self-stretch overflow-hidden flex flex-row items-center justify-start">
            <div className="flex flex-row items-start justify-start gap-1">
              <div className="self-stretch flex flex-col items-start justify-start py-px px-0">
                <div className="relative">
               <div className="flex items-center space-x-1">
        <i className="fi fi-ss-arrow-circle-up text-base "></i>
    
        <span className="leading-none">({total_likes})</span>
        </div>
         </div>
              </div>
              
            </div>
            <div className="h-3.5 flex flex-col items-start justify-start py-0 px-1 box-border">
              <div className="w-px relative border-appsmicrosoftcom-iron border-l-[1px] border-solid box-border h-3.5" />
            </div>
            <div className="overflow-hidden flex flex-col items-start justify-start py-px px-0">
              <div className="relative">{tags[0]}</div>
            </div>
          </div>
          <div className="w-10 rounded bg-appsmicrosoftcom-athens-gray h-[21px] flex flex-col items-start justify-start pt-0.5 px-2 pb-[3px] box-border text-appsmicrosoftcom-woodsmoke">
            <div className="relative leading-[16px]">{tags[1]}</div>
          </div>
        </div>
      </div>
    </div>
            </div>
        </Link>
    )
}

export default MinimalBlogPost;
