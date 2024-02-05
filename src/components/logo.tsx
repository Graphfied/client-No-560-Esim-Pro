import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/logo.png" alt="logo" width={120} height={120} />
    </Link>
  );
}
