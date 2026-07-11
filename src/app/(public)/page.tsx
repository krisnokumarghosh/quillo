import Banner from "@/components/homepage/Banner";
import CTABanner from "@/components/homepage/CTABanner";
import FaqAndContact from "@/components/homepage/FaqAndContact";
import HowItWorks from "@/components/homepage/HowItWorks";
import StatsStrip from "@/components/homepage/StatsStrip";

export const metadata = {
  title: "Home | Quillo",
};

export default function Home() {
  return (
    <div>
      <Banner />
      <HowItWorks/>
      <StatsStrip/>
      <FaqAndContact/>
      <CTABanner/>
    </div>
  );
}
