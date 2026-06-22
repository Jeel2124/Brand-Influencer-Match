let latestAnalysis = null;

export async function POST(request) {
  const data = await request.json();
  if (!data.website) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }
  // Return mock brand analysis
  const analysis = {
    summary: `${data.website} is a brand focused on delivering quality products and services to their target audience.`,
    core_keywords: ['Quality', 'Innovation', 'Trust', 'Value', 'Growth'],
    brand_tone: 'Professional, Authentic, Engaging',
    core_values: 'Quality, Customer Focus, Innovation',
    target_audience: '18-35, digitally active consumers',
    target_region: 'United States',
    media_platform: ['Instagram', 'YouTube'],
  };
  latestAnalysis = analysis;
  return Response.json(analysis);
}

export async function GET() {
  if (!latestAnalysis) {
    return Response.json({ error: 'No analysis found' }, { status: 404 });
  }
  return Response.json(latestAnalysis);
}
