import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Intro } from "@/components/sections/Intro";
import { Aims } from "@/components/sections/Aims";
import { SevaBanner } from "@/components/sections/SevaBanner";
import { MissionVision } from "@/components/sections/MissionVision";
import { Stats } from "@/components/sections/Stats";
import { JournalPreview } from "@/components/sections/JournalPreview";
import { GalleryStrip } from "@/components/sections/GalleryStrip";
import { VolunteerCTA } from "@/components/sections/VolunteerCTA";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `${SITE.name} (AKA) — ${SITE.tagline}` },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Aims />
      <SevaBanner />
      <MissionVision />
      <Stats />
      <JournalPreview />
      <GalleryStrip />
      <VolunteerCTA />
    </>
  );
}
