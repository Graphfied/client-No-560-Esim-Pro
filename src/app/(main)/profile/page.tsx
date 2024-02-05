import React from "react";
import { ProfileComponent } from "@/components/profilePageComponents/ProfileComponent";
import getCurrentUser from "@/actions/getCurrentUser";

const Profile = async () => {
  const currentUser: any = await getCurrentUser();

  return <ProfileComponent currentUser={currentUser} />;
};

export default Profile;
