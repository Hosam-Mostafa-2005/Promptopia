import React from "react";
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-2xl mx-auto flex flex-col items-start">
      <h1 className="head_text text-left mb-2">
        <span className="blue_gradient">{type} Post</span>
      </h1>

      <p className="desc text-left max-w-md mb-8">
        {type} and share an amazing prompt with the world
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col gap-6 bg-gray-300 text-gray-700 p-8 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.4)] border border-gray-800 backdrop-blur-md transition-transform hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
      >
        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-900 mb-2">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="w-full p-3 rounded-lg bg-gray-400 text-gray-900 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={6}
          />
        </label>

        <label className="flex flex-col">
          <span className="font-satoshi font-semibold text-base text-gray-900 mb-2">
            Tag{" "}
            <span className="font-normal text-gray-400">
              (#Product, #Idea, #Webdev)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#Tag"
            required
            className="w-full p-3 rounded-lg bg-gray-400 text-gray-900 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        <div className="flex justify-between items-center pt-4">
          <Link
            href="/"
            className="text-gray-400 text-sm hover:text-gray-200 transition"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
