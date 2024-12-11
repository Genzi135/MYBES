import MYBES_IMAGE from '../../../assets/logo/MYBES Logo Original-02.svg'

export const metadata = {
    title: `Chính sách riêng tư`,
    description: `Tham khảo về chính sách về quyền riêng tư đối với người dùng`,
    author: `MYBES`,
    keyword: `MYBES, mybes, mybes.vn, blog mybes, mybes blog, blog website, content creator, blog, viết blog, viết bài, bài viết, AI`,
    openGraph: {
        title: `Chính sách riêng tư`,
        description: `Tham khảo về chính sách về quyền riêng tư đối với người dùng`,
        images: MYBES_IMAGE.src,
    },
}

export default async function LayoutPrivacy({ children }) {
    return (
        <>
            <main>{children}</main>
        </>
    )
}