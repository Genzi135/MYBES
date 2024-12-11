import ContentCenter from "../settings/component/template/components/ContentCenter";
import ContentLeft from "../settings/component/template/components/ContentLeft";
import ContentRight from "../settings/component/template/components/ContentRight";
import VideoCenter from "../settings/component/template/components/VIdeoCenter";
import VideoLeft from "../settings/component/template/components/VideoLeft";

export default function page(params) {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <ContentCenter />
        </div>
    )
};
