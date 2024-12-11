import MYBES_IMAGE from '../../../assets/logo/MYBES Logo Original-02.svg'

export const metadata = {
    title: `Quên mật khẩu`,
    description: ``,
    author: `MYBES`,
    keyword: `MYBES, mybes, mybes.vn, blog mybes, mybes blog, blog website, content creator, blog, viết blog, viết bài, bài viết, AI`,
    openGraph: {
        title: `Quên mật khẩu`,
        description: ``,
        images: MYBES_IMAGE.src,
    },
}

export default async function LayoutForgotPassword({ children }) {
    return (
        <>
            <main>{children}</main>
        </>
    )
}