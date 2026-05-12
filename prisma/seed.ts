import "dotenv/config";
import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";

const initialTreks = [
  {
    slug: "vasota-jungle-trek",
    title: "Vasota Jungle Trek",
    location: "Satara, Maharashtra",
    duration: "2 Days / 1 Night",
    difficulty: "Moderate",
    altitude: "3,842 ft",
    price: 2499,
    image: "/vasota.webp",
    shortDescription:
      "Trek through dense forests to the historic Vasota fort, surrounded by the Koyna Wildlife Sanctuary.",
    description:
      "Vasota, also known as Vyaghragad, is a historic hill fort located in the Satara district of Maharashtra. The trek takes you through dense forests of the Koyna Wildlife Sanctuary, offering a chance to spot wildlife and enjoy panoramic views of the Koyna Dam backwaters. The trail is moderately challenging with steep sections, but the views from the top are absolutely worth the effort.",
    highlights: [
      "Dense forest trek through Koyna Wildlife Sanctuary",
      "Spectacular views from Vasota fort",
      "Overnight camping near the fort",
      "Rich biodiversity and wildlife spotting",
      "Historical fort architecture and stories",
    ],
    itinerary: [
      {
        day: 1,
        title: "Base Camp to Vasota summit",
        description:
          "Start from Bamnoli village, take a boat ride across Koyna backwaters covering approx 300m of water. Begin the ascent through dense forest. Reach the fort plateau and explore the ruins. Overnight camping near the fort with bonfire and dinner under the stars.",
      },
      {
        day: 2,
        title: "Summit to Base Camp",
        description:
          "Wake up to a stunning sunrise, explore remaining structures, begin descent through the forest. Reach the base by early afternoon, take the boat ride back to Bamnoli. Depart with memories of an unforgettable trek.",
      },
    ],
    bestSeason: "October to February",
    groupSize: "15-25 people",
    includes: [
      "Expert trek leader",
      "Camping equipment (tent, sleeping bag, mat)",
      "Meals: dinner & breakfast",
      "First-aid and safety equipment",
      "Permission and forest entry fees",
      "Boat ride charges",
    ],
    featured: true,
    upcoming: true,
  },
  {
    slug: "kalsubai-peak-trek",
    title: "Kalsubai Peak Trek",
    location: "Ahmednagar, Maharashtra",
    duration: "1 Day / Overnight",
    difficulty: "Moderate",
    altitude: "5,400 ft",
    price: 1499,
    image: "/images/trek-kalsubai.jpg",
    shortDescription:
      "Conquer Maharashtra's highest peak — a thrilling overnight trek to the roof of the Sahyadris.",
    description:
      "Kalsubai is the highest peak in Maharashtra, standing tall at 5,400 feet. This trek is a favorite among adventure enthusiasts and offers a challenging yet rewarding experience. The trail passes through lush green landscapes, rocky patches, and ladders that add to the thrill. The sunrise from the summit is a spectacle that makes the entire effort worthwhile.",
    highlights: [
      "Highest peak in Maharashtra",
      "Thrilling ladder sections",
      "Panoramic sunrise views",
      "Rich biodiversity on the trail",
      "Overnight camping experience",
    ],
    itinerary: [
      {
        day: 1,
        title: "Base to Summit",
        description:
          "Start from Bari village late evening. Trek through the night under starlit skies. Reach the summit by early morning to witness a breathtaking sunrise over the Sahyadri ranges. Descend by late morning and return to base.",
      },
    ],
    bestSeason: "October to March",
    groupSize: "15-25 people",
    includes: [
      "Experienced trek leader",
      "Night camping equipment",
      "Light refreshments",
      "Forest entry permissions",
      "Safety and first-aid kit",
    ],
    featured: true,
    upcoming: false,
  },
  {
    slug: "harishchandragad-trek",
    title: "Harishchandragad Trek",
    location: "Ahmednagar, Maharashtra",
    duration: "2 Days / 1 Night",
    difficulty: "Challenging",
    altitude: "4,671 ft",
    price: 1999,
    image: "/images/trek-harishchandragad.jpg",
    shortDescription:
      "Ancient fort with caves, waterfalls, and the famous Konkan Kada cliff.",
    description:
      "Harishchandragad is one of the most magnificent forts in Maharashtra, known for its ancient temples, caves, and the breathtaking Konkan Kada — a massive vertical cliff that offers views of the Konkan region. The trek passes through dense forests, waterfalls, and ancient architecture, making it a paradise for history buffs and nature lovers alike.",
    highlights: [
      "Konkan Kada — the massive cliff face",
      "Ancient caves and temples",
      "Waterfall trails in monsoon",
      "Sunrise from the summit",
      "Historical significance dating back to 6th century",
    ],
    itinerary: [
      {
        day: 1,
        title: "Base to Harishchandragad",
        description:
          "Start from Khireshwar village. Trek through scenic waterfalls and dense forest patches. Reach the fort plateau by evening and explore the caves. Overnight stay near the ancient temple.",
      },
      {
        day: 2,
        title: "Konkan Kada and Descent",
        description:
          "Early morning visit to Konkan Kada to witness the sunrise. Explore the rest of the fort, visit the famous Harishchandreshwar temple. Descend to the base by afternoon.",
      },
    ],
    bestSeason: "October to February",
    groupSize: "15-25 people",
    includes: [
      "Experienced trek leader",
      "Camping gear (tent, sleeping bag, mat)",
      "Meals: dinner & breakfast",
      "Forest entry and permissions",
      "First-aid kit",
    ],
    featured: true,
    upcoming: false,
  },
  {
    slug: "ratangad-fort-trek",
    title: "Ratangad Fort Trek",
    location: "Ahmednagar, Maharashtra",
    duration: "1 Day",
    difficulty: "Moderate",
    altitude: "4,250 ft",
    price: 1299,
    image: "/images/trek-ratangad.jpg",
    shortDescription:
      "A historic fort with a natural rock arch and stunning views of the surrounding ranges.",
    description:
      "Ratangad is a historic fort in the Ahmednagar district, known for its unique natural rock arch called 'Nedhe' or 'Eye of the Needle'. The fort offers panoramic views of the surrounding mountain ranges including Harishchandragad and the Alang-Madan-Kulang peaks. The trek is of moderate difficulty and suitable for beginners.",
    highlights: [
      "Natural rock arch — Nedhe",
      "360-degree views of surrounding peaks",
      "Ancient temple on the fort",
      "Caves and water cisterns",
      "Ideal for beginners",
    ],
    itinerary: [
      {
        day: 1,
        title: "Base to Summit and Return",
        description:
          "Start from Ratanwadi village. Trek through moderate terrain with some steep patches. Reach the fort, explore the Nedhe rock arch and the temple. Descend by evening.",
      },
    ],
    bestSeason: "October to March",
    groupSize: "15-25 people",
    includes: [
      "Trek leader",
      "Light refreshments",
      "Forest entry permissions",
      "First-aid kit",
    ],
    featured: false,
    upcoming: false,
  },
  {
    slug: "rajmachi-fort-trek",
    title: "Rajmachi Fort Trek",
    location: "Lonavala, Maharashtra",
    duration: "1 Day",
    difficulty: "Easy",
    altitude: "2,710 ft",
    price: 999,
    image: "/images/trek-rajmachi.jpg",
    shortDescription:
      "A scenic trek near Lonavala with lush green landscapes and twin fort ruins.",
    description:
      "Rajmachi is a beautiful twin-fort located near Lonavala, consisting of Shrivardhan and Manaranjan forts. The trek passes through lush green valleys, quaint villages, and offers stunning views of the surrounding Sahyadri ranges. It's one of the most popular weekend treks from Mumbai and Pune.",
    highlights: [
      "Twin forts — Shrivardhan and Manaranjan",
      "Lush green valleys and waterfalls",
      "Scenic railway views",
      "Perfect weekend getaway",
      "Beginner-friendly trail",
    ],
    itinerary: [
      {
        day: 1,
        title: "Base to Rajmachi",
        description:
          "Start from Lonavala or Udhewadi village. Trek through scenic trails with valley views. Visit both the forts. Return by evening.",
      },
    ],
    bestSeason: "June to February",
    groupSize: "15-30 people",
    includes: [
      "Trek leader",
      "Refreshments",
      "Forest entry permissions",
      "First-aid kit",
    ],
    featured: false,
    upcoming: false,
  },
  {
    slug: "sandhan-valley-trek",
    title: "Sandhan Valley Trek",
    location: "Ahmednagar, Maharashtra",
    duration: "2 Days / 1 Night",
    difficulty: "Extreme",
    altitude: "4,200 ft",
    price: 2999,
    image: "/images/trek-sandhan.jpg",
    shortDescription:
      "Also known as the Valley of Shadows — a thrilling canyon trek with rappelling.",
    description:
      "Sandhan Valley, also known as the 'Valley of Shadows', is a unique canyon trek in the Sahyadris. The trek involves descending through a 200-foot deep valley, rappelling down waterfalls, and navigating through narrow gorges. It's an adrenaline-pumping adventure suitable for experienced trekkers.",
    highlights: [
      "Canyon trek through a 200ft valley",
      "Water rappelling and rock climbing",
      "Narrow gorges and shadow play",
      "Camping under the stars",
      "Thrilling adventure experience",
    ],
    itinerary: [
      {
        day: 1,
        title: "Descent into the Valley",
        description:
          "Start from Samrad village. Descend into the valley using ropes and rappelling techniques. Navigate through narrow gorges and small waterfalls. Set up camp inside the valley.",
      },
      {
        day: 2,
        title: "Exit from the Valley",
        description:
          "Continue through the canyon, with more rappelling and climbing sections. Exit the valley and trek back to Samrad village. Depart with an unforgettable experience.",
      },
    ],
    bestSeason: "October to March",
    groupSize: "10-15 people",
    includes: [
      "Expert rappelling instructor",
      "All technical equipment (ropes, harness, helmet)",
      "Camping gear",
      "Meals: dinner & breakfast",
      "Forest entry permissions",
      "Safety and first-aid kit",
    ],
    featured: false,
    upcoming: false,
  },
];

const adminUser = {
  name: "Admin",
  email: "admin@mileswithnature.com",
  password: "admin123",
  phone: "+91-8010283201",
  isAdmin: true,
};

async function main() {
  console.log("Seeding database...");

  const hashedPassword = await bcrypt.hash(adminUser.password, 12);

  await prisma.user.upsert({
    where: { email: adminUser.email },
    update: {},
    create: {
      name: adminUser.name,
      email: adminUser.email,
      password: hashedPassword,
      phone: adminUser.phone,
      isAdmin: adminUser.isAdmin,
    },
  });

  console.log("Admin user created.");

  for (const trek of initialTreks) {
    await prisma.trek.upsert({
      where: { slug: trek.slug },
      update: {},
      create: trek,
    });
  }

  console.log(`Seeded ${initialTreks.length} treks.`);
  console.log("Database seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
