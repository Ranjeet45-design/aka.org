export type Photo = { src: string; alt: string; w: number; h: number };

const p = (name: string, alt: string, w: number, h: number): Photo => ({
  src: `/images/${name}.jpg`,
  alt,
  w,
  h,
});

export const PHOTOS = {
  "march-street": p("march-street", "Members of the Australian Khalsa Association marching in dark suits beneath a Sikh ANZACs banner", 2000, 1328),
  "anzac-group": p("anzac-group", "A large group of AKA members and community in orange turbans gathered at an ANZAC Day commemoration", 2000, 1328),
  cenotaph: p("cenotaph", "AKA members standing in front of a war memorial inscribed 'Lest We Forget'", 2000, 1500),
  "mawson-park": p("mawson-park", "AKA members with community leaders and officials at Mawson Park, Campbelltown", 2000, 1328),
  "sikh-anzacs-banner": p("sikh-anzacs-banner", "AKA members holding the Sikh ANZACs banner in a park", 2000, 1328),
  "wreath-laying": p("wreath-laying", "AKA representatives laying a wreath at a memorial alongside a uniformed service member", 1360, 2048),
  "minto-school": p("minto-school", "AKA members with teachers at Minto Public School", 2000, 1609),
  parliament: p("parliament", "AKA representatives with government leaders in front of national flags", 1440, 1384),
  "evening-gathering": p("evening-gathering", "AKA members standing together at an evening community gathering in a park", 2000, 1328),
  "campbelltown-wreath": p("campbelltown-wreath", "AKA members at an ANZAC Day dawn service holding a floral wreath", 1600, 1200),
  "march-park": p("march-park", "AKA members marching through a park during an ANZAC Day parade", 2000, 1328),
  "community-meals": p("community-meals", "A community support space with donated goods", 1600, 1200),
  meeting: p("meeting", "AKA members meeting with community partners in a meeting room", 1200, 900),
  "portrait-group": p("portrait-group", "AKA members in suits and orange turbans standing on a lawn", 833, 985),
  "turbans-close": p("turbans-close", "Close portrait of AKA members at a community event", 1600, 1062),
  "honour-guard": p("honour-guard", "AKA members alongside police and emergency service personnel at a commemoration", 1600, 1062),
  "service-crowd": p("service-crowd", "AKA members among veterans and emergency service volunteers at a service", 1600, 1062),
  "banner-wide": p("banner-wide", "The Sikh ANZACs banner displayed at a community event", 1600, 1062),
  "march-town": p("march-town", "AKA members walking through a town centre in the ANZAC Day march", 1600, 1062),
  "march-queen-street": p("march-queen-street", "The ANZAC Day march along Queen Street with the Sikh ANZACs banner", 1600, 1066),
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof PHOTOS;

/** Gallery order */
export const GALLERY: PhotoKey[] = [
  "march-street",
  "portrait-group",
  "anzac-group",
  "cenotaph",
  "wreath-laying",
  "mawson-park",
  "sikh-anzacs-banner",
  "minto-school",
  "march-park",
  "parliament",
  "evening-gathering",
  "campbelltown-wreath",
  "march-queen-street",
  "honour-guard",
  "service-crowd",
  "banner-wide",
  "march-town",
  "turbans-close",
  "meeting",
  "community-meals",
];
