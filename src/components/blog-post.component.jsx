/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const BlogPostCard = ({ content, author }) => {
    let { publishedAt, tags, title, des, banner, activity: { total_likes }, blog_id: id } = content;
    let { fullname, profile_img, username } = author;

    return (
        
<Link to{'/blog/${id}'} className={`w-[274px] shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-[8px] bg-[#fff] flex flex-col items-start justify-start pt-[0px] px-[0px] pb-[13px] box-border gap-[8.3px] leading-[normal] tracking-[normal] ${className}`}
    >
      <section className="self-stretch flex flex-col items-start justify-start p-[16px]">
        <img
          className="self-stretch relative rounded-[8px] max-w-full overflow-hidden max-h-full object-cover"
          loading="lazy"
          alt=""
          src={banner}
        />
      </section>
      <section className="self-stretch flex flex-row items-start justify-start py-[0px] px-[16px] text-left text-[14px] text-[#000] font-[Inter]">
        <div className="flex-1 flex flex-col items-start justify-start gap-[12.2px]">
          <b className="relative text-[16px] tracking-[0.12px] leading-[26px]">
            {title}
          </b>
          <div className="self-stretch flex flex-row items-start justify-start py-[0px] pl-[3px] pr-[7px] text-[#52525b]">
            <div className="h-[23px] flex-1 flex flex-row items-end justify-between pt-[5.5px] px-[0px] pb-[3.5px] box-border gap-[20px]">
              <div className="flex flex-row items-start justify-start">
                <div className="w-[22.2px] relative font-medium flex items-center shrink-0">{`4.1 `}</div>
                <img
                  className="h-[12px] w-[12px] relative shrink-0 ml-[-0.2px]"
                  loading="lazy"
                  alt=""
                  src="/svgpartsvg.svg"
                />
              </div>
              <div className="mb-[-6px] rounded-[4px] bg-[#f4f4f5] flex flex-row items-start justify-start pt-[2px] pb-[3px] pl-[8px] pr-[7px] text-[#131316]">
                <div className="h-[23px] relative leading-[16px] font-medium flex items-center min-w-[30px]">
                  Free
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch h-[57px] relative tracking-[0.01em] font-['Open_Sans'] text-[#1e1e1e] inline-block">{des}</div>
        </div>
      </section>
      <div className="w-[136.5px] flex flex-row items-start justify-start py-[0px] px-[18px] box-border">
        <button className="cursor-pointer border-[#000] border-[1px] border-solid py-[4px] px-[21px] bg-[transparent] flex-1 rounded-[10px] box-border flex flex-row items-start justify-start min-w-[100px] whitespace-nowrap">
          <div className="relative text-[13px] leading-[12px] font-medium font-[Inter] text-[#000] text-center inline-block min-w-[56px]">
           {tags[0]}
          </div>
        </button>
      </div>
    </Link>
    );
};

export default BlogPostCard;
