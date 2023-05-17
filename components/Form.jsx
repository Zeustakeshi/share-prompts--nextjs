"use client";
import Link from "next/link";

const Form = ({
    type,
    post,
    setPost,
    submiting,
    setSubmiting,
    handleSubmit = () => {},
}) => {
    return (
        <div className="w-full max-w-full flex-start flex-col">
            <h1 className=" text-4xl font-extrabold text-left">
                <span className="blue_gradient">{type} Prompt</span>
            </h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                }}
                className="glassmorphism w-full max-w-2xl flex flex-col gap-7 mt-10"
            >
                <label className="w-full flex flex-col justify-start items-start">
                    <span className="text-xl font-semibold text-gray-800 mb-5">
                        Your AI Prompt
                    </span>
                    <textarea
                        value={post.prompt}
                        onChange={(e) => {
                            setPost({ ...post, prompt: e.target.value });
                        }}
                        required
                        className="form_textarea mt-10 h-20"
                        placeholder="write prompt here ..."
                    ></textarea>
                </label>
                <label className="w-full flex flex-col justify-start items-start">
                    <span className="mb-5">
                        <span className="text-xl font-semibold text-gray-800 ">
                            Tag{" "}
                        </span>{" "}
                        (#product, #web-development, #content, #maketing, ....)
                    </span>

                    <input
                        value={post.tag}
                        onChange={(e) =>
                            setPost({ ...post, tag: `${e.target.value}` })
                        }
                        className="form_input mt-10"
                        placeholder="#Tag"
                        required
                    />
                </label>
                <div className="flex flex-col sm:flex-row  sm:justify-end gap-5">
                    <button
                        disabled={submiting}
                        className="black_btn disabled:bg-opacity-50 "
                        type="submit"
                    >
                        {submiting ? type + "...." : type}
                    </button>
                    <Link href="/" className="outline_btn">
                        cancel
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Form;
