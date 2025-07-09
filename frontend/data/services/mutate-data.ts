import { getStrapiURL } from '@/lib/utils';
import { getAuthToken } from './get-token';

export async function mutateData(method: string, path: string, payload?: any) {
    const baseUrl = getStrapiURL();
    const authToken = await getAuthToken();
    const url = new URL(path, baseUrl);

    if (!authToken) throw new Error('No auth token found');

    try {
        const body = JSON.stringify({ ...payload });

        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
            body,
        });

        if (method === 'DELETE') {
            return response.ok;
        }

        const data = await response?.json();
        return data;
    } catch (error) {
        console.log('error', error);
        throw error;
    }
}
