import { NextResponse } from 'next/server';

export function middleware(request: Request) {
    const url = new URL(request.url);
    const domain = url.origin;

    // Adiciona o domínio a cada resposta
    const response = NextResponse.next();
    response.headers.set('x-domain', domain);

    return response;
}

export const config = {
    matcher: '/:path*',
};