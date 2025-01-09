import Link from "next/link";
import LogoIcon from "../icons/logo";

export function Brand() {
  return (
    <div className="flex gap-4 items-center">
      <Link href="/">
        <LogoIcon />
      </Link>
      <Link
        className="text-lg font-bold hover:underline"
        href="https://github.com/g0ncharuk"
        passHref
        target="_blank"
        rel="noopener noreferrer"
      >
        by g0ncharuk
      </Link>
    </div>
  );
}
