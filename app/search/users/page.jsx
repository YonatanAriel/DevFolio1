"use client";
import { useSearchParams } from "next/navigation";
import ProfileCard from "../../../components/ui/profileCard/ProfileCard";
import Popup from "../../../components/ui/popup";

export default function Users() {
  const searchParams = useSearchParams();
  const profiles = JSON.parse(atob(searchParams.get("data")));
  return (
    <>
      {profiles?.length === 0 && (
        <Popup text={"Sorry, nothing was found"} goBackButton={true} />
      )}
      <div className="flex flex-wrap gap-10 py-20 sm:px-10 lg:justify-start justify-evenly lg:p-20">
        {profiles?.map((p, i) => (
          <ProfileCard key={`${p._id}${i}`} id={p._id} img={p.photo} {...p} />
        ))}
      </div>
    </>
  );
}
