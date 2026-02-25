import { NextResponse } from "next/server";

import { interestTypes } from "@/lib/lead-capture";

type LeadBody = {
  name?: string;
  email?: string;
  interestType?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as LeadBody;
  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const interestType = body.interestType?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !interestType) {
    return NextResponse.json(
      { ok: false, message: "Please complete all required fields." },
      { status: 400 },
    );
  }

  if (!interestTypes.includes(interestType as (typeof interestTypes)[number])) {
    return NextResponse.json(
      { ok: false, message: "Interest type is invalid." },
      { status: 400 },
    );
  }

  // Mock endpoint behavior for v1. Swap with real CRM/API integration later.
  if (email.endsWith("@error.test")) {
    return NextResponse.json(
      { ok: false, message: "Submission failed. Please retry." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    message,
  });
}
