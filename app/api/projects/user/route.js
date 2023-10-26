import { NextResponse } from "next/server";
import { Project } from "../../../../DL/models/Project.model";
import connectToDB from "../../../../DL/connectToDB";
import { User } from "../../../../DL/models/User.model";

export async function GET(request) {
  await connectToDB();
  const userId = request.nextUrl.searchParams.get("id");
  // const { projects } = await User.findById(userId).populate("projects");
  const projects = await Project.find({ userId: userId }).populate(
    "userId",
    "name occupation photo"
  );
  console.log(projects);
  return new NextResponse(JSON.stringify(projects), { status: 200 });
}
