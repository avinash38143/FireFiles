import React from "react";
import { NavigationComponent } from "../../../components/HeroComponents/HomePageComponents";
import HeroComponent from "../../../components/HeroComponents/HeroComponent";

const HomePage = () => {
  return (
    <div style={{backgroundColor: "rgb(254 226 226)"}} >
      <NavigationComponent />
      
      <h3 className="display-4 my-3 p-2 text-center ">
        File Management System.
      </h3>
      <HeroComponent />
      
    </div>
  );
};
//sorry wo mummy dekh rhi ha to ussi ka awj aa raha hoga

export default HomePage;
