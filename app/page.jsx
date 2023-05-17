import Feed from "@/components/Feed";

export default function Home() {
    return (
        <main className="flex-center flex-col ">
            <h1 className="head_text text-center">
                Discover & Share <br className="md:hidden" />
                <span className="orange_gradient text-center ">
                    Ai-Powered Prompts
                </span>
            </h1>
            <p className="desc text-center mb-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel
                possimus itaque, quod modi maiores libero labore neque non
                nesciunt dolore exercitationem minima magnam impedit facere
                nostrum omnis perspiciatis repudiandae? Corrupti?
            </p>
            <Feed></Feed>
        </main>
    );
}
