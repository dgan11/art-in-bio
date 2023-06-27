import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../../utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { subdomain } = req.body;

    const { data, error } = await supabase
      .from('pages')
      .select('subdomain')
      .eq('subdomain', subdomain);

    console.log(`👾 data: ${data} | error: ${error}`)

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    if (data && data.length > 0) {
      res.status(409).json({ error: 'Subdomain is already taken' });
      return;
    } else {
      const userid = uuidv4();  // changed from userId to userid

      const { error: insertError } = await supabase
        .from('pages')
        .insert([{ subdomain, userid }]);  // changed from userId to userid

      if (insertError) {
        res.status(500).json({ error: insertError.message });
        return;
      }

      res.status(200).json({ userid });  // changed from userId to userid
      return;
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}