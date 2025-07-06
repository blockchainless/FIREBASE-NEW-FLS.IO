import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Demo',
  description: 'Restore or create your crypto wallet.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <main className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="absolute inset-0 h-full w-full bg-black bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="relative z-10 w-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
