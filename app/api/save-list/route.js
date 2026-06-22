export async function POST(request) {
  const { name, listName, influencerIds } = await request.json();
  const finalName = name || listName;
  if (!finalName || !influencerIds) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }
  return Response.json({ message: 'List saved successfully' });
}
