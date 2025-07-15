import { auth } from "../../../auth.config";
import { SignIn, SignOut } from "./signInAndSignOutButton";

export default async function SignInSignOutButton() {
  const session = await auth();

  if (!session?.user) return <SignIn />;

  return (
    <>
      <div>
        <span>{session.user.email}</span>
        <p>{session.user.name}</p>
      </div>
      <SignOut />
    </>
  );
}
