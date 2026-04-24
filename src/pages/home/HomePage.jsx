import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import StaySection from "../../components/hero/StaySection";
import CTASection from "../../components/hero/CTASection";
import { fetchTreksAsync } from "../../store/slices/trekSlice";

/**
 * A wrapper component that uses IntersectionObserver to detect when a section
 * enters the viewport. It handles mounting the section and triggering callbacks.
 */
const SectionWrapper = ({ children, onVisible, threshold = 0.1, rootMargin = "100px", minHeight = "200px" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (onVisible) onVisible();
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [onVisible, threshold, rootMargin]);

  return (
    <div
      ref={sectionRef}
      style={{ minHeight: isVisible ? "auto" : minHeight }}
      className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
    >
      {isVisible ? children : null}
    </div>
  );
};

const HomePage = () => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.treks.status);
  const hasFetched = useRef(false);

  // Memoized callback to trigger trek data fetching
  const triggerTrekFetch = useCallback(() => {
    // Check both Redux status and our local ref to prevent duplicate simultaneous calls
    if (status === "idle" && !hasFetched.current) {
      hasFetched.current = true;
      dispatch(fetchTreksAsync());
    }
  }, [status, dispatch]);

  return (
    <>
      {/* Hero is usually visible on load, so we don't necessarily need to observe it, 
          but we can wrap it for consistency or use a higher threshold */}
      <Hero />

      <SectionWrapper onVisible={triggerTrekFetch} minHeight="600px">
        <UpcomingDepartures />
      </SectionWrapper>

      <SectionWrapper onVisible={triggerTrekFetch} minHeight="600px">
        <PopularTreks />
      </SectionWrapper>

      <SectionWrapper minHeight="500px">
        <TrekCategories />
      </SectionWrapper>

      <SectionWrapper minHeight="600px">
        <AboutUs />
      </SectionWrapper>

      <SectionWrapper onVisible={triggerTrekFetch} minHeight="600px">
        <FeaturedTreks />
      </SectionWrapper>

      <SectionWrapper minHeight="400px">
        <HowItWorks />
      </SectionWrapper>

      <SectionWrapper minHeight="500px">
        <Gallery />
      </SectionWrapper>

      <SectionWrapper minHeight="400px">
        <WhyChooseUs />
      </SectionWrapper>

      <SectionWrapper minHeight="400px">
        <SafetySection />
      </SectionWrapper>

      {/* <SectionWrapper minHeight="500px">
        <Testimonials />
      </SectionWrapper> */}

      <SectionWrapper minHeight="400px">
        <FAQs />
      </SectionWrapper>

      {/* <SectionWrapper minHeight="400px">
        <Booking />
      </SectionWrapper> */}

      {/* <SectionWrapper minHeight="300px">
        <CTASection /> 
      </SectionWrapper> */}
    </>
  );
};

export default HomePage;

