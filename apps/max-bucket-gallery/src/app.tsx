import React, { useEffect, useState } from 'react';
import { Message } from '@max-bucket-gallery/api-interfaces';

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch(process.env.NX_BACKEND_URL + '/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to max-bucket-gallery!</h1>
      </div>
      <div>{m.message}</div>
      <a href={`${process.env.NX_BACKEND_URL}/api/auth/google`}>Sign in with google</a>
    </>
  );
};

export default App;
