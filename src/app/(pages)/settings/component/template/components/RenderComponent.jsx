import BigCardAndTwoSmallCard from "./BigCardAndTwoSmallCard";
import BreakerColor from "./breaker/BreakerColor";
import BreakerHeart from "./breaker/BreakerHeart";
import BreakerNone from "./breaker/BreakerNone";
import BreakerStar from "./breaker/BreakerStar";
import BreakerText from "./breaker/BreakerText";
import BreakerTextColor from "./breaker/BreakerTextColor";
import CardX3 from "./CardX3";
import ContentCenter from "./ContentCenter";
import ContentLeft from "./ContentLeft";
import ContentRight from "./ContentRight";
import ThreeRoundImage from "./ThreeRoundImage";
import VideoCenter from "./VIdeoCenter";
import VideoLeft from "./VideoLeft";
import VideoRight from "./VideoRight";
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
        case "VideoRight":
            return <VideoRight props={props} color={color} />
        case "VideoLeft":
            return <VideoLeft props={props} color={color} />
        case "VideoCenter":
            return <VideoCenter props={props} color={color} />
        case "contentLeft":
            return <ContentLeft props={props} color={color} />
        case "contentCenter":
            return <ContentCenter props={props} color={color} />
        case "contentRight":
            return <ContentRight props={props} color={color} />
        default:
            return;
    }
};
