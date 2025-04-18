import SignIn from "./sign-in";
import { signIn, auth } from "../../../../auth";
import { redirect } from "next/navigation";

const SignInPage = async () => {

  const session = await auth();

  if(session){
    return redirect("/");
  }

  return <SignIn handleSignIn={
    async () => {
      "use server"
      await signIn("google")
    }
  } />
} 

export default SignInPage;