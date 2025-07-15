/* eslint-disable import/no-anonymous-default-export */
import { Button } from "./button"; // adjust based on your Button location
import { signIn, signOut } from "../../../auth.config";

export function SignIn({
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signIn();
      }}
    >
      <Button {...props}>Sign In</Button>
    </form>
  );
}

export function SignOut({
  ...props
}: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button {...props}>Sign Out</Button>
    </form>
  );
}

export default { SignIn, SignOut };
