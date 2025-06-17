// pages/api/influencers.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // TODO: Return default influencer list or cached data

  const influencers = [
    // Similar structure to influencer-match
  ];

  res.status(200).json(influencers);
}
