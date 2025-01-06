import React from 'react';
import './globals.css';
import LayoutRecoil from './layout.recoil';

export const metadata = {
  title: 'myfair front pre-course',
  description: 'todolist',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="px-2">
          <LayoutRecoil>{children}</LayoutRecoil>
        </main>
      </body>
    </html>
  );
}
