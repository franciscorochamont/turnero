import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type ButtonProps = {
    children: ReactNode
    type: 'button' | 'submit'
}

export default function Button({ children, type }: ButtonProps) {
  return (
    <button className="bg-primario text-white px-4 py-2 rounded-xl shadow-sm hover:bg-primario/80 
       outline-none focus:border-primario focus:ring-2 focus:ring-primario/30 cursor-pointer
       flex items-center gap-2 justify-center"
       type={type}
    >
        <span>
            {children}
        </span>
        <ArrowRight height={20} width={20} />
    </button>
  )
}


