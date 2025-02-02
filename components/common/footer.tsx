import Link from "next/link";

export default function Footer() {
    return (
        <footer className="px-4 py-12 w-full bg-background border-t border-border sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 mx-auto max-w-6xl md:grid-cols-4">
                <div>
                    <h4 className="mb-4 text-lg font-semibold">Marketplace</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><Link href="/gems" className="hover:text-primary transition-colors">Gems & Jewelry</Link></li>
                        <li><Link href="/fishing" className="hover:text-primary transition-colors">Fishing</Link></li>
                        <li><Link href="/local" className="hover:text-primary transition-colors">Local Products</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 text-lg font-semibold">Company</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 text-lg font-semibold">Resources</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
                        <li><Link href="/guides" className="hover:text-primary transition-colors">Guides</Link></li>
                        <li><Link href="/help" className="hover:text-primary transition-colors">Help Center</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 text-lg font-semibold">Legal</h4>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                        <li><Link href="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 pt-8 text-sm text-center text-muted-foreground border-t border-border">
                © {new Date().getFullYear()} Coastline. All rights reserved.
            </div>
        </footer>
    )
}