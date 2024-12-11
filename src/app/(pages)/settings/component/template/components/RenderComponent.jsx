import BigCardAndTwoSmallCard from "./BigCardAndTwoSmallCard";
import BreakerColor from "./breaker/BreakerColor";
import BreakerHeart from "./breaker/BreakerHeart";
import BreakerNone from "./breaker/BreakerNone";
import BreakerStar from "./breaker/BreakerStar";
import BreakerText from "./breaker/BreakerText";
import BreakerTextColor from "./breaker/BreakerTextColor";
import CardX3 from "./CardX3";
import ThreeRoundImage from "./ThreeRoundImage";
import WhiteTitleAndImageBackground from "./WhiteTitleAndImageBackground";

export default function RenderComponent({ id, props, color }) {
    switch (id) {
        case "WhiteTitleAndImageBackground":
            return <WhiteTitleAndImageBackground props={props} />
        case "BigCardAndTwoSmallCard":
            return <BigCardAndTwoSmallCard props={props} />
        case "CardX3":
            return <CardX3 props={props} />
        case "ThreeRoundImage":
            return <ThreeRoundImage props={props} />
        case "BreakerNone":
            return <BreakerNone />
        case "BreakerColor":
            return <BreakerColor color={color} />
        case "BreakerStar":
            return <BreakerStar color={color} props={props} />
        case "BreakerHeart":
            return <BreakerHeart color={color} props={props} />
        case "BreakerText":
            return <BreakerText props={props} />
        case "BreakerTextColor":
            return <BreakerTextColor props={props} color={color} />
        default:
            return;
    }
};
