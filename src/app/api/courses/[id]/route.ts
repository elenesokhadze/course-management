import axios from 'axios';

export async function GET(request: Request, { params }: any) {
  try {
    const id = params.id;
    const apiPath = 'https://course-management.glitch.me/courses/' + id;
    const res = await axios.get(apiPath);
    return new Response(JSON.stringify(res?.data), {
      headers: { 'content-type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}
