export default function ThreeRoundImage({ props }) {
    if (!props) {
        return (
            <div className="w-full h-full flex justify-around items-center py-20 flex-wrap">
                <img src="" className="w-32 h-32 rounded-full bg-gray-200" />
                <img src="" className="w-32 h-32 rounded-full bg-gray-200" />
                <img src="" className="w-32 h-32 rounded-full bg-gray-200" />
            </div>
        )
    }
    return (
        <div className="w-full h-full flex justify-around items-center py-20 flex-wrap">
            {props && props.image1 && <img src={props.image1} className="w-32 h-32 rounded-full " />}
            {props && props.image2 && <img src={props.image2} className="w-32 h-32 rounded-full " />}
            {props && props.image3 && <img src={props.image3} className="w-32 h-32 rounded-full " />}
        </div>
    )
};
