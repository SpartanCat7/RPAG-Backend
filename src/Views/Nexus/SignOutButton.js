import { Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../../Utils/Firebase";
import { Navigate } from "react-router-dom";

function SignoutButton() {

    function userSignOut() {
        signOut(auth)
            .then(() => {
                return <Navigate to={"/"} />
            })
    }

    return (
        <Button onClick={() => {userSignOut()}}>
            Salir de Usuario
        </Button>
    )
}

export default SignoutButton;