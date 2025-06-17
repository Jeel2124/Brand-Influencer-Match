// pages/api/save-list.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { listName, influencerIds } = req.body;

  if (!listName || !influencerIds) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // TODO: Save listName and influencerIds in your database linked to the user

  // For demo, just send success
  res.status(200).json({ message: 'List saved successfully' });
}
