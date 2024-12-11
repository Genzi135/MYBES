import { getBlogById } from "@/shared/blogAPI";
import PostFullPage from "./components/FullPagePost";

export async function generateMetadata({ params, searchParams }, parent) {

    const id = (await params).id

    const blogData = await getBlogById(id);

    return {
        title: `${blogData.title}`,
        author: `${blogData?.author?.name}`,
        keyword: `MYBES, mybes, mybes.vn, blog mybes, mybes blog, blog, mybes post, content creator, AI`,
        description: `${blogData?.contentTEXT}`,
        openGraph: {
            title: `MYBES blog - ${blogData.title}`,
            images: blogData?.thumbnail ? [blogData?.thumbnail] : [],
            description: `${blogData?.contentTEXT}.`,
        },
    }
}

export default function page() {
    return (
        <PostFullPage />
    )
};
