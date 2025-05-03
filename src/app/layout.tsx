import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import { APP_NAME, APP_DESCRIPTION, SERVER_URL } from '../lib/constants';
import { ThemeProvider } from 'next-themes';
import { GlobalStyles } from '@/styles/global-styles';
import { PopupProvider } from '../contexts/PopupContext';
// import StyledComponentsRegistry from '../lib/styled-components-registry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: `%s | Arquiteto Brownie`,
    default: APP_NAME || '',
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <PopupProvider>
            {/* <StyledComponentsRegistry> */}
              {children}
            {/* </StyledComponentsRegistry> */}
          </PopupProvider>
          <GlobalStyles />
        </ThemeProvider>
      </body>
    </html>
  );
}
