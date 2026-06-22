export async function POST(request) {
  const { brandSummary, keywords, brandTone, coreValues, audience, region, platforms, campaignObjective } = await request.json();

  const platformsPool = ['Instagram', 'YouTube', 'TikTok', 'Twitter'];
  const tagsPool = ['Brand Awareness', 'Product Launch', 'Drive Sales', 'Engagement', 'Product Review'];

  const influencers = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Influencer ${i + 1}`,
    username: `@influencer${i + 1}`,
    avatar: '',
    platforms: [platformsPool[i % platformsPool.length]],
    followers: `${Math.floor(Math.random() * 490 + 10)}K`,
    engagement: `${(Math.random() * 8 + 2).toFixed(1)}%`,
    fit: Math.floor(Math.random() * 30 + 70),
    tags: [tagsPool[i % tagsPool.length]],
    desc: 'Content creator with strong audience engagement and authentic brand partnerships.',
    whyFit: `Great alignment with your brand tone (${brandTone || 'authentic'}) and target audience.`,
    category: keywords?.[0] || 'Lifestyle',
    location: region || 'United States',
    contentThemes: ['Lifestyle', 'Product Reviews'],
    audienceDemo: audience || '18–35, mixed audience',
    outreachAngle: `Collaborate on a ${campaignObjective || 'Brand Awareness'} campaign highlighting your core values.`,
    contentExamples: [],
  }));

  return Response.json({ influencers });
}
