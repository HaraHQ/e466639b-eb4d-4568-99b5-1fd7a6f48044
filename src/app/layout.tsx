'use client'
import { Roboto } from 'next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './globals.css'
import { useEffect, useState } from 'react';

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

const client = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [ready, setReady] = useState<boolean>(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <QueryClientProvider client={client}>
      <html lang="en">
        {ready && (
          <head>
            <title>Ambisius Rixki</title>
            <meta name="description" content="For applying job on ambisius" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" type="image/png" href="/favicon.png" sizes="64x64" />
          </head>
        )}
        <body className={roboto.className}>{children}</body>
      </html>
    </QueryClientProvider>
  )
}
