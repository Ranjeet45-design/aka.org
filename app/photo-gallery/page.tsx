import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { VolunteerCTA } from "@/components/sections/VolunteerCTA";

export const metadata: Metadata = {
  title: "Photo Gallery",
  description:
    "Photos from Australian Khalsa Association events: ANZAC Day marches, community service, school support and meetings with community and government leaders.",
  alternates: { canonical: "/photo-gallery/" },
  openGraph: { url: "/photo-gallery/" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Community in focus"
        title="Photo Gallery"
        accent={[1]}
        image="march-park"
        position="50% 45%"
      />
      <section className="section-y bg-background">
        <div className="gutter mx-auto max-w-[110rem]">
          <GalleryGrid />
        </div>
      </section>
      <VolunteerCTA />
    </>
  );
}
