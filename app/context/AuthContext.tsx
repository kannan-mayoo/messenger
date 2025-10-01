// "use client";

// import { SessionProvider } from "next-auth/react";

// interface AuthContextProps {
//     children:React.ReactNode;
// }

// export default function AuthContext({children}:AuthContextProps) {

// }



"use client";

import { SessionProvider } from "next-auth/react";


interface AuthContextProps{
    children:React.ReactNode;
}

export default function Authcontext({children}:AuthContextProps) {
    return <SessionProvider>{children}</SessionProvider>
}

