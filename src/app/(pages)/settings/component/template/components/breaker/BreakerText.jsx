
export default function BreakerText({ props }) {
    if (!props) {
        return (
            <div className="w-full h-full flex justify-center items-center min-h-[200px]">
                <div className="text-3xl font-semibold text-black">TITLE</div>
            </div>
        )
    }
    return (
        <div className="w-full h-full flex justify-center items-center min-h-[200px]">
            <div className="text-3xl font-semibold text-black">{props?.title1}</div>
        </div>
    )
};


