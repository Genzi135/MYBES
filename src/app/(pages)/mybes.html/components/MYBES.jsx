'use client'
import MYBES_LOGO from '../../../../assets/logo/MYBES Logo Original-02.svg';
import MYBES_ICON from '../../../../assets/logo/MYBES Logo Original-05.svg';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import ChatBotDocs from './ChatBotDocs';
import Helps from './helps';
import IntroduceMYBES from './introduceMYBES';
import Privacy from './privacyPolycy';
import Terms from './term';
import Image from 'next/image';

export default function MYBESpage() {

    const t = useTranslations('MYBES');



    const [viewState, setViewState] = useState('MYBES');

    return (
        <div className="min-h-[90vh] flex flex-col justify-start items-center w-full max-w-[1000px] gap-2 text-lg my-6 px-2 md:px-0">
            <div className='w-full flex flex-col justify-center items-center gap-2 text-center'>
                <div className='mb-8 mt-4'>
                    <Image src={MYBES_LOGO} width={'100%'} height={'100%'} alt='logo' className='sm:max-w-[400px] max-w-[250px]' />
                </div>
                <div>Xin chào, chào mừng bạn đến với MYBES</div>
                <div>Lời đầu tiên, cảm ơn bạn đã đến và sử dụng website của chúng mình</div>
                <div className='mt-4 sm:text-2xl text-xl font-semibold cursor-default border-b border-black'>Giới thiệu</div>
                <div className='flex'>
                    <div className='font-semibold mr-[2px]'>MYBES</div> là gì? MYBES là viết tắt của logan "Make your blog easy & simple "
                </div>
                <div>MYBES là một blog website, MYBES được tạo ra để phục vụ cho những người sáng tạo nội dung với sự hỗ trợ từ AI (OpenAi), MYBES cung cấp 1 editor có hỗ trợ đa dạng các chức năng giúp người dùng tùy chỉnh bài viết (blog) của mình, MYBES còn hỗ trợ người dùng tùy chỉnh trang cá nhân với những template mà MYBES cung cấp giúp người dùng tự do sáng tạo và chỉnh sửa trang cá nhân của riêng mình.</div>
                <div className='mt-4 sm:text-2xl text-xl font-semibold cursor-default border-b border-black'>Câu chuyện</div>
                <div>
                    Xin chào, mình tên là Huỳnh Phú (Genzi), mình là sinh viên của trường Đại học Công nghiệp TP. Hồ Chí Minh (IUH)
                </div>
                <div>
                    MYBES là dự án tốt nghiệp của mình, dự án bắt đầu được lên ý tưởng, thiết kế và hiện thực từ 8/2024 và hoàn thành vào 11/2024, ý tưởng dự án được thầy Th.s Nguyễn Trọng Tiến đưa ra cho mình, ban đầu sẽ là 1 blog website về công nghệ (hoặc tương tự Medium.com) nhưng mình đã xin phép thầy để có thể thay đổi về mục đích của website khi mình khảo sát, hỏi ý kiến từ những người bạn, người quen trên mạng xã hội và những anh chị content creator, khi ai cũng có nhu cầu muốn có 1 website cá nhân hóa mà rào cản lớn nhất bên cạnh kiến thức về công nghệ là "giá cả làm website khá cao" vì vậy mình đã nảy ra 1 ý tưởng là sẽ làm 1 website blog có thể tùy chỉnh trang cá nhân, có thể chia sẽ dữ liệu của bài blog và tối ưu hóa SEO cho người dùng. Và thế là mình đã bắt tay vào hiện thực MYBES
                </div>

                <div className='mt-4 sm:text-2xl text-xl font-semibold cursor-default border-b border-black'>Lời cảm ơn</div>
                <div>
                    Em xin được trân trọng gửi lời cảm ơn đến Th.s Nguyễn Trọng Tiến vì đã chấp nhận, cho phép thực hiện, đồng hành và hỗ trợ em trong lúc thực hiện dự án lần này, cảm ơn những lời khuyên, lời góp ý và những sự chỉ dẫn của thầy rất nhiều.
                </div>
                <div>
                    Em xin được gửi lời cảm ơn đến những người bạn, những người anh người chị đã góp ý để em có thể hoàn thiện những điều còn sai sót, sửa chữa những lỗi còn tồn tại trong website. Cảm ơn những động lực mà mọi người đã tạo cho em. Cảm ơn mọi người rất nhiều
                </div>
            </div>
            <div id='introduce'></div>
            <IntroduceMYBES />
            <div id='helps'></div>
            <div className='mt-4 sm:text-2xl text-xl font-semibold cursor-default border-b border-black'>Trợ giúp</div>
            <Helps />
            <div id='chatBotAI'></div>
            <div className='mt-4 sm:text-2xl text-xl font-semibold cursor-default border-b border-black'>Chat bot AI</div>
            <ChatBotDocs />
            <div id='privacy'></div>
            <Privacy />
            <div id='terms'></div>
            <Terms />
        </div>
    )
}
