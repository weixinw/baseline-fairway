"use client";

import { FormEvent, useMemo, useState } from "react";

import {
  interestTypes,
  type InterestType,
  submitLeadCapture,
  type LeadCapturePayload,
} from "@/lib/lead-capture";
import { trackEvent } from "@/lib/tracking";

type LeadFormValues = {
  name: string;
  email: string;
  interestType: "" | InterestType;
  message: string;
};

type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

const initialValues: LeadFormValues = {
  name: "",
  email: "",
  interestType: "",
  message: "",
};

function isEmailValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validate(values: LeadFormValues): LeadFormErrors {
  const errors: LeadFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isEmailValid(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.interestType) {
    errors.interestType = "Please select an interest type.";
  }

  return errors;
}

export function LeadCaptureForm() {
  const [values, setValues] = useState<LeadFormValues>(initialValues);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [lastPayload, setLastPayload] = useState<LeadCapturePayload | null>(null);

  const isSubmitting = status === "submitting";
  const hasErrors = useMemo(() => Object.keys(errors).length > 0, [errors]);

  const submitPayload = async (payload: LeadCapturePayload) => {
    setStatus("submitting");
    setStatusMessage("");
    setLastPayload(payload);

    trackEvent("form_submit_attempt", {
      interestType: payload.interestType,
    });

    try {
      await submitLeadCapture(payload);
      trackEvent("form_submit_success", {
        interestType: payload.interestType,
      });
      setStatus("success");
      setStatusMessage("Thanks. Your request has been received.");
      setValues(initialValues);
      setErrors({});
    } catch {
      trackEvent("form_submit_error", {
        interestType: payload.interestType,
      });
      setStatus("error");
      setStatusMessage("Submission failed. Please try again.");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    await submitPayload({
      name: values.name.trim(),
      email: values.email.trim(),
      interestType: values.interestType as InterestType,
      message: values.message.trim(),
    });
  };

  const handleRetry = async () => {
    if (!lastPayload || isSubmitting) {
      return;
    }

    await submitPayload(lastPayload);
  };

  return (
    <section className="shell lead-capture-section" id="contact" aria-labelledby="lead-capture-title">
      <div className="lead-capture-header">
        <p className="eyebrow">Lead Capture</p>
        <h2 id="lead-capture-title">Book discovery or request member and investor details</h2>
        <p className="lead-capture-subhead">
          Share your interest and our team will follow up with next steps.
        </p>
      </div>

      <form className="lead-capture-form" onSubmit={handleSubmit} noValidate data-track-event="form_submit_attempt">
        <div className="lead-capture-grid">
          <div className="form-field">
            <label htmlFor="lead-name">Name</label>
            <input
              id="lead-name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "lead-name-error" : undefined}
            />
            {errors.name ? (
              <p id="lead-name-error" className="form-error" role="alert">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className="form-field">
            <label htmlFor="lead-email">Email</label>
            <input
              id="lead-email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "lead-email-error" : undefined}
            />
            {errors.email ? (
              <p id="lead-email-error" className="form-error" role="alert">
                {errors.email}
              </p>
            ) : null}
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="lead-interest-type">Interest Type</label>
          <select
            id="lead-interest-type"
            name="interestType"
            value={values.interestType}
            onChange={(event) =>
              setValues((prev) => ({
                ...prev,
                interestType: event.target.value as LeadFormValues["interestType"],
              }))
            }
            aria-invalid={Boolean(errors.interestType)}
            aria-describedby={errors.interestType ? "lead-interest-type-error" : undefined}
          >
            <option value="">Select one</option>
            {interestTypes.map((interestType) => (
              <option key={interestType} value={interestType}>
                {interestType}
              </option>
            ))}
          </select>
          {errors.interestType ? (
            <p id="lead-interest-type-error" className="form-error" role="alert">
              {errors.interestType}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="lead-message">Message (optional)</label>
          <textarea
            id="lead-message"
            name="message"
            rows={4}
            value={values.message}
            onChange={(event) => setValues((prev) => ({ ...prev, message: event.target.value }))}
          />
        </div>

        <div className="lead-capture-actions">
          <button
            className="cta-button"
            type="submit"
            disabled={isSubmitting}
            data-track-event="form_submit_attempt"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>

          {status === "error" && lastPayload ? (
            <button className="lead-retry-button" type="button" onClick={handleRetry}>
              Retry
            </button>
          ) : null}
        </div>

        {status === "success" ? (
          <p className="form-status form-status-success" data-track-event="form_submit_success">
            {statusMessage}
          </p>
        ) : null}

        {status === "error" ? (
          <p className="form-status form-status-error" data-track-event="form_submit_error">
            {statusMessage}
          </p>
        ) : null}

        {status === "idle" && hasErrors ? (
          <p className="form-status form-status-error">Please resolve the errors before submitting.</p>
        ) : null}
      </form>
    </section>
  );
}
