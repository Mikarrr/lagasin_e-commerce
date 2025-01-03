import ClientPanel from "@/components/account/clientPanel/clientPanel";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Account - Luis de Lagasin",
  description: "HI! WELCOME BACK.",
  robots: {
    index: false,
    follow: false,
  },
};

const Account = () => {
  return (
    <main>
      <ClientPanel />
    </main>
  );
};

export default Account;
