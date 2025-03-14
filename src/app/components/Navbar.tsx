import { auth } from '@/auth';
import Link from 'next/link';
import Logout from './Logout';
import Image from 'next/image';

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className='border-b bg-background w-full items-center'>
      <div className='flex w-full items-center justify-between my-4'>
        <Link
          className='font-bold'
          href='/'
        >
          Home
        </Link>
        <div className='flex items-center gap-x-5'>
          <Link href={'/middleware'}>Middleware</Link>
          <Link href={'/server'}>Server</Link>
        </div>

        <div className='flex items-center gap-x-5'>
          {session?.user ? (
            <>
              <div className='flex items-center gap-x-2 text-sm'>
                {session.user.name}
                {session.user.image && (
                  <Image
                    src={session.user.image || ''}
                    className='rounded-full'
                    width={30}
                    height={30}
                    alt='User Avatar'
                  />
                )}
              </div>
              <Logout />
            </>
          ) : (
            <Link href={'/sign-in'}>
              <div className='bg-blue-600 text-wrap text-sm px-4 py-2 rounded'>Login</div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
