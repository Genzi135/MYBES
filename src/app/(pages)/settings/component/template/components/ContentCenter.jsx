export default function ContentCenter({ props, color }) {
    return (
        <div className="max-w-[1000px] my-8 w-full h-full min-h-[200px] flex justify-center items-center " style={{ backgroundColor: color ? color : "" }}>
            <div className="text-center p-8 text-sm">{props?.content1 ? props.content1 : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}</div>
        </div>
    )
};
