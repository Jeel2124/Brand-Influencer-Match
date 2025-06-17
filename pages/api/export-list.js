// pages/api/export-list.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { influencerIds, email, format } = req.body;

  if (!influencerIds || !email || !format) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // TODO: Generate export file based on influencerIds and format
  // TODO: Send email with export attached or download link

  // For demo, just send success
  res.status(200).json({ message: 'Export started. Check your email shortly.' });
}
