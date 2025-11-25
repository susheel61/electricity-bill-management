import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative mt-auto w-full overflow-hidden bg-black text-white border-t border-white/10">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="container mx-auto px-4 py-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand Section */}
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-lg font-bold text-white tracking-tight">
                            Electricity Bill Manager
                        </h3>
                        <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                            Simplify your utility management. Track, analyze, and optimize your electricity consumption with ease.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col space-y-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                            Other Projects
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="https://waterusage.susheel.dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center text-gray-400 hover:text-blue-400 transition-colors"
                                >
                                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 group-hover:scale-125 transition-transform shadow-lg shadow-blue-500/50"></span>
                                    Water Usage Tracker
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://milletsmandir.susheel.dev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center text-gray-400 hover:text-green-400 transition-colors"
                                >
                                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 group-hover:scale-125 transition-transform shadow-lg shadow-green-500/50"></span>
                                    Millets Mandir
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Connect / Copyright */}
                    <div className="flex flex-col space-y-4 md:items-end">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
                            Connect
                        </h3>
                        <div className="flex space-x-4">
                            {/* Add social icons here if needed, for now just text links or placeholders */}
                            <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline decoration-blue-500 underline-offset-4">
                                GitHub
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors hover:underline decoration-blue-500 underline-offset-4">
                                Twitter
                            </a>
                        </div>
                        <p className="text-xs text-gray-600 mt-auto">
                            &copy; {new Date().getFullYear()} Susheel Singh. All rights reserved.
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 text-center">
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
                        Made with <span className="text-red-500 animate-pulse">♥</span> by Susheel
                    </p>
                </div>
            </div>
        </footer>
    );
}
