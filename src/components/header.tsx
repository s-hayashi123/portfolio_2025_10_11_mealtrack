import Link from "next/link";
import { Button } from "./ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { LogoutButton } from "./logout-button";

export async function Header() {
  const session = await auth.api.getSession({ headers: await headers() });

  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link href="/" className="flex items-center space-x-2 ">
          <span className="text-xl font-bold text-white">
            <span className="">MealTrack</span>
          </span>
        </Link>
        <nav className="flex items-center space-x-2">
          {session ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/dashboard">ダッシュボード</Link>
              </Button>
              <Button variant="outline" asChild className="ml-2">
                <Link href="/profile">プロフィール</Link>
              </Button>
              <LogoutButton />
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/signup">新規登録</Link>
              </Button>
              <Button variant="outline" asChild className="ml-2">
                <Link href="/login">ログイン</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
