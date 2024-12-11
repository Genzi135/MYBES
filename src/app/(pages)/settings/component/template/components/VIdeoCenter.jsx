export default function VideoCenter({ props, color }) {
    const getEmbedUrl = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([\w-]+)/;
        const match = url?.match(regex);
        return match ? `https://www.youtube.com/embed/${match[1]}` : "";
    };

    const embedUrl = getEmbedUrl(props?.link);

    return (
        <div className="max-w-[1000px] my-8 w-full h-full min-h-[350px] flex justify-center items-center relative" >
            <div className="min-h-full w-full bg-gray-200 flex justify-center items-center absolute flex-col p-4 right-0 text-center" style={{ backgroundColor: color ? color : '' }}>
                <div className="font-bold text-2xl mb-2 ">{props?.title1 ? props.title1 : "TITLE"}</div>
                <div className="text-sm px-4">
                    {props?.content1 ? props.content1 : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                </div>
                <div className="mt-4 w-[auto] h-full left-0">
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
        </div>
    );
}
