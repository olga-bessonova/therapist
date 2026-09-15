import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import HelpGrid from "../components/HelpGrid";
import Pricing from "../components/Pricing";
import Prep from "../components/Prep";
import Reviews from "../components/Reviews";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const el = document.querySelector(location.hash);
    el?.scrollIntoView({ behavior: "smooth" });
  }, [location.hash]);

  return (
    <>
      <Hero />
      <HelpGrid />
      <Pricing />
      <Prep />
      <Reviews />
    </>
  );
}
