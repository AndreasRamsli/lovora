import UserButton from "./UserButton";
import { BillingShell } from "./BillingShell";

export default function UserMenu({ children }) {
  return (
    <BillingShell>
      <div className="w-auto h-auto">
        <UserButton />
        {children}
      </div>
    </BillingShell>
  );
}
