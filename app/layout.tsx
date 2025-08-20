import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Torre de Hanói - Jogo de Lógica',
  description: 'Desafie-se com o clássico jogo Torre de Hanói em 5 níveis diferentes. Complete todos os níveis no menor tempo possível!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>{children}</body>
    </html>
  );
}