import HeaderAvatarLeft from "./HeaderAvatarLeft";
import HeaderDefault from "./HeaderDefault";
import HeaderMiniAvatarLeft from "./HeaderMiniAvatarLeft";

export default function HeaderSelected({ id, props }) {

    switch (id) {
        case "HeaderDefault":
            return <HeaderDefault props={props} />;
        case "HeaderAvatarLeft":
            return <HeaderAvatarLeft props={props} />;
        case "HeaderMiniAvatarLeft":
            return <HeaderMiniAvatarLeft props={props} />;
        default:
            return  // UI mặc định khi ID không hợp lệ
    }
}
