export default function ContentRight({ props, color }) {
    return (
        <div className="max-w-[1000px] my-8 w-full h-full min-h-[200px] flex justify-end items-center relative " style={{ backgroundColor: color ? color : "" }}>
            <div className="text-right p-8 text-sm max-w-[80%]">{props?.content1 ? props.content1 : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}</div>
        </div>
    )
};
