import type { ReactNode } from "react"

type LayoutProps = {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-fondo font-inter text-texto">
      <main className="mx-auto grid max-w-6xl gap-10 px-4 py-8
                   lg:grid-cols-[20rem_1fr] lg:gap-16 lg:py-14"
        >
            {children}
      </main>
    </div>
  )
}
