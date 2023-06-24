import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";


export interface UserDetailsT {
    username: string,
    email: string,
    emailVerified: boolean,
};


const useAuth = (): UserDetailsT | null => {
    const [userDetails, setUserDetails] = useState<UserDetailsT | null>(null);
    
    useEffect(() => {
        const getUserDetails = async () => {
            try {
                if (userDetails === null) {
                    const { username, attributes } = await Auth.currentAuthenticatedUser() || null;
                    setUserDetails({
                        username,
                        email: attributes?.email,
                        emailVerified: attributes?.email_verified
                    });
                }
            } catch {
                setUserDetails(null);
            }
        }

        if (userDetails === null) {
            getUserDetails();
        }
        Hub.listen('auth', () => getUserDetails());

    }, [userDetails, setUserDetails]);

    return userDetails;
};


export default useAuth;