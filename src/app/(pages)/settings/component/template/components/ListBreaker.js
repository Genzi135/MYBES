import BreakerColor from "./breaker/BreakerColor";
import BreakerHeart from "./breaker/BreakerHeart";
import BreakerNone from "./breaker/BreakerNone";
import BreakerStar from "./breaker/BreakerStar";
import BreakerText from "./breaker/BreakerText";
import BreakerTextColor from "./breaker/BreakerTextColor";

export const listBreaker = [
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
    },
]