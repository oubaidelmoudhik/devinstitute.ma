"use client";

import React from "react";
import { I18nProvider } from "@/i18n/provider";
import ClientInitializer from "@/components/common/ClientInitializer";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nProvider>
      <ClientInitializer />
      {children}
    </I18nProvider>
  );
}
