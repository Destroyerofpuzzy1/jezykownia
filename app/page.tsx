import { LeadFormProvider } from "@/components/lead/LeadFormProvider";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MobileActionBar } from "@/components/MobileActionBar";
import { Hero } from "@/components/sections/Hero";
import { GoalSelector } from "@/components/sections/GoalSelector";
import { Subjects } from "@/components/sections/Subjects";
import { EarlyGrades } from "@/components/sections/EarlyGrades";
import { OlderStudents } from "@/components/sections/OlderStudents";
import { Exams } from "@/components/sections/Exams";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { SecondCta } from "@/components/sections/SecondCta";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <LeadFormProvider>
      <SiteHeader />
      <main id="main">
        <Hero />
        <GoalSelector />
        <Subjects />
        <EarlyGrades />
        <OlderStudents />
        <Exams />
        <Process />
        <Reviews />
        <SecondCta />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <MobileActionBar />
    </LeadFormProvider>
  );
}
