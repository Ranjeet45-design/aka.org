import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactPanel } from "@/components/sections/ContactPanel";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Australian Khalsa Association. We value every interaction and look forward to hearing about your community initiatives.",
  alternates: { canonical: "/contact-us/" },
  openGraph: { url: "/contact-us/" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Registered Charity Australia"
        title="Contact Us"
        accent={[1]}
        intro="The Australian Khalsa Association (AKA) is a registered not-for-profit charitable Sikh organization dedicated to promoting Sikhism and uplifting the lives of individuals across Australia."
        image="parliament"
        position="50% 40%"
      />
      <ContactPanel
        variant="contact" 
        title="Connect with us"
        accent={[1]}
        lead="We value every interaction and look forward to hearing about your community initiatives."
      />
    </>
  );
}
