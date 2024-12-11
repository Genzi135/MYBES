

export default function BigCardAndTwoSmallCard({ props }) {
    if (!props) {
        return (
            <div className="flex justify-center items-start flex-wrap gap-2 w-full h-full sm:h-[390px] mt-2">
                <div className="flex flex-col w-[100%] sm:w-[49%] gap-1">
                    <img src="" className="h-[200px] w-full bg-gray-200" alt="200x400" />
                    <div className="text-2xl font-semibold">Title</div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nisi nunc. Phasellus volutpat laoreet dapibus. Nunc at molestie arcu. In nec lobortis elit, id convallis justo. Vivamus eu elementum est. Quisque luctus ac augue in fringilla.</div>
                </div>
                <div className="flex flex-col w-[100%]  sm:w-[49%] gap-1">
                    <div className="flex w-[100%] gap-2">
                        <img src="" className="h-[175px] max-w-[50%] w-full bg-gray-200" alt="180x180" />
                        <div className="flex flex-col gap-1 max-w-[50%] w-full">
                            <div className="text-2xl font-semibold">Title</div>
                            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nisi nunc. Phasellus volutpat laoreet dapibus.
                            </div>
                        </div>
                    </div>
                    <div className="flex w-[100%] gap-2">
                        <img src="" className="h-[175px] max-w-[50%] w-full bg-gray-200" alt="180x180" />
                        <div className="flex flex-col gap-1 max-w-[50%] w-full">
                            <div className="text-2xl font-semibold">Title</div>
                            <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla at nisi nunc. Phasellus volutpat laoreet dapibus.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-center items-start flex-wrap gap-2 w-full h-[390px] mt-2">
            <div className="flex flex-col w-[100%] sm:w-[49%] gap-1">
                <img src={props?.image1} className="h-[200px] w-full bg-gray-200" alt="400x200" />
                <div className="text-2xl font-semibold">{props?.title1}</div>
                <div>{props?.content1}</div>
            </div>
            <div className="flex flex-col w-[100%]  sm:w-[49%] gap-1">
                <div className="flex w-[100%] gap-2">
                    <img src={props?.image2} className="h-[175px] max-w-[50%] w-full bg-gray-200" />
                    <div className="flex flex-col gap-1 max-w-[50%] w-full">
                        <div className="text-2xl font-semibold">{props?.title2}</div>
                        <div>
                            {props?.content2}
                        </div>
                    </div>
                </div>
                <div className="flex w-[100%] gap-2">
                    <img src={props?.image3} className="h-[175px] max-w-[50%] w-full bg-gray-200" />
                    <div className="flex flex-col gap-1 max-w-[50%] w-full">
                        <div className="text-2xl font-semibold">{props?.title3}</div>
                        <div>
                            {props?.content3}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
