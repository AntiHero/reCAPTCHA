import {
  GoogleReCaptcha,
  GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3';
import { useCallback, useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      await fetch('http://localhost:5000/api/auth/password-recovery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          recaptchaToken: token,
        }),
      }).finally(() => setEmail(''));
    },
    [token, email]
  );

  return (
    <>
      {/** Generate public/private keys here https://www.google.com/recaptcha/admin/create */}
      <GoogleReCaptchaProvider reCaptchaKey="6Levy68lAAAAAPsTCNY-4RqECyLKGOl7kivcSdWh">
        <GoogleReCaptcha
          onVerify={(token) => {
            setToken(token);
          }}
        />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">email </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </GoogleReCaptchaProvider>
    </>
  );
}

export default App;
