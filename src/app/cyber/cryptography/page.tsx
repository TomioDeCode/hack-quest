// src/app/reverse-engineering/page.tsx
"use client";

import React from "react";
import { CTFChallenge } from "@/components/fragments/SidePage";
import SubmitFlag from "@/components/fragments/SubmitFlag";
import { cryptoData } from "@/helpers/cryptoData";

export default function page() {
  return (
    <CTFChallenge
      challenges={cryptoData}
      SubmitFlagComponent={SubmitFlag}
      title="Cryptography Engineering CTF"
    />
  );
}
