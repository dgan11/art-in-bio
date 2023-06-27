import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../../utils';

export default function ConfigurePage() {
  const [config, setConfig] = useState<any>({});
  const router = useRouter();
  const { subdomain } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('pages')
        .select('content')
        .eq('subdomain', subdomain);

      if (error) throw error;

      if (data && data.length > 0) {
        setConfig(data[0].content);
      }
    };

    if (subdomain) {
      fetchData();
    }
  }, [subdomain]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {  // added type FormEvent<HTMLFormElement>
    event.preventDefault();

    const { data, error } = await supabase
      .from('pages')
      .update({ content: config })
      .eq('subdomain', subdomain);

    if (error) throw error;

    alert('Configuration updated!');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {  // added type ChangeEvent<HTMLInputElement>
    setConfig({ ...config, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" name="title" value={config.title || ''} onChange={handleChange} />
      </label>

      {/* Add more inputs for other configuration options as needed */}

      <button type="submit">Save</button>
    </form>
  );
}
