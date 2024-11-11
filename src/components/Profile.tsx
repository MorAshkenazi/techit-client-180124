import { FunctionComponent } from "react";
import Navbar from "./Navbar";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  return (
    <>
      <Navbar />
      Profile
    </>
  );
};

export default Profile;
