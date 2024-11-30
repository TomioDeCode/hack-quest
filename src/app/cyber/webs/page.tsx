"use client";

import React from "react";
import { CTFChallenge } from "@/components/fragments/SidePage";
import SubmitFlag from "@/components/fragments/SubmitFlag";
import { websData } from "@/helpers/websData";

export default function page() {
  return (
    <CTFChallenge
      challenges={websData}
      SubmitFlagComponent={SubmitFlag}
      title="Webs CTF"
    />
  );
}
