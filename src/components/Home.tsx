import { FunctionComponent } from "react";
import Navbar from "./Navbar";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <>
      <Navbar />
      Home
    </>
  );
};

export default Home;
