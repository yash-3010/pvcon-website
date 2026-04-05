import { Geist } from "next/font/google";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// Minimal root layout — the [locale]/layout.tsx provides html/body/lang
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
