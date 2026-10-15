import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactPanel } from "@/components/sections/ContactPanel";
import { Marquee } from "@/components/ui/Marquee";

export const metadata: Metadata = {
  title: "Become a Volunteer",
  description:
    "Join the Australian Khalsa Association's dedicated team of volunteers and make a real difference in the Australian Sikh community through seva, langar and community support.",
  alternates: { canonical: "/become-volunteer/" },
  openGraph: { url: "/become-volunteer/" },
};

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Join our team"
        title="Become a Volunteer"
        accent={[2]}
        intro="Our dedicated volunteers provide invaluable support across all our initiatives, ensuring the success of our programs and events. Join our dedicated team of volunteers and make a real difference in the community."
        image="service-crowd"
        position="50% 40%"
      />
      <Marquee
        items={["Seva", "Langar", "Community", "Unity", "Service"]}
        className="bg-primary py-5 text-ink"
      />
      <ContactPanel
        variant="volunteer"
        title="Want to contribute?"
        accent={[2]}
        lead="We value every interaction and look forward to hearing about your community initiatives. Tell us a little about yourself and how you would like to help."
      />
    </>
  );
}
