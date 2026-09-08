import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/components/cart/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import WhatsAppButton from '@/components/layout/WhatsAppButton';

export const metadata: Metadata = {
  title: '2A Business | Énergie Solaire & Installations Électriques',
  description:
    'Entreprise leader en solutions solaires photovoltaïques, électricité industrielle et tertiaire, vente de matériel et audit énergétique.',
  keywords: [
    '2A Business',
    'Énergie solaire',
    'Panneaux photovoltaïques',
    'Onduleurs hybrides',
    'Batteries lithium',
    'Électricité industrielle',
    'Dakar Sénégal',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <body className="flex flex-col min-h-full font-sans antialiased text-slate-800 bg-slate-50 selection:bg-brand-gold-500 selection:text-slate-950">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
