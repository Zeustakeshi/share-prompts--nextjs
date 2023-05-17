import PromptCardList from "./PromptCardList";

const Profile = ({ name, desc, data, loading, handleDelete = () => {} }) => {
    return (
        <div className="w-full">
            <h1 className="text-4xl font-extrabold text-left blue_gradient">
                {name} Profile
            </h1>{" "}
            <p className="my-5 desc">{desc}</p>
            <PromptCardList
                data={data}
                loading={loading}
                handleDelete={handleDelete}
            ></PromptCardList>
        </div>
    );
};

export default Profile;
