import type { APIRoute } from 'astro';

export const prerender = false;

const UPSTREAM = 'https://omni-media-library.netlify.app';

export const GET: APIRoute = async ({ params, request }) => {
    const search = new URL(request.url).search || '';
    const path = params.path ? `/${params.path}` : '/';
    const target = `${UPSTREAM}${path}${search}`;

    const res = await fetch(target, { redirect: 'manual' });
    const headers = new Headers(res.headers);
    // Avoid caching mismatches while testing
    headers.set('cache-control', 'no-store');
    return new Response(res.body, { status: res.status, headers });
};
