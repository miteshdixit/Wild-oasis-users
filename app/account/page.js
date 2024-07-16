

import { auth } from "../_lib/auth";
export const metadata = {
  title: 'Accounts',
};
export default async function Page() {
  const session  = await auth();

  const firstName = session.user.name.split(" ").at(0);
  return (
    <div className="text-l mb-10 text-accent-400">
      Welcome , {firstName}
   
    </div>
  )
}
