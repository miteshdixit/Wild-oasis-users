import Link from 'next/link'; // Ensure you import Link from 
import Image from 'next/image';
import Log from '@/public/logo.png';
function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image 
      src = {Log} 
      height="60"
      width="60"
      quality={70}
      alt="The Wild Oasis logo" />
      {/* <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" /> */}
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}

export default Logo;
