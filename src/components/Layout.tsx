import type { ReactNode } from "react"

type LayoutProps = {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <header>
        <h1>Turnero App</h1>
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}
