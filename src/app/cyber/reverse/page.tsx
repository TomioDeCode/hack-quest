// src/app/reverse-engineering/page.tsx
"use client";

import React from "react";
import { CTFChallenge } from "@/components/fragments/SidePage";
import { reverseData } from "@/helpers/reverseData";
import SubmitFlag from "@/components/fragments/SubmitFlag";

export default function page() {
  return (
    <CTFChallenge
      challenges={reverseData}
      SubmitFlagComponent={SubmitFlag}
      title="Reverse Engineering CTF"
    />
  );
}
