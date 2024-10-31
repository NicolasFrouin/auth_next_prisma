'use client';

import { logout } from '@/actions/auth';

export default function Logout() {
  return (
    <div
      onClick={logout}
      className='w-full gap-4 hover:cursor-pointer mt-6 h-12 bg-black rounded p-4 flex justify-center items-center'
    >
      <p className=''>Logout</p>
    </div>
  );
}
