import { connectToDb } from "../../../../utils/database";
import Prompt from "../../../../models/prompt";

export const GET = async (request, { params }) => {
  try {
    const { id } = await params; // ✅ لازم await هنا

    await connectToDb();

    const prompt = await Prompt.findById(id).populate("creator");

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.error("GET error:", error);
    return new Response("Failed to fetch", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  try {
    const { id } = await params; // ✅ نفس الشيء هنا
    const { prompt, tag } = await request.json();

    await connectToDb();

    const existingPrompt = await Prompt.findById(id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.error("PATCH error:", error);
    return new Response("Failed to update Prompt", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    const { id } = await params; // ✅ هنا كمان
    await connectToDb();

    await Prompt.findByIdAndDelete(id);

    return new Response("Deleted successfully", { status: 200 });
  } catch (error) {
    console.error("DELETE error:", error);
    return new Response("Failed to delete", { status: 500 });
  }
};
