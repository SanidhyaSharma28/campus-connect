
import { useUser } from "@clerk/nextjs";
import { adminEmails } from "../utils/roles";

export const useAuth = () => {
    const { user } = useUser();

    const isAdmin = user ? adminEmails.includes(String(user.primaryEmailAddress)) : false;

    return { user, isAdmin };
};
