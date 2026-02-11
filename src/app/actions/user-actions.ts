'use server';

import { setCookieValue, deleteCookieValue } from '@/lib/cookies';
import type { User } from '@/types';

export async function saveUserToCookie(user: User) {
  await setCookieValue('user', JSON.stringify(user));
}

export async function clearUserCookie() {
  await deleteCookieValue('user');
}

export async function saveUserSettings(settings: {
  theme?: string;
  language?: string;
  fontSize?: string;
}) {
  await setCookieValue('user-settings', JSON.stringify(settings));
}
