import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import NewFeatures from "./NewFeatures";

const Home = () => {
  return (
    <div>
      <Header />
      <NewFeatures/>
      {/* <SpecialityMenu/> */}
      <TopDoctors/>
      {/* <Banner/> */}
    </div>
  );
};

export default Home;
