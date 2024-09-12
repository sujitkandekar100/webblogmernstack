const Img = ({ url }) => {
    return (
        <div>
            <img src={url} className="w-full h-60 rounded-lg" alt="Content" />
        </div>
    );
};

const Video = ({ url, width = "100%", height = "315" }) => {
    return (
        <div className="video-container" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
            <iframe
                src={url}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                frameBorder="0"
                allowFullScreen
                title="Content Video"
            />
        </div>
    );
};

const Quote = ({ quote, caption }) => {
    return (
        <div className="bg-[#24a0ed]/10 p-3 pl-5 border-l-4 border-[#24a0ed]">
            <p className="text-xl leading-10 md:text-2xl">{quote}</p>
            {caption.length ? <p className="w-full text-[#24a0ed] text-base">{caption}</p> : ""}
        </div>
    );
};

const List = ({ style, items }) => {
    return (
        <ol className={`pl-5 ${style === "ordered" ? "list-decimal" : "list-disc"}`}>
            {items.map((listItem, i) => (
                <li key={i} className="my-4" dangerouslySetInnerHTML={{ __html: listItem }}></li>
            ))}
        </ol>
    );
};

const BlogContent = ({ block }) => {
    let { type, data } = block;

    // Function to render heading with hr
    const renderHeading = (level, text) => {
        const HeadingTag = `h${level}`;
        return (
            <div>
                <HeadingTag className={`text-${level === 1 ? "5xl" : level === 2 ? "4xl" : level === 3 ? "3xl" : "2xl"} font-bold`} dangerouslySetInnerHTML={{ __html: text }}></HeadingTag>
                <hr className="border-grey my-2 rounded-lg" /> {/* Apply spacing and radius */}
            </div>
        );
    };

    if (type === "paragraph") {
        return <p dangerouslySetInnerHTML={{ __html: data.text }}></p>;
    }

    if (type === "header") {
        // Support for h1, h2, h3, h4
        if (data.level === 1 || data.level === 2 || data.level === 3 || data.level === 4) {
            return renderHeading(data.level, data.text);
        }
    }

    if (type === "image") {
        return <Img url={data.file.url} />;
    }

    if (type === "quote") {
        return <Quote quote={data.text} caption={data.caption} />;
    }

    if (type === "list") {
        return <List style={data.style} items={data.items} />;
    }

    // Handle embedded videos
    if (type === "embed" && data.service === "youtube" || data.service === "vimeo") {
        return <Video url={data.embed} />;
    }

    return null;
};

export default BlogContent;
