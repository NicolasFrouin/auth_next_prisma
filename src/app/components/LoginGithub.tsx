'use client';

import { login } from '@/actions/auth';
import { FaGithub } from 'react-icons/fa6';

export default function LoginGithub() {
  return (
    <div
      onClick={() => login('github')}
      className='w-full gap-4 hover:cursor-pointer mt-6 h-12 bg-black rounded p-4 flex justify-center items-center'
    >
      <FaGithub className='text-white' />
      <p className=''>Login with Github</p>
    </div>
  );
}
