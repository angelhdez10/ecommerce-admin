import { useSession, signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn("google")}
            className="bg-white p-2 px-4 rounded-lg"
          >
            Login with Google
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-red-300 w-screen h-screen flex items-center justify-center">
      <div>Logged as {session?.user?.name}</div>
      <button onClick={() => signOut()} className="rounded-lg px-4 bg-blue-300">
        Sign out
      </button>
    </div>
  );
}
