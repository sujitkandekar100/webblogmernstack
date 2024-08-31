/* eslint-disable react/prop-types */
const Img = ({ url }) => {
    return (
        <div>
            <img src={url} />
        </div>
        
    )
}

const Quote = ({ quote, caption }) => {
    return (
        <div className="bg-[#24a0ed]/10 p-3 pl-5 border-l-4 border-[#24a0ed]">
            <p className="text-xl leading-10 md:text-2xl">{quote}</p>
            {caption.length ? <p className="w-full text-[#24a0ed] text-base">{caption}</p> : ""}
        </div>
    )
}

const List = ({ style, items }) => {
    return (
        <ol className={`pl-5 ${ style == "ordered" ? " list-decimal" : " list-disc"}`}>

            {
               items.map((listItem, i) => {
                    return <li key={i} className="my-4" dangerouslySetInnerHTML={{ __html: listItem }}></li>
               }) 
            }

        </ol>
    )
}

const BlogContent = ({ block }) => {
    
    let { type, data } = block;

    if(type == "paragraph"){
        return <p dangerouslySetInnerHTML={{ __html: data.text }}></p>
    } 

    if(type == "header"){
        if(data.level == 3){
            return <h3 className="text-3xl font-bold" dangerouslySetInnerHTML={{ __html: data.text }}></h3>
        }
        return <h2 className="text-4xl font-bold" dangerouslySetInnerHTML={{ __html: data.text }}></h2>
    }

    if(type == "image") {
        return <Img url={data.file.url}  />
    }

    if(type == "quote"){
        return <Quote quote={data.text} caption={data.caption} />
    }
    
    if(type == "list"){
        return <List style={data.style} items={data.items} />
    }

}

export default BlogContent
