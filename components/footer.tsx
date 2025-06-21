'use client';

import Link from 'next/link';
import { Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="sticky bottom-0 border-t border-zinc-200 bg-zinc-100 py-6 px-8 w-full">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-600">
        <div className="text-center sm:text-right">
          © 2025 All rights reserved
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/tomerlevy1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 transition-colors"
            aria-label="GitHub Profile"
          >
            <Github className="h-5 w-5" />
          </Link>

          <Link
            href="https://www.linkedin.com/in/tomerl1/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-5 w-5" />
          </Link>

          {/* Hidden dummy link for testing */}
          <Link
            href="/test-footer-link"
            className="sr-only"
            aria-label="Test Footer Link"
          >
            Test Link
          </Link>
        </div>
      </div>
    </footer>
  );
}
