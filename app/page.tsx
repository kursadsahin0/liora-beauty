import { BookingContact } from "@/components/home/BookingContact/BookingContact";
import { BrandIntro } from "@/components/home/BrandIntro/BrandIntro";
import { BrandStory } from "@/components/home/BrandStory/BrandStory";
import { Gallery } from "@/components/home/Gallery/Gallery";
import { Hero } from "@/components/home/Hero/Hero";
import { Pricing } from "@/components/home/Pricing/Pricing";
import { Services } from "@/components/home/Services/Services";
import { Team } from "@/components/home/Team/Team";
import { Testimonials } from "@/components/home/Testimonials/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandIntro />
      <BrandStory />
      <Services />
      <Gallery />
      <Team />
      <Pricing />
      <Testimonials />
      <BookingContact />
    </>
  );
}
