'use server';

import { getStrapiURL } from '@/lib/utils';
import qs from 'qs';
import { getAuthToken } from './get-token';

export async function getUserMeLoader() {
    const baseUrl = getStrapiURL();

    const url = new URL('/api/users/me', baseUrl);

    url.search = qs.stringify({
        populate: {
            image: {
                fields: ['url', 'alternativeText'],
            },
        },
    });

    const authToken = await getAuthToken();
    if (!authToken) return { ok: false, data: null, error: null };

    try {
        const response = await fetch(url.href, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        });
        const data = await response.json();
        if (data.error) return { ok: false, data: null, error: data.error };
        return { ok: true, data: data, error: null };
    } catch (error) {
        console.log(error);
        return { ok: false, data: null, error: error };
    }
}
