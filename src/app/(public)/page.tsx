import Banner from "@/components/homepage/Banner";
import CTABanner from "@/components/homepage/CTABanner";
import FaqAndContact from "@/components/homepage/FaqAndContact";
import HowItWorks from "@/components/homepage/HowItWorks";
import StatsStrip from "@/components/homepage/StatsStrip";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "A modern blogging platform to write and share your stories.",
};

export default function Home() {
  return (
    <div>
      <Banner />
      <HowItWorks />
      <StatsStrip />
      <FaqAndContact />
      <CTABanner />
    </div>
  );
}
