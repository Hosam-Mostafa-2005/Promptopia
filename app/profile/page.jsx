"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Profile from "../../components/Profile";
import { useRouter } from "next/navigation";

const ProfileBig = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  // Fetch posts for the logged-in user
  useEffect(() => {
    const fetchPosts = async () => {
      if (!session?.user?.id) return;

      try {
        const response = await fetch(`/api/users/${session.user.id}/posts`);
        if (!response.ok) throw new Error("Failed to fetch posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [session?.user?.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`); // ✅ هنا
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you wanna delete this prompt?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, { method: "DELETE" }); // ✅ وهنا
        setPosts((prev) => prev.filter((p) => p._id !== post._id)); // ✅ وهنا
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    }
  };

  return (
    <Profile
      name={session?.user?.name || "My"}
      desc="Welcome to your profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfileBig;
