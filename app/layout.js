export const metadata = {
  title: "YouTube Title Optimizer | Score, Analyze & A/B Test Your Titles",
  description: "Score your YouTube title out of 100. Analyzes length, keywords, structure, and click-through potential — with preview across search, mobile, and desktop. Includes A/B comparison and title pattern guide.",
  
  alternates: {
    canonical: "https://www.youtubetitlechecker.com",           // ← MUST CHANGE
  },

  openGraph: {
    title: "YouTube Title Optimizer | Score, Analyze & A/B Test Your Titles",
    description: "Score your YouTube title out of 100. Analyzes length, keywords, structure, and click-through potential — with preview across search, mobile, and desktop. Includes A/B comparison and title pattern guide.",
    url: "https:/www.youtubetitlechecker.com",                 // ← MUST CHANGE
    siteName: "Moneywise Calculators",             // ← Change
    images: [
      {
        url: "https://www.youtubetitlechecker.com/og-image.png", // ← MUST CHANGE
        width: 1200,
        height: 630,
        alt: "YouTube Title Optimizer",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "YouTube Title Optimizer | Score, Analyze & A/B Test Your Titles",
    description: "Score your YouTube title out of 100. Analyzes length, keywords, structure, and click-through potential — with preview across search, mobile, and desktop. Includes A/B comparison and title pattern guide.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },


authors: [{ name: "David Graham" }],
creator: "MoneyWise Calculators",
publisher: "MoneyWise Calculators",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}