import MYBES_IMAGE from '../../../assets/logo/MYBES Logo Original-02.svg'

export const metadata = {
    title: `Kích hoạt tài khoản`,
    description: ``,
    author: `MYBES`,
    keyword: `MYBES, mybes, mybes.vn, blog mybes, mybes blog, blog website, content creator, blog, viết blog, viết bài, bài viết, AI`,
    openGraph: {
        title: `Kích hoạt tài khoản`,
        description: ``,
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