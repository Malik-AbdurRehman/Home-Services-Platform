'use client';

import { useSignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { useState } from 'react';

export default function SignUpPage() {
  const { signUp, isLoaded } = useSignUp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('customer');
  const [message, setMessage] = useState('');

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) {
      setMessage("SignUp module not loaded yet. Try again shortly.");
      return;
    }

    try {
      await signUp.create({
        emailAddress: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        unsafeMetadata: {
          role: role,
        },
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setMessage('Check your email for the verification code.');
    } catch (error) {
      const err = error as { errors?: { message?: string }[] };
      console.error(error);
      setMessage(err?.errors?.[0]?.message || 'Sign-up failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSignUp} className="space-y-4">

        <input
          type="text"
          placeholder="First Name"
          className="w-full p-2 border rounded"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          className="w-full p-2 border rounded"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

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

        <select
          className="w-full p-2 border rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="customer">Customer</option>
          <option value="merchant">Merchant</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>

        {message && <p className="text-sm text-red-600">{message}</p>}
        <p>Already Have an Account? <Link href={'./sign-in'}>Signin</Link></p>
      </form>
    </div>
  );
}
