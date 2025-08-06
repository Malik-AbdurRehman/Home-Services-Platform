'use client';

import { useSignIn } from '@clerk/nextjs';
import { useState } from 'react';
import Link from 'next/link';

export default function SignInPage() {
  const { signIn, isLoaded } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) {
      setMessage('SignIn module not loaded yet. Try again shortly.');
      return;
    }

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === 'complete') {
        window.location.href = '/dashboard';
      } else {
        setMessage('Check your email for further steps.');
      }
    } catch (error) {
      const err = error as { errors?: { message?: string }[] };
      console.error(err);
      setMessage(err?.errors?.[0]?.message || 'Sign-in failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
      <form onSubmit={handleSignIn} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign In
        </button>

        {message && <p className="text-sm text-red-600">{message}</p>}
        <p>Dont Have an Account <Link href={'./sign-up'}>SignUp</Link></p>
      </form>
    </div>
  );
}
