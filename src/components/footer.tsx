import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-8 border-t bg-card">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center space-x-2">
          <span className="font-bold">MealTrack</span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
        <nav className="flex space-x-4 items-center md:mx-0">
          <Link href="/terms" className="hover:underline">
            利用規約
          </Link>
          <Link href="/privacy" className="hover:underline">
            プライバシー
          </Link>
          <Link href="/contact" className="hover:underline">
            お問い合わせ
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <svg
              className="w-4 h-4 opacity-75 hover:opacity-100 transition"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M24 4.557a9.816 9.816 0 01-2.828.775 4.932 4.932 0 002.164-2.724 9.865 9.865 0 01-3.127 1.195 4.924 4.924 0 00-8.39 4.482C7.691 8.095 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.708.87 3.214 2.188 4.099A4.904 4.904 0 01.964 8.1v.062a4.935 4.935 0 003.946 4.827 4.996 4.996 0 01-2.224.084 4.936 4.936 0 004.604 3.419A9.867 9.867 0 010 21.542 13.92 13.92 0 007.548 24c9.142 0 14.307-7.721 13.995-14.646A9.936 9.936 0 0024 4.557z" />
            </svg>
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg
              className="w-4 h-4 opacity-75 hover:opacity-100 transition"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.011-1.04-.017-2.04-3.338.725-4.042-1.415-4.042-1.415-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.998.108-.775.418-1.304.76-1.604-2.665-.304-5.466-1.334-5.466-5.93 0-1.31.47-2.381 1.236-3.221-.124-.303-.535-1.524.116-3.176 0 0 1.008-.322 3.301 1.23a11.5 11.5 0 013.004-.404c1.018.004 2.044.138 3.003.404 2.292-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.625-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .318.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
