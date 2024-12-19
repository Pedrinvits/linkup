import ContactsPage from "@/components/ContactPage";
import { currentUser } from "@/lib/auth";
export default  async function Home() {
  return (
    <>
        <main className="p-4 md:p-6 w-full">
          <ContactsPage/>
        </main>
    </>
  );
}
