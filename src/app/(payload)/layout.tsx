/* Layout-ul panoului de administrare.
 *
 * Sta intr-un grup de rute separat tocmai ca sa NU mosteneasca shell-ul
 * site-ului (fonturi, header, footer, fundalul cu linii). De aceea nu mai
 * exista layout la radacina: fiecare grup il are pe al lui. */
import config from "@payload-config";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import type { ServerFunctionClient } from "payload";
import React from "react";

import { importMap } from "./admin/importMap.js";
import "@payloadcms/next/css";

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({ ...args, config, importMap });
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  );
}
