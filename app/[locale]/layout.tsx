import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter } from 'next/font/google';
import Script from 'next/script';
const inter = Inter({ subsets: ['latin'] });

import { ThemeProvider } from '@/components/theme-provider';
import '../globals.css';


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={locale === 'km' ? 'font-battambang' : ''} suppressHydrationWarning>
      <body className={locale !== 'km' ? inter.className : ''} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            {process.env.NODE_ENV === 'production' && (
              <Script 
                src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" 
                strategy="afterInteractive" 
              />
            )}
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
