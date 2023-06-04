// This is a dummy redirect component
import { useNavigate } from "react-router";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { HOME_PATH } from "./Home";
import { useEffect } from "react";


// TODO: Could possibly be improved with a redirect URL
const Login = () => {
    const navigate = useNavigate();
    useEffect(() => navigate(HOME_PATH));
    return <></>;
}


export default withAuthenticator(Login);
export const LOGIN_PATH = '/login';
