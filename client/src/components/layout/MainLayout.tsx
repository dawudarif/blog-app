import React from 'react';
import { Toaster } from '../ui/sonner';
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
