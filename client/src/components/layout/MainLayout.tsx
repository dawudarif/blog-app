import React from 'react';
import { Toaster } from '../ui/toaster';
import Header from './Header';
import Footer from './Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster />
      <Header />
      {children}
      <Footer />
    </>
  );
}
