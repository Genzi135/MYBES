export default function CardX3({ props }) {
    if (!props) {
        return (
            <div className="flex justify-around items-center flex-wrap gap-4 ">
                <div className="flex flex-col max-w-[240px] shadow rounded">
                    <img src="" className="w-full  h-full min-h-[240px] bg-gray-200" alt="250x250" />
                    <div className="flex flex-col p-2">
                        <div className="text-2xl font-semibold">Title</div>
                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nisi nunc. Phasellus volutpat laoreet dapibus.</div>
                    </div>
                </div>
                <div className="flex flex-col max-w-[240px] shadow rounded">
                    <img src="" className="w-full h-full min-h-[240px] bg-gray-200" alt="250x250" />
                    <div className="flex flex-col p-2">
                        <div className="text-2xl font-semibold">Title</div>
                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nisi nunc. Phasellus volutpat laoreet dapibus.</div>
                    </div>
                </div>
                <div className="flex flex-col max-w-[240px] shadow rounded">
                    <img src="" className="w-full h-full min-h-[240px] bg-gray-200" alt="250x250" />
                    <div className="flex flex-col p-2">
                        <div className="text-2xl font-semibold">Title</div>
                        <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nisi nunc. Phasellus volutpat laoreet dapibus.</div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-around items-center flex-wrap gap-4 ">
            {props && props.image1 && <div className="flex flex-col max-w-[240px] shadow rounded">
                <img src={props?.image1} className="w-full  h-full min-h-[240px] bg-gray-200" alt="250x250" />
                <div className="flex flex-col p-2">
                    <div className="text-2xl font-semibold">{props?.title1}</div>
                    <div>{props?.content1}</div>
                </div>
            </div>}
            {props && props.image2 && <div className="flex flex-col max-w-[240px] shadow rounded">
                <img src={props?.image2} className="w-full h-full min-h-[240px] bg-gray-200" alt="250x250" />
                <div className="flex flex-col p-2">
                    <div className="text-2xl font-semibold">{props?.title2}</div>
                    <div>{props?.content2}</div>
                </div>
            </div>}
            {props && props.image3 && <div className="flex flex-col max-w-[240px] shadow rounded">
                <img src={props?.image3} className="w-full h-full min-h-[240px] bg-gray-200" alt="250x250" />
                <div className="flex flex-col p-2">
                    <div className="text-2xl font-semibold">{props?.title3}</div>
                    <div>{props?.content3}</div>
                </div>
            </div>}
        </div>
    )
};
