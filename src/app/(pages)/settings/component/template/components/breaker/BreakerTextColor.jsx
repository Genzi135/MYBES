
export default function BreakerTextColor({ props, color }) {
    if (!props) {
        return (
            <div className="w-full h-full flex justify-center items-center min-h-[200px]">
                <div className="text-3xl font-semibold " style={{ color: color }}>TITLE</div>
            </div>
        )
    }
    return (
        <div className="w-full h-full flex justify-center items-center min-h-[200px]">
            <div className="text-3xl font-semibold " style={{ color: color }}>{props?.title1}</div>
        </div>
    )
};


