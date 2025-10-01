// import { default } from "next-auth/middleware";
// import { signIn } from 'next-auth/react';
import { withAuth } from "next-auth/middleware";

// import config from './messenger/tailwind.config';

export default withAuth({
    pages:{
        signIn: "/"
    }
});

export const config = {
    matcher: [
        "/users/:path*"
    ]
};