export default function VideoRight({ props, color }) {
    const getEmbedUrl = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]+)/;
        const match = url?.match(regex);
        return match ? `https://www.youtube.com/embed/${match[1]}` : "";
    };

    const embedUrl = getEmbedUrl(props?.link);

    return (
        <div className="max-w-[800px] my-8 w-full h-full min-h-[300px] flex justify-center items-center relative" >
            <div className="min-h-full w-full bg-gray-200 max-w-[58%] flex justify-center items-start absolute flex-col p-4 left-0" style={{ backgroundColor: color ? color : '' }}>
                <div className="font-bold text-2xl mb-2 ml-4 pr-10">{props?.title1 ? props.title1 : "TITLE"}</div>
                <div className="text-sm ml-4 mr-16">
                    {props?.content1 ? props.content1 : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                </div>
            </div>
            <div className="mt-4 w-[50%] h-[70%] absolute right-0">
                <iframe
                    src={embedUrl ? embedUrl : "https://www.youtube.com/embed/-6KvVfUERVA"}
                    className="w-full h-full rounded-md bg-black"
                    title="YouTube video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}
