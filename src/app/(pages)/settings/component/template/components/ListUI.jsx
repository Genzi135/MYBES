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

export const listUI = [
    {
        id: "BigCardAndTwoSmallCard",
        props: ['image1', 'title1', "content1", 'image2', 'title2', "content2", 'image3', 'title3', "content3"],
        UI: <BigCardAndTwoSmallCard />
    }, {
        id: "WhiteTitleAndImageBackground",
        props: ['image1', 'title1'],
        UI: <WhiteTitleAndImageBackground />
    },
    {
        id: "CardX3",
        props: ['image1', 'title1', "content1", 'image2', 'title2', "content2", 'image3', 'title3', "content3"],
        UI: <CardX3 />
    }, {
        id: 'ThreeRoundImage',
        props: ['image1', 'image2', 'image3'],
        UI: <ThreeRoundImage />
    },

    {
        id: "BreakerNone",
        props: [],
        UI: <BreakerNone />
    },
    {
        id: "BreakerColor",
        props: [],
        UI: <BreakerColor />
    },
    {
        id: "BreakerText",
        props: ['title1',],
        UI: <BreakerText />
    },
    {
        id: "BreakerTextColor",
        props: ['title1',],
        UI: <BreakerTextColor />
    },
    {
        id: "BreakerStar",
        props: ['quantity'],
        UI: <BreakerStar />
    },
    {
        id: "BreakerHeart",
        props: ['quantity'],
        UI: <BreakerHeart />
    }, {
        id: "VideoRight",
        props: ['title1', 'content1', 'link'],
        UI: <VideoRight />
    }, {
        id: "VideoLeft",
        props: ['title1', 'content1', 'link'],
        UI: <VideoLeft />
    }, {
        id: "VideoCenter",
        props: ['title1', 'content1', 'link'],
        UI: <VideoCenter />
    }, {
        id: 'contentLeft',
        props: ['content1'],
        UI: <ContentLeft />
    }, {
        id: 'contentCenter',
        props: ['content1'],
        UI: <ContentCenter />
    }, {
        id: 'contentRight',
        props: ['content1'],
        UI: <ContentRight />
    }
]