import { supabase } from '../../../lib/supabase';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, message } = body;

  if (!name || !phone || !message) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { error } = await supabase.from('contact_message').insert([{ name, phone, message }]);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ success: true });
}
