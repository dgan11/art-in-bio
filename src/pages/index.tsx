import { useState, FormEvent } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
  const [subdomain, setSubdomain] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message

    const response = await fetch('/api/check-subdomain', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ subdomain })
    });

    if (response.ok) {
      console.log('OK: ', response.status)
      const { userId } = await response.json();
      localStorage.setItem('userId', userId);
      router.push(`/configure?subdomain=${subdomain}`);
    } else {
      const { error } = await response.json();
      console.log('Not OK: ', response.status, error)
      setErrorMessage(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={subdomain}
          onChange={(e) => setSubdomain(e.target.value)}
          placeholder="Enter your desired subdomain"
          required
        />
        <button type="submit">Claim</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default HomePage;
