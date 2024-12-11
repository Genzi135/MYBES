import { BsStarFill } from "react-icons/bs";

export default function BreakerStar({ color, props }) {

    if (!props) {
        return (
            <div className="w-full h-full flex justify-center items-center min-h-[200px]">
                <BsStarFill size={50} color={color ? color : 'black'} />
            </div>
        )
    }

    let num = parseInt(props?.quantity);

    if (isNaN(num) || num <= 0) {
        num = 0;
    }

    return (
        <div className="w-full h-full flex justify-around items-center min-h-[200px] overflow-hidden flex-nowrap">
            {Array.from({ length: num }).map((_, index) => (
                <BsStarFill size={50} color={color ? color : 'black'} key={index} />
            ))}
        </div>
    )
};
