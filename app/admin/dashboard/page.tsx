'use client';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

export default function Dashboard() {
  const { user } = useUser();

  useEffect(() => {
  if (user) {
    const storeUser = async () => {
      const res = await fetch('/api/store-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          email: user.emailAddresses[0]?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.unsafeMetadata.role
        }),
      });
      
      const data = await res.json();
      console.log('User stored response:', data);
    };

    storeUser();
  }
}, [user]);


  return (
    <div>
      <h1>Welcome, {user?.firstName}</h1>
    </div>
  );
}
