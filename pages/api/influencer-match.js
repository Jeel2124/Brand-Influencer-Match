// pages/api/influencer-match.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    brandSummary,
    keywords,
    brandTone,
    coreValues,
    audience,
    region,
    platforms,
    campaignObjective,
  } = req.body;

  // TODO: Use the brand info to query database or AI for matching influencers

  // Dummy influencer list example:
  const influencers = [
    {
      id: 1,
      name: "Jane Doe",
      username: "@janedoe",
      avatar: "",
      platforms: ["Instagram"],
      followers: "350K",
      engagement: "5.2%",
      fit: 92,
      tags: ["Brand Awareness"],
      desc: "Popular fitness influencer.",
      whyFit: "High engagement with fitness enthusiasts.",
      category: "Fitness",
      location: "USA",
      contentThemes: ["Workouts", "Nutrition"],
      audienceDemo: "18-35, health conscious",
      outreachAngle: "Collaborate on activewear launch.",
      contentExamples: [],
    },
    // Add more...
  ];

  res.status(200).json({ influencers });
}
