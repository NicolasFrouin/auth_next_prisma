'use client';

import { loginWithCredentials } from '@/actions/auth';
import { useActionState, useEffect } from 'react';

export default function LoginForm() {
  const [error, action, pending] = useActionState(loginWithCredentials, undefined);

  useEffect(() => {
    console.log({ error });
  }, [error]);

  return (
    <div>
      <form
        action={action}
        className='w-full flex flex-col gap-4'
      >
        <div className=''>
          <label>
            <span className='block text-sm font-medium text-gray-200'>Email</span>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='email@example.com'
              className='mt-1 w-full px-4 p-2 h-10 border-gray-200 rounded text-black'
            />
          </label>
        </div>
        <div className=''>
          <label>
            <span className='block text-sm font-medium text-gray-200'>Password</span>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='password'
              className='mt-1 w-full px-4 p-2 h-10 border-gray-200 rounded text-black'
            />
          </label>
        </div>
        {error && <div className='text-red-500 text-sm'>{error}</div>}
        <div className=''>
          <button
            type='submit'
            disabled={pending}
            className={`w-full px-4 py-2 text-white rounded ${
              pending ? 'opacity-50 cursor-progress bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {pending ? 'Loading...' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
}
