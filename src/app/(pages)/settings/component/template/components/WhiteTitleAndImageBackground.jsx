export default function WhiteTitleAndImageBackground({ props }) {

    if (!props) {
        return (
            <div className="flex justify-center items-center w-full h-[390px] bg-gray-200 relative">
                <img src="" className="h-full w-full" alt="400x800" />
                <div className="text-white text-3xl font-bold absolute">TITLE</div>
            </div>
        )
    }
    return (
        <div className="flex justify-center items-center w-full h-[390px] bg-gray-200  relative">
            <img src={props?.image1} className="h-full w-full" alt="background image" />
            <div className="text-white text-3xl font-bold absolute">{props?.title1}</div>
        </div>
    )
};
