'use server';

import { signIn, signOut } from '@/auth';
import { db } from '@/db';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { isRedirectError } from 'next/dist/client/components/redirect';

export async function getUserByEmail(email: string) {
  const user = await db.user.findUnique({ where: { email } });
  console.log(user);

  return user;
}

export async function login(provider: string) {
  await signIn(provider, { redirectTo: '/' });
  revalidatePath('/', 'layout');
}

export async function logout() {
  await signOut({ redirectTo: '/' });
  revalidatePath('/', 'layout');
}

export async function loginWithCredentials(state: void | string, formData: FormData) {
  console.log({ formData: formData.entries() });

  try {
    await signIn('credentials', {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      redirectTo: '/',
    });
    revalidatePath('/', 'layout');
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    if (error instanceof Error) {
      const { type, cause } = error as AuthError;
      switch (type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        case 'CallbackRouteError':
          return cause?.err?.toString();
        default:
          return 'Something went wrong.';
      }
    }
  }
}
