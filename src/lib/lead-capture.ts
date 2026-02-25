export const interestTypes = ["Investor", "Member", "Corporate"] as const;

export type InterestType = (typeof interestTypes)[number];

export type LeadCapturePayload = {
  name: string;
  email: string;
  interestType: InterestType;
  message: string;
};

type SubmitLeadResult = {
  ok: boolean;
  message?: string;
};

export async function submitLeadCapture(
  payload: LeadCapturePayload,
): Promise<SubmitLeadResult> {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let responseData: SubmitLeadResult | null = null;

  try {
    responseData = (await response.json()) as SubmitLeadResult;
  } catch {
    responseData = null;
  }

  if (!response.ok || !responseData?.ok) {
    throw new Error(responseData?.message ?? "Unable to submit form.");
  }

  return responseData;
}
