// src/app/reverse-engineering/page.tsx
"use client";

import React from "react";
import { CTFChallenge } from "@/components/fragments/SidePage";
import SubmitFlag from "@/components/fragments/SubmitFlag";
import { forensicDta } from "@/helpers/forensicDta";

export default function page() {
  return (
    <CTFChallenge
      challenges={forensicDta}
      SubmitFlagComponent={SubmitFlag}
      title="Reverse Engineering CTF"
    />
  );
}
