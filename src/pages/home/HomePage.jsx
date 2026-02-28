import AboutUs from "../../components/hero/AboutUs";
import FAQs from "../../components/hero/FAQs";
import FeaturedTreks from "../../components/hero/FeaturedTreks";
import Gallery from "../../components/hero/Gallery";
import Hero from "../../components/hero/Hero";
import PopularTreks from "../../components/hero/PopularTreks";
import Testimonials from "../../components/hero/Testimonials";
import TrekCategories from "../../components/hero/TrekCategories";
import UpcomingDepartures from "../../components/hero/UpcomingDepartures";
import Booking from "../../components/hero/Booking";
import HowItWorks from "../../components/hero/HowItWorks";
import SafetySection from "../../components/hero/SafetySection";
import WhyChooseUs from "../../components/hero/WhyChooseUs";
import CTASection from "../../components/hero/CTASection";

const HomePage = () => {
  return (
    <>
      <Hero />
      <UpcomingDepartures />
      <PopularTreks />
      <TrekCategories />
      <AboutUs />
      <FeaturedTreks />
      <HowItWorks />
      <Gallery />
      <WhyChooseUs />
       <SafetySection />
      <Testimonials />
       <FAQs />
      {/* <Booking /> */}
      {/* <CTASection />  */}
    </>
  );
};

export default HomePage;
