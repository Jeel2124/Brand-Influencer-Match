export async function POST(request) {
  const { influencerIds, email, format } = await request.json();
  if (!influencerIds || !email || !format) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }
  return Response.json({ message: 'Export started. Check your email shortly.' });
}
