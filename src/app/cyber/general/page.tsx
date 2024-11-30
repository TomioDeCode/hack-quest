"use client";

import React from "react";
import { CTFChallenge } from "@/components/fragments/SidePage";
import SubmitFlag from "@/components/fragments/SubmitFlag";
import { generalData } from "@/helpers/generalData";

export default function page() {
  return (
    <CTFChallenge
      challenges={generalData}
      SubmitFlagComponent={SubmitFlag}
      title="General CTF"
    />
  );
}
