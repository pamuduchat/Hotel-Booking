import React from "react";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Header />
      <div className="home-container">
        <Featured />
        <h1 className="home-title">
          Embark on a journey of diverse accommodations...
        </h1>
        <PropertyList />
        <h1 className="home-title">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
}
