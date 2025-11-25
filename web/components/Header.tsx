import Link from 'next/link';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md supports-[backdrop-filter]:bg-black/60 text-white">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                            E
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Electricity Bill Manager
                        </span>
                    </Link>
                </div>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
                    <Link href="/" className="hover:text-white transition-colors hover:scale-105 transform duration-200">
                        Dashboard
                    </Link>
                    <Link href="/history" className="hover:text-white transition-colors hover:scale-105 transform duration-200">
                        History
                    </Link>
                </nav>
                <div className="flex items-center gap-4">
                    {/* Placeholder for future user menu or theme toggle */}
                    <div className="h-8 w-8 rounded-full bg-gray-800 border border-gray-700 animate-pulse"></div>
                </div>
            </div>
        </header>
    );
}
