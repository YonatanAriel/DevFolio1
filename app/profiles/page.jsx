import ProfileCard from "../../components/ui/profileCard/ProfileCard";
import { getAllUsers } from "../../functions/frontendFunctions/apiCalls";

export const metaData = {
  title: "profiles",
};

export default async function Profiles() {
  const profiles = await getAllUsers();

  return (
    <div className="flex  flex-wrap lg:justify-start justify-evenly gap-10 py-20 px-10 lg:p-20">
      {profiles?.map((p) => (
        <ProfileCard
          key={p._id}
          id={p._id}
          img={p.photo}
          name={p.name}
          about={p.about}
          links={p.links}
          totalLikes={p.totalLikes}
          portfolioLink={p.portfolioLink}
          occupation={p.occupation}
        />
      ))}
    </div>
  );
}
