import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center mx-auto">
      <p >Welcome to Home Services Platform</p>
      <div className="flex justify-center mx-auto">
        <Link href={"/auth/login"}>Login</Link>
        <Link href={"/auth/register"}>Register</Link>
      </div>
    </div>
  );
}
