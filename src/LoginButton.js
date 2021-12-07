import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton() {
    const { loginWithRedirect } = useAuth0();

    return (
        <button type="button" className="btn btn-default" onClick={() => {
            loginWithRedirect();
        }}>
            Log In
        </button>
    );
}
