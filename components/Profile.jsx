import React from "react";
import PromptsCard from "./PromptsCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h1 className=" blue_gradient text-3xl font-bold">{name}'s Profile</h1>
      <p className="text-gray-600 mb-6">{desc}</p>

      <div className="grid gap-4">
        {data.length > 0 ? (
          data.map((post) => (
            <PromptsCard
              key={Math.random(Math.ceil()) * 10}
              post={post}
              handleEdit={() => handleEdit(post)}
              handleDelete={() => handleDelete(post)}
            />
          ))
        ) : (
          <p className="text-gray-500">No posts yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
