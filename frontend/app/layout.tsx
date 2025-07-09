import { Footer } from '@/components/custom/footer';
import { Header } from '@/components/custom/header';
import { getGlobalData, getGlobalPageMetadata } from '@/data/loaders';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await getGlobalPageMetadata();

    return {
        title: metadata?.data?.title ?? 'Epic Next Course',
        description: metadata?.data?.description ?? 'Epic Next Course',
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const globalData = await getGlobalData();

    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
            >
                <Toaster position="bottom-center" />
                <Header data={globalData.data.header} />
                <div className="flex-1 ">{children}</div>
                <Footer data={globalData.data.footer} />
            </body>
        </html>
    );
}
