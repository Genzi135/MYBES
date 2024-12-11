import MYBES_IMAGE from '../../../assets/logo/MYBES Logo Original-02.svg'

export const metadata = {
    title: `MYBES - Điều khoản`,
    description: `Tham khảo về những điều khoản mà MYBES cung cấp`,
    author: `MYBES`,
    keyword: `MYBES, mybes, mybes.vn, blog mybes, mybes blog, blog website, content creator, blog, viết blog, viết bài, bài viết, AI`,
    openGraph: {
        title: `MYBES - Điều khoản`,
        description: `Tham khảo về những điều khoản mà MYBES cung cấp`,
        images: MYBES_IMAGE.src,
    },
}

export default async function LayoutSearch({ children }) {
    return (
        <>
            <main>{children}</main>
        </>
    )
}