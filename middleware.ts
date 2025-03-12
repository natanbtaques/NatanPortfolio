import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware to handle region selection and onboarding status.
 */
export async function middleware(request: NextRequest) {
  let cacheIdCookie = request.cookies.get("_medusa_cache_id");
  let cacheId = cacheIdCookie?.value || crypto.randomUUID();

  // Obtém o código do país a partir do cabeçalho ou usa "us" como padrão
  const countryCode = request.headers.get("x-vercel-ip-country") || "en";

  // Lista de idiomas suportados
  const supportedLanguages = ["en", "es", "pt"];

  // Obtém a URL da requisição
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;
  const firstPathSegment = pathname.split("/")[1];

  // Se o primeiro segmento da URL já for um idioma suportado, respeitamos ele
  const urlHasLanguage = supportedLanguages.includes(firstPathSegment);

  // Se a URL já contém um idioma válido e o cacheId está definido, continua normalmente
  if (urlHasLanguage && cacheIdCookie) {
    return NextResponse.next();
  }

  // Se for um arquivo estático, continua normalmente
  if (pathname.includes(".")) {
    return NextResponse.next();
  }

  // Se a URL não contém um idioma, redirecionamos para o idioma baseado no país detectado
  if (!urlHasLanguage) {
    const redirectUrl = `${nextUrl.origin}/${countryCode}${pathname}${nextUrl.search}`;
    return NextResponse.redirect(redirectUrl, 307);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp).*)",
  ],
};
