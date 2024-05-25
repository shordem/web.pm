import { Button } from "@/components/ui/button";
import { useRouter } from "@/router/router.hook";
import { PiArrowUUpLeftBold } from "react-icons/pi";
import OrganizationSettings from "./organization-settings";
import UserDetails from "./user-details";

function DashboardSettingsPage() {
  const router = useRouter();
  return (
    <div className="sm:px-16 px-4 py-10">
      <div className="w-full flex justify-start gap-4 mb-10">
        <Button
          variant="ghost"
          colorScheme="none"
          icon={<PiArrowUUpLeftBold />}
          onClick={() => router.goBack()}
        >
          Go Back to Dashboard
        </Button>
      </div>

      <section className="w-full flex sm:flex-row flex-col gap-10">
        <OrganizationSettings />

        <UserDetails />
      </section>
    </div>
  );
}

export default DashboardSettingsPage;
