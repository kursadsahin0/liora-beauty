import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer/Footer";
import { Header } from "@/components/layout/Header/Header";
import { MobileDock } from "@/components/layout/MobileDock/MobileDock";
import { SkipLink } from "@/components/layout/SkipLink/SkipLink";
import styles from "./SiteShell.module.scss";

type SiteShellProps = {
  children: ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className={styles.shell}>
      <SkipLink />
      <Header />
      <main id="main-content" className={styles.main}>
        {children}
      </main>
      <Footer />
      <MobileDock />
    </div>
  );
}
