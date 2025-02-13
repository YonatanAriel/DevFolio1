import ProjectCard from "../components/ui/projectCard/projectCard";
import { getAllProjects } from "../functions/frontendFunctions/apiCalls";

export const metaData = {
  title: "DevFolio",
  description: "A place for Developers to show their Portfolios & Projects",
};

export default async function Home() {
  const projects = await getAllProjects();
  return (
    <main className="flex flex-wrap gap-4 px-2 py-20 lg:px-20 sm:justify-center lg:justify-normal justify-evenly lg:p-20">
      {projects?.map((project, i) => (
        <ProjectCard
          key={`${project.id}${i}`}
          projectName={project.name}
          developerName={project.userId.name}
          developerImg={project.userId.photo}
          developerId={project.userId._id}
          developerTitle={project.userId.occupation}
          img={project.photo}
          id={project._id}
          {...project}
        />
      ))}
    </main>
  );
}
