import { motion } from "framer-motion";
import { Twitter, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  const links = {
    quickLinks: [
      { href: "#features", label: "Features" },
      { href: "#languages", label: "Languages" },
      { href: "#download", label: "Download" },
      { href: "#", label: "Support" }
    ],
    legal: [
      { href: "#", label: "Privacy Policy" },
      { href: "#", label: "Terms of Service" },
      { href: "#", label: "Accessibility" }
    ]
  };

  const socialIcons = [
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Facebook, href: "#", label: "Facebook" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  const handleSmoothScroll = (href: string) => {
    if (href.startsWith('#') && href !== '#') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="bg-[hsl(var(--voxity-dark))] text-white py-20">
      <div className="w-full px-8 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="40" height="40" rx="8" fill="hsl(var(--voxity-primary))"/>
                  <path d="M12 20C12 16.13 15.13 13 19 13V27C15.13 27 12 23.87 12 20Z" fill="hsl(var(--voxity-secondary))"/>
                  <path d="M19 13C22.87 13 26 16.13 26 20C26 23.87 22.87 27 19 27V13Z" fill="white"/>
                </svg>
                <span className="text-2xl font-bold">
                  Vox<span className="text-[hsl(var(--voxity-secondary))]">ity</span>
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed text-lg">
                Empowering communication for the deaf and hard of hearing community across India with cutting-edge accessibility technology.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-semibold mb-6 text-xl">Quick Links</h4>
              <ul className="space-y-4 text-gray-400">
                {links.quickLinks.map((link, index) => (
                  <li key={`${link.href}-${index}`}>
                    <motion.button
                      onClick={() => handleSmoothScroll(link.href)}
                      className="hover:text-[hsl(var(--voxity-secondary))] transition-colors duration-300 text-left text-lg"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {link.label}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-semibold mb-6 text-xl">Legal</h4>
              <ul className="space-y-4 text-gray-400">
                {links.legal.map((link, index) => (
                  <li key={`${link.href}-legal-${index}`}>
                    <motion.a
                      href={link.href}
                      className="hover:text-[hsl(var(--voxity-secondary))] transition-colors duration-300 text-lg"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-semibold mb-6 text-xl">Connect With Us</h4>
              <div className="flex space-x-4 mb-6">
                {socialIcons.map(({ Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    className="w-12 h-12 bg-[hsl(var(--voxity-primary))] rounded-full flex items-center justify-center hover:bg-[hsl(var(--voxity-secondary))] transition-colors duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    aria-label={label}
                  >
                    <Icon size={24} />
                  </motion.a>
                ))}
              </div>
              <p className="text-gray-400 text-lg">
                Join our community and stay updated with the latest accessibility innovations.
              </p>
            </motion.div>
          </div>
          
          <motion.div 
            className="border-t border-gray-600 mt-16 pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-lg">&copy; 2024 Voxity Technologies. All rights reserved. Made with ❤️ in India.</p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}