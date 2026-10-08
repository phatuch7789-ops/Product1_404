import { auth } from "@/auth";
import { AuthButtons } from "./components/AuthButtons";
import ProductExplorer from "./components/ProductExplorer";

export default async function Home() {
  const session = await auth();
  const isLoggedIn = Boolean(session?.user);

  return (
    <>
      <header className="site-auth-header">
        <AuthButtons
          isLoggedIn={isLoggedIn}
          userName={session?.user?.name}
        />
      </header>
      <ProductExplorer isLoggedIn={isLoggedIn} />
    </>
  );
}