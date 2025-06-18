// pages/api/brand-analysis.js

let latestAnalysis = null; // store latest analyzed data temporarily

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    // Validate required fields
    if (!data.summary || !data.core_keywords) {
      return res.status(400).json({ error: 'Missing required analysis fields' });
    }

    latestAnalysis = data; // save received analysis

    return res.status(200).json({ message: 'Analysis saved successfully' });
  } else if (req.method === 'GET') {
    if (!latestAnalysis) {
      return res.status(404).json({ error: 'No analysis found' });
    }
    return res.status(200).json(latestAnalysis); // serve latest analysis
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
