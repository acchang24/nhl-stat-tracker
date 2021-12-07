import { useAuth0 } from "@auth0/auth0-react";

export default function SignupButton() {
    const { loginWithRedirect } = useAuth0();

    return (
        <button type="button" className="btn btn-default" onClick={() => {
            loginWithRedirect({
                screen_hint: "signup",
            });
        }}>
            Sign Up
        </button>
    );
}
