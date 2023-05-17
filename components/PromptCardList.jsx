import { memo } from "react";

const { default: Image } = require("next/image");
const { default: PromptCard } = require("./PromptCard");

const PromptCardList = ({
    loading,
    data,
    handleClickItem = () => {},
    handelClickTagName = () => {},
    handleDelete = () => {},
}) => {
    return (
        <div
            className={`min-h-[500px] md:min-h-[600px] mt-16 prompt_layout w-full ${
                loading ? "flex-center" : ""
            }`}
        >
            {loading ? (
                <div className="w-[50px] h-[50px]">
                    <Image
                        alt="loading"
                        src="/assets/icons/loader.svg"
                        width={50}
                        height={50}
                        className="w-full h-full object-contain"
                    ></Image>
                </div>
            ) : (
                data.map((item) => {
                    return (
                        <PromptCard
                            key={item.id}
                            data={item}
                            handleClickItem={handleClickItem}
                            onClickTagname={handelClickTagName}
                            handleDelete={handleDelete}
                        ></PromptCard>
                    );
                })
            )}
        </div>
    );
};
export default memo(PromptCardList);
