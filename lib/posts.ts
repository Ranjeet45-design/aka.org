import type { PhotoKey } from "./images";

export type Block =
  | { t: "h"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] };

export type Post = {
  slug: string;
  date: string; // ISO yyyy-mm-dd — matches the original WordPress permalink date
  title: string;
  excerpt: string;
  image: PhotoKey;
  body: Block[];
};

/** Articles are preserved from aka.org.au (same dates, slugs and wording). */
export const POSTS: Post[] = [
  {  
    slug: "blog-2",
    date: "2025-10-27",
    title: "Meeting at Parliament House to Recognise Sikh ANZAC Legacy",
    excerpt:
      "Representatives of AKA met government leaders at Parliament House, Canberra, to discuss recognising the long-standing service of Australian Sikhs.",
    image: "parliament",
    body: [
      { t: "h", text: "Meeting with Government Leaders to Honour Sikh ANZAC Contributions" },
      { t: "p", text: "The Australian Khalsa Association (AKA) continues to play a vital role in recognising and honouring the contributions of Sikh ANZACs and the broader Sikh community in Australia. In a significant step towards this mission, representatives of AKA recently had the privilege of meeting with key government leaders at Parliament House, Canberra." },
      { t: "p", text: "During this important meeting, AKA members were joined by Dr Mike Freelander and the Minister for Veterans’ Affairs, Matt Keogh. The discussion focused on acknowledging the long-standing service and sacrifices made by Australian Sikhs in defence of the nation." },
      { t: "h", text: "Recognising Sikh Contributions to ANZAC History" },
      { t: "p", text: "For many years, the Australian Khalsa Association has actively participated in ANZAC Day services, particularly in Campbelltown, where their presence has become widely recognised. Their efforts aim to highlight the often-overlooked role of Sikh soldiers and ensure their contributions are respectfully remembered and celebrated." },
      { t: "p", text: "The meeting provided an opportunity to further these efforts by discussing the establishment of potential monuments dedicated to Sikh ANZACs. These monuments would serve as a lasting tribute to those who have supported Australian personnel in both domestic and international operations." },
      { t: "h", text: "A Step Towards Greater Recognition" },
      { t: "p", text: "This engagement marks an important milestone in strengthening the recognition of cultural diversity within Australia’s military history. By working closely with government representatives, AKA is helping to ensure that the legacy of Sikh service members is preserved for future generations." },
      { t: "h", text: "Looking Ahead" },
      { t: "p", text: "The Australian Khalsa Association remains committed to its mission of seva (selfless service) and community contribution. Through initiatives like ANZAC participation and collaborations with government leaders, AKA continues to build awareness, unity, and respect across communities." },
    ],
  },
  {
    slug: "hot-meals-warm-hearts-serving-the-community-with-compassion",
    date: "2025-05-20",
    title: "Hot Meals, Warm Hearts: Serving the Community with Compassion",
    excerpt:
      "AKA continues to embody the spirit of seva by serving free hot vegetarian meals to the local community.",
    image: "community-meals",
    body: [
      { t: "h", text: "Spreading Kindness Through Seva" },
      { t: "p", text: "The Australian Khalsa Association Incorporated (AKA) continues to embody the true spirit of seva (selfless service) by serving free hot vegetarian meals to the local community. This heartfelt initiative is more than just providing food—it’s about creating a space where people feel welcomed, supported, and cared for." },
      { t: "p", text: "In a world where many silently struggle, such acts of kindness bring warmth not only to the body but also to the heart." },
      { t: "h", text: "More Than Just a Meal" },
      { t: "p", text: "For many individuals, a simple meal can mean comfort during difficult times. Whether someone is facing challenges, finding their footing, or simply seeking a friendly connection, AKA ensures that everyone is treated with dignity and respect." },
      { t: "p", text: "This initiative offers:" },
      { t: "ul", items: ["Nutritious vegetarian meals", "A welcoming and inclusive environment", "A sense of belonging and community"] },
      { t: "p", text: "It’s not just about feeding people—it’s about uplifting them." },
      { t: "h", text: "The Power of Community Connection" },
      { t: "p", text: "One of the most beautiful aspects of this effort is the sense of togetherness it fosters. Volunteers and community members come together, sharing smiles, conversations, and support." },
      { t: "p", text: "These moments:" },
      { t: "ul", items: ["Strengthen community bonds", "Encourage compassion and empathy", "Remind us of the importance of helping one another"] },
      { t: "h", text: "A Tradition of Giving Back" },
      { t: "p", text: "The Australian Khalsa Association has consistently demonstrated its commitment to community welfare. Through regular initiatives like free meal services, they continue to make a meaningful difference in people’s lives." },
      { t: "p", text: "Their mission reflects a simple yet powerful message: when we serve others, we strengthen humanity." },
      { t: "h", text: "Looking Ahead" },
      { t: "p", text: "As the initiative continues, AKA warmly invites everyone to join—whether by volunteering, spreading the word, or simply stopping by for a meal and a conversation." },
      { t: "p", text: "Because sometimes, the smallest gestures create the biggest impact." },
      { t: "h", text: "Conclusion" },
      { t: "p", text: "“Hot Meals, Warm Hearts” is more than a campaign—it’s a reminder that compassion still thrives within our communities. Through selfless service and genuine care, the Australian Khalsa Association is making a lasting difference, one meal at a time." },
    ],
  },
  {
    slug: "honouring-sikh-contributions-at-anzac-day-a-legacy-of-courage-and-sacrifice",
    date: "2025-04-28",
    title: "Honouring Sikh Contributions at ANZAC Day: A Legacy of Courage and Sacrifice",
    excerpt:
      "The Campbelltown ANZAC Day march along Queen Street to Mawson Park stood as a powerful tribute to the Sikh soldiers who are an integral part of the ANZAC legacy.",
    image: "anzac-group",
    body: [
      { t: "h", text: "Remembering Heroes at Campbelltown ANZAC March" },
      { t: "p", text: "The Campbelltown ANZAC Day march, held along Queen Street to Mawson Park, stood as a powerful tribute to the brave men and women who served the nation. Among those honoured were the remarkable Sikh soldiers whose contributions were not just alongside the ANZACs—but an integral part of their legacy." },
      { t: "p", text: "This commemorative event brought together the community to reflect on shared history, sacrifice, and unity." },
      { t: "h", text: "The Extraordinary Role of Sikh Soldiers" },
      { t: "p", text: "During World War I, approximately 1.2 million Indians volunteered for the British Indian Army, forming the largest volunteer force of the war. Among them, Sikhs played a significant and courageous role." },
      { t: "p", text: "Despite being only about 2% of India’s population at the time, Sikhs made up an impressive 22% of the British Indian Army. Their bravery on the battlefield was unmatched, but it came at a great cost:" },
      { t: "ul", items: ["83,005 Sikh soldiers lost their lives", "109,045 were wounded across both World Wars"] },
      { t: "p", text: "Their sacrifices remain a powerful reminder of dedication, resilience, and unwavering courage." },
      { t: "h", text: "A Legacy That Lives On" },
      { t: "p", text: "Today, the legacy of Sikh soldiers continues to inspire generations. Their values—resilience, unity, and service—are still upheld by many, including those serving proudly in the Australian Defence Force." },
      { t: "p", text: "Events like the Campbelltown ANZAC march ensure that their stories are not forgotten and that their contributions remain recognized within Australia’s diverse cultural history." },
      { t: "h", text: "Community, Unity, and Remembrance" },
      { t: "p", text: "The march was more than a ceremonial event—it was a symbol of unity. Community leaders, organizations, and residents came together to honour the past and strengthen the bonds of the present." },
      { t: "p", text: "Such gatherings:" },
      { t: "ul", items: ["Promote cultural awareness", "Encourage respect for shared history", "Inspire younger generations to remember and serve"] },
      { t: "h", text: "Lest We Forget" },
      { t: "p", text: "As we reflect on the courage and sacrifice of Sikh soldiers and all those who served, we are reminded of the true meaning of ANZAC Day. Their legacy continues to guide us toward unity, respect, and resilience." },
    ],
  },
  {
    slug: "honouring-sikh-soldiers-at-anzac-day-the-legacy-of-private-sarn-singh",
    date: "2025-04-25",
    title: "Honouring Sikh Soldiers at ANZAC Day: The Legacy of Private Sarn Singh",
    excerpt:
      "At the East Maitland ANZAC Day march, a special tribute was paid to Sikh soldiers, including Private Sarn (Saran) Singh of the 43rd Infantry Battalion.",
    image: "march-queen-street",
    body: [
      { t: "h", text: "A Tribute to Courage and Diversity" },
      { t: "p", text: "ANZAC Day stands as a powerful reminder of the bravery and sacrifice of soldiers who shaped Australia’s history. At the East Maitland ANZAC Day march, a special tribute was paid to Sikh soldiers whose service reflects the rich cultural diversity woven into the nation’s wartime legacy." },
      { t: "p", text: "Among these heroes, the story of Private Sarn (Saran) Singh shines as a symbol of determination, courage, and resilience." },
      { t: "h", text: "From Punjab to the Australian Frontlines" },
      { t: "p", text: "Private Sarn Singh’s journey began in Punjab, India, before he migrated to South Australia in search of a better life. Working as a farmer, he later chose to serve in the Australian Imperial Force (AIF) in 1916." },
      { t: "p", text: "His enlistment came during a time of significant challenges, particularly due to restrictive policies like the Defence Act of 1909, which limited enlistment based on European origin. Despite these barriers, Sarn Singh’s determination to serve highlights the true spirit of inclusivity and courage that defines the ANZAC legacy." },
      { t: "h", text: "Service and Supreme Sacrifice" },
      { t: "p", text: "Sarn Singh joined the 43rd Infantry Battalion and was deployed to the Western Front during World War I. On June 10, 1917, during the Allied offensive at Messines Ridge in Belgium, he made the ultimate sacrifice." },
      { t: "p", text: "Although he has no known grave, his name lives on:" },
      { t: "ul", items: ["Inscribed on the Menin Gate Memorial in Ypres, Belgium", "Honoured at the Australian War Memorial in Canberra", "Remembered among thousands who gave their lives in service"] },
      { t: "p", text: "His story is a lasting testament to bravery and dedication." },
      { t: "h", text: "Remembering More Than Sacrifice" },
      { t: "p", text: "The East Maitland ANZAC Day march was not only about remembering the fallen but also about celebrating the values they stood for—unity, resilience, and courage." },
      { t: "p", text: "By honouring soldiers like Sarn Singh, the community acknowledges:" },
      { t: "ul", items: ["The multicultural contributions to Australia’s history", "The sacrifices made beyond borders", "The importance of remembering every hero, regardless of origin"] },
      { t: "h", text: "Continuing the Legacy" },
      { t: "p", text: "Events like these inspire future generations to understand and respect the sacrifices made for freedom. They also highlight the importance of inclusivity and shared history in building stronger communities." },
      { t: "p", text: "The participation of the community in the East Maitland march reflects a collective commitment to remembrance and respect." },
    ],
  },
  {
    slug: "empowering-education-australian-khalsa-association-supports-minto-public-school",
    date: "2024-06-09",
    title: "Empowering Education: Australian Khalsa Association Supports Minto Public School",
    excerpt:
      "AKA donated brand-new chairs to the dedicated teachers at Minto Public School, reinforcing its commitment to education and community welfare.",
    image: "minto-school",
    body: [
      { t: "h", text: "Giving Back to the Community Through Education" },
      { t: "p", text: "The Australian Khalsa Association Incorporated continues to make a meaningful impact by actively supporting local communities. In a recent initiative, the organization donated brand-new chairs to the dedicated teachers at Minto Public School, reinforcing its commitment to education and community welfare." },
      { t: "p", text: "This thoughtful contribution reflects a deep understanding of the importance of creating a comfortable and supportive environment for educators, who play a vital role in shaping future generations." },
      { t: "h", text: "A Gesture That Matters" },
      { t: "p", text: "Teachers are the backbone of every successful education system. By providing essential resources like chairs, the Australian Khalsa Association has not only addressed a practical need but also expressed appreciation for the hard work and dedication of the teaching staff." },
      { t: "p", text: "The excitement and gratitude shown by the teachers at Minto Public School highlight how even small acts of kindness can make a significant difference in everyday working conditions." },
      { t: "h", text: "Recognizing Dedication and Hard Work" },
      { t: "p", text: "The association extended heartfelt thanks to all staff members at Minto Public School for their unwavering commitment to education. Their continuous efforts ensure that students receive the best possible learning experience." },
      { t: "p", text: "Such recognition strengthens the bond between community organizations and educational institutions, fostering mutual respect and collaboration." },
      { t: "h", text: "Building Stronger Communities Together" },
      { t: "p", text: "This initiative is more than just a donation — it represents a shared vision of uplifting communities through collective effort. By supporting schools, the Australian Khalsa Association is investing in the future of students and contributing to a better learning environment." },
      { t: "p", text: "Their mission to give back and empower communities is just beginning, and this project marks another step forward in that journey." },
      { t: "h", text: "A Call to Join the Mission" },
      { t: "p", text: "The Australian Khalsa Association encourages individuals who are passionate about community service to get involved. Whether through volunteering, donations, or collaboration, everyone can play a part in creating positive change." },
      { t: "p", text: "By working together, we can build stronger, more supportive communities where education thrives and opportunities grow." },
      { t: "h", text: "Conclusion" },
      { t: "p", text: "The donation to Minto Public School stands as a powerful example of how community-driven initiatives can create lasting impact. Through acts of generosity and appreciation, the Australian Khalsa Association continues to inspire others to contribute and make a difference." },
    ],
  },
  {
    slug: "honouring-sikh-anzac-heroes-at-mawson-park-campbelltown",
    date: "2024-04-28",
    title: "Honouring Sikh ANZAC Heroes at Mawson Park, Campbelltown",
    excerpt:
      "AKA proudly participated in the ANZAC Day commemorations at Mawson Park, Campbelltown, standing alongside the local community.",
    image: "evening-gathering",
    body: [
      { t: "h", text: "Honouring Sikh ANZAC Legacy at Mawson Park, Campbelltown" },
      { t: "p", text: "The Australian Khalsa Association Incorporated (AKA) proudly participated in the ANZAC Day commemorations at Mawson Park, Campbelltown, standing alongside the local community to honour the brave individuals who fought for Australia’s freedom." },
      { t: "p", text: "This meaningful event highlighted the rich and diverse history of Sikh soldiers who served with distinction in both World War I and World War II. Their contributions, alongside Allied forces, remain an integral part of Australia’s military heritage." },
      { t: "h", text: "A Tribute to Courage and Unity" },
      { t: "p", text: "During the Campbelltown ANZAC Day march, members of AKA paid their respects to the Sikh soldiers of the Australian Imperial Force and those who supported global efforts in times of conflict. The ceremony served as a reminder of the courage, sacrifice, and resilience demonstrated by these heroes." },
      { t: "p", text: "The event also reflected the spirit of unity, bringing together people from all backgrounds to honour shared values of respect, remembrance, and gratitude." },
      { t: "h", text: "Community Participation and Leadership" },
      { t: "p", text: "The commemorations were attended by several respected community leaders and officials, including:" },
      { t: "ul", items: ["City of Campbelltown RSL Sub Branch", "Grant Healey", "Dr Mike Freelander", "George Greiss"] },
      { t: "p", text: "Their presence further strengthened the significance of the occasion, reinforcing the importance of recognising cultural diversity within Australia’s history." },
      { t: "h", text: "Keeping the Legacy Alive" },
      { t: "p", text: "The Australian Khalsa Association remains committed to preserving and promoting the legacy of Sikh ANZACs. Through active participation in commemorative events, the organisation continues to educate, inspire, and unite communities across Australia." },
      { t: "p", text: "As we reflect on the sacrifices made by those who served, we are reminded to carry forward their legacy by fostering unity, respect, and remembrance in our daily lives." },
    ],
  },
];

export const postPath = (p: Post) => {
  const [y, m, d] = p.date.split("-");
  return `/blog/${y}/${m}/${d}/${p.slug}/`;
};

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

export const getPost = (y: string, m: string, d: string, slug: string) =>
  POSTS.find((p) => p.date === `${y}-${m}-${d}` && p.slug === slug);

export const readingTime = (p: Post) => {
  const words = p.body.reduce(
    (n, b) =>
      n + (b.t === "ul" ? b.items.join(" ").split(/\s+/).length : b.text.split(/\s+/).length),
    0,
  );
  return Math.max(1, Math.round(words / 220));
};
