import MYBES_IMAGE from '../../../../assets/logo/MYBES Logo Original-02.svg'

export const metadata = {
    title: `MYBES - Chỉnh sửa bài viết`,
    description: `Chỉnh sửa nội dung và các thông tin bài viết của bạn`,
    author: `MYBES`,
    keyword: `MYBES, mybes, mybes.vn, blog mybes, mybes blog, blog website, content creator, blog, viết blog, viết bài, bài viết, AI`,
    openGraph: {
        title: `MYBES - Chỉnh sửa bài viết`,
        description: `Chỉnh sửa nội dung và các thông tin bài viết của bạn`,
        images: MYBES_IMAGE.src,
    },
}

export default async function LayoutEdit({ children }) {
    return (
        <>
            <main>{children}</main>
        </>
    )
}