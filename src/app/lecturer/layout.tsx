import { AppShell } from "@/components/layout";

export default function LecturerLayout({ children }: { children: React.ReactNode }) {
  return <AppShell experience="lecturer">{children}</AppShell>;
}
