import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(req: NextRequest) {
  const payload = await req.json();

  // Clerk sends user info in `data` object
  const { id, email_addresses, first_name, last_name, unsafe_metadata} = payload.data;

  const email = email_addresses?.[0]?.email_address;

  const role = unsafe_metadata?.role || 'customer';

  try {
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'db',
    });

    await db.execute(
      'INSERT INTO users (clerk_id, email, first_name, last_name, role) VALUES (?, ?, ?, ?)',
      [id, email, first_name, last_name, role]
    );

    return NextResponse.json({ message: 'User inserted successfully' });
  } catch (err) {
    console.error('MySQL Error:', err);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }
}
