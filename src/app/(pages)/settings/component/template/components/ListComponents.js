import BigCardAndTwoSmallCard from "./BigCardAndTwoSmallCard";
import CardX3 from "./CardX3";
import ThreeRoundImage from "./ThreeRoundImage";
import WhiteTitleAndImageBackground from "./WhiteTitleAndImageBackground";

export const listComponents = [
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



]