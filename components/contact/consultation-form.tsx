'use client'

import Link from 'next/link'
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import {
  fieldOrder,
  limits,
  normalize,
  organizationSizes,
  projectTypes,
  validate,
  type ConsultationInput,
  type FieldErrors,
} from '@/lib/validation'

const MIN_FILL_MS = 3000
const SUBMIT_TIMEOUT_MS = 30_000

/**
 * Payload for form-to-email services (FormSubmit.co, Formspree). Keys are
 * human-readable because they become the rows of the notification email;
 * underscore keys are service controls (subject, reply-to, email layout).
 */
function toSubmission(input: ConsultationInput, source: string): Record<string, string> {
  return {
    _subject: `Consultation request — ${input.company}`,
    _replyto: input.email,
    _template: 'table',
    _captcha: 'false',
    Name: input.fullName,
    'Work email': input.email,
    Company: input.company,
    Role: input.role,
    Industry: input.industry,
    'Organization size': input.organizationSize || 'Not provided',
    'Project type': input.projectType,
    'Current systems': input.currentSystems || 'Not provided',
    Goals: input.goals,
    'Preferred meeting time': input.preferredTime || 'Not provided',
    Consent: input.consent ? 'Agreed to privacy notice' : 'No',
    'Submitted from': source,
  }
}

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'sent' }
  | { kind: 'not_configured' }
  | { kind: 'error'; message: string }

interface Props {
  industries: string[]
  contactEmail: string | null
  schedulingUrl: string | null
  /** External JSON endpoint (the site is static). Null means submissions are not connected. */
  endpoint: string | null
  defaultProjectType?: string
}

const inputBase =
  'mt-2 block w-full rounded-md border bg-white px-3.5 text-[0.95rem] text-ink transition-colors placeholder:text-muted/70 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1'

function Field({
  name,
  label,
  optional,
  hint,
  error,
  children,
}: {
  name: keyof ConsultationInput
  label: string
  optional?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={name} className="flex items-baseline justify-between gap-3 text-[0.88rem] font-medium text-ink">
        {label}
        {optional && <span className="text-[0.78rem] font-normal text-muted">Optional</span>}
      </label>
      {hint && (
        <p id={`${name}-hint`} className="mt-1 text-[0.8rem] text-muted">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 flex items-start gap-1.5 text-[0.82rem] text-[#b3261e]">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

export function ConsultationForm({ industries, contactEmail, schedulingUrl, endpoint, defaultProjectType }: Props) {
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  // Compared against the submit event's timeStamp (same clock as performance.now()).
  const [startedAt] = useState(() => (typeof performance === 'undefined' ? 0 : performance.now()))
  const [goalsLength, setGoalsLength] = useState(0)
  const [slow, setSlow] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  const describedBy = (name: keyof ConsultationInput, hint = false) =>
    [hint && `${name}-hint`, errors[name] && `${name}-error`].filter(Boolean).join(' ') || undefined

  const cls = (name: keyof ConsultationInput) =>
    cn(inputBase, errors[name] ? 'border-[#b3261e] focus-visible:outline-[#b3261e]' : 'border-line-strong hover:border-ink/30 focus-visible:outline-teal-ink')

  const readForm = (form: HTMLFormElement): ConsultationInput => {
    const fd = new FormData(form)
    const raw: Record<string, unknown> = Object.fromEntries(fd.entries())
    raw.consent = fd.get('consent') === 'on'
    return normalize(raw)
  }

  // Re-validate a single field after it has shown an error, so messages clear as users fix them.
  const onBlurOrChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement
    const name = target.name as keyof ConsultationInput
    if (!errors[name] || !formRef.current) return
    const next = validate(readForm(formRef.current), industries)
    setErrors((prev) => ({ ...prev, [name]: next[name] }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const input = readForm(form)
    const found = validate(input, industries)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setStatus({ kind: 'idle' })
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }

    // Integration boundary: no endpoint configured means nothing can be delivered.
    if (!endpoint) {
      setStatus({ kind: 'not_configured' })
      requestAnimationFrame(() => statusRef.current?.focus())
      return
    }

    // Spam heuristics: hidden honeypot filled, or the form completed implausibly fast.
    const fd = new FormData(form)
    if (String(fd.get('website') ?? '') !== '' || e.timeStamp - startedAt < MIN_FILL_MS) {
      setStatus({ kind: 'error', message: 'Your enquiry could not be sent. Please wait a moment and try again.' })
      requestAnimationFrame(() => statusRef.current?.focus())
      return
    }

    setStatus({ kind: 'submitting' })
    const slowTimer = setTimeout(() => setSlow(true), 2500)
    try {
      // A urlencoded body with only an Accept header is a CORS "simple request":
      // the browser sends it directly, without a preflight OPTIONS round trip.
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { accept: 'application/json' },
        body: new URLSearchParams(toSubmission(input, window.location.href)),
        signal: AbortSignal.timeout(SUBMIT_TIMEOUT_MS),
      })
      const data = (await res.json().catch(() => ({}))) as { errors?: FieldErrors; success?: boolean | string; ok?: boolean }
      // FormSubmit answers 200 with `success: "false"` when delivery fails (e.g. before activation).
      const rejected = data.success === false || data.success === 'false' || data.ok === false
      if (res.ok && !rejected) {
        setStatus({ kind: 'sent' })
      } else if (res.status === 422 && data.errors) {
        setErrors(data.errors)
        setStatus({ kind: 'idle' })
        requestAnimationFrame(() => summaryRef.current?.focus())
        return
      } else if (res.status === 429) {
        setStatus({ kind: 'error', message: 'Too many submissions from this connection. Please wait a few minutes and try again.' })
      } else {
        setStatus({ kind: 'error', message: 'Your enquiry could not be sent. Please try again in a moment.' })
      }
    } catch (err) {
      const timedOut = err instanceof DOMException && err.name === 'TimeoutError'
      setStatus({
        kind: 'error',
        message: timedOut
          ? 'The delivery service did not respond in time, so your enquiry may not have been sent. Please try again.'
          : 'A network error prevented your enquiry from being sent. Check your connection and try again.',
      })
    } finally {
      clearTimeout(slowTimer)
      setSlow(false)
    }
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  if (status.kind === 'sent') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-2xl border border-teal/40 bg-teal-wash/50 p-8 outline-none sm:p-10">
        <CheckCircle2 className="h-8 w-8 text-teal-ink" strokeWidth={1.5} aria-hidden="true" />
        <h2 className="mt-5 text-[1.5rem] font-semibold tracking-tight text-ink">Thank you — your enquiry has been received.</h2>
        <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-ink-soft">
          A member of the DeepSuite team will review the details you shared and reply by email to arrange a conversation. No
          meeting has been scheduled yet; we will agree a time with you directly.
        </p>
        {schedulingUrl && (
          <a
            href={schedulingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-navy px-5 text-[0.9rem] font-medium text-white hover:bg-graphite"
          >
            Choose a time now <ArrowRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
        <p className="mt-8 text-[0.88rem] text-muted">
          While you wait, you may find our{' '}
          <Link href="/industries" className="text-teal-ink underline underline-offset-4">
            industry analyses
          </Link>{' '}
          or{' '}
          <Link href="/approach" className="text-teal-ink underline underline-offset-4">
            engineering approach
          </Link>{' '}
          useful.
        </p>
      </div>
    )
  }

  const errorList = fieldOrder.filter((f) => errors[f])

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} onBlur={onBlurOrChange} onChange={onBlurOrChange} className="space-y-8">
      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} role="alert" className="rounded-lg border border-[#b3261e]/40 bg-[#fdf0ee] p-5 outline-none">
          <p className="text-[0.95rem] font-semibold text-[#8c1d18]">Please review {errorList.length === 1 ? '1 field' : `${errorList.length} fields`}:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.88rem] text-[#8c1d18]">
            {errorList.map((f) => (
              <li key={f}>
                <a href={`#${f}`} className="underline underline-offset-2">
                  {errors[f]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <fieldset className="space-y-5">
        <legend className="font-mono text-[0.68rem] tracking-wider text-muted uppercase">About you</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field name="fullName" label="Full name" error={errors.fullName}>
            <input id="fullName" name="fullName" autoComplete="name" maxLength={limits.fullName} className={cn(cls('fullName'), 'h-11')} aria-invalid={Boolean(errors.fullName)} aria-describedby={describedBy('fullName')} />
          </Field>
          <Field name="email" label="Work email" error={errors.email}>
            <input id="email" name="email" type="email" autoComplete="email" inputMode="email" maxLength={limits.email} className={cn(cls('email'), 'h-11')} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('email')} />
          </Field>
          <Field name="company" label="Company" error={errors.company}>
            <input id="company" name="company" autoComplete="organization" maxLength={limits.company} className={cn(cls('company'), 'h-11')} aria-invalid={Boolean(errors.company)} aria-describedby={describedBy('company')} />
          </Field>
          <Field name="role" label="Job title or role" error={errors.role}>
            <input id="role" name="role" autoComplete="organization-title" maxLength={limits.role} className={cn(cls('role'), 'h-11')} aria-invalid={Boolean(errors.role)} aria-describedby={describedBy('role')} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-5 border-t border-line pt-8">
        <legend className="float-left mb-5 w-full font-mono text-[0.68rem] tracking-wider text-muted uppercase">Your organization and project</legend>
        <div className="clear-both grid gap-5 sm:grid-cols-2">
          <Field name="industry" label="Industry" error={errors.industry}>
            <select id="industry" name="industry" defaultValue="" className={cn(cls('industry'), 'h-11')} aria-invalid={Boolean(errors.industry)} aria-describedby={describedBy('industry')}>
              <option value="" disabled>
                Select an industry
              </option>
              {industries.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </Field>
          <Field name="organizationSize" label="Organization size" optional error={errors.organizationSize}>
            <select id="organizationSize" name="organizationSize" defaultValue="" className={cn(cls('organizationSize'), 'h-11')} aria-invalid={Boolean(errors.organizationSize)} aria-describedby={describedBy('organizationSize')}>
              <option value="">Prefer not to say</option>
              {organizationSizes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
        </div>
        <Field name="projectType" label="Project type" error={errors.projectType}>
          <select id="projectType" name="projectType" defaultValue={defaultProjectType ?? ''} className={cn(cls('projectType'), 'h-11')} aria-invalid={Boolean(errors.projectType)} aria-describedby={describedBy('projectType')}>
            <option value="" disabled>
              Select a project type
            </option>
            {projectTypes.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Field>
        <Field name="currentSystems" label="Current business systems" optional hint="For example: accounting package, spreadsheets, a legacy in-house system." error={errors.currentSystems}>
          <textarea id="currentSystems" name="currentSystems" rows={3} maxLength={limits.currentSystems} className={cn(cls('currentSystems'), 'py-3')} aria-invalid={Boolean(errors.currentSystems)} aria-describedby={describedBy('currentSystems', true)} />
        </Field>
        <Field name="goals" label="What does your organization want to achieve?" hint="Describe how you operate today, where current systems fall short and what a better system would change." error={errors.goals}>
          <textarea
            id="goals"
            name="goals"
            rows={6}
            maxLength={limits.goals}
            onInput={(e) => setGoalsLength(e.currentTarget.value.trim().length)}
            className={cn(cls('goals'), 'py-3')}
            aria-invalid={Boolean(errors.goals)}
            aria-describedby={describedBy('goals', true)}
          />
          <p className="mt-1 text-right text-[0.75rem] text-muted tabular-nums" aria-hidden="true">
            {goalsLength < limits.goalsMin ? `${limits.goalsMin - goalsLength} more characters needed` : `${goalsLength} / ${limits.goals}`}
          </p>
        </Field>
        <Field name="preferredTime" label="Preferred meeting date or time" optional hint="For example: “weekday mornings, GMT+6” or a specific date." error={errors.preferredTime}>
          <input id="preferredTime" name="preferredTime" maxLength={limits.preferredTime} className={cn(cls('preferredTime'), 'h-11')} aria-invalid={Boolean(errors.preferredTime)} aria-describedby={describedBy('preferredTime', true)} />
        </Field>
      </fieldset>

      {/* Honeypot: hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="border-t border-line pt-8">
        <div className="flex gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            className="mt-1 h-4 w-4 shrink-0 accent-navy"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy('consent')}
          />
          <label htmlFor="consent" className="text-[0.88rem] leading-relaxed text-ink-soft">
            I agree that DeepSuite may use the details in this form to respond to my enquiry, as described in the{' '}
            <Link href="/privacy" className="text-teal-ink underline underline-offset-4">
              privacy notice
            </Link>
            . We do not add enquiry details to marketing lists.
          </label>
        </div>
        {errors.consent && (
          <p id="consent-error" className="mt-1.5 ml-7 flex items-start gap-1.5 text-[0.82rem] text-[#b3261e]">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {errors.consent}
          </p>
        )}
      </div>

      <div ref={statusRef} tabIndex={-1} className="outline-none" aria-live="polite">
        {status.kind === 'not_configured' && (
          <div className="rounded-lg border border-amber/50 bg-[#fff8ec] p-5 text-[0.9rem] leading-relaxed text-[#6b4510]">
            <p className="font-semibold">Your enquiry has not been sent.</p>
            <p className="mt-1">
              Online submissions are not yet connected on this site, so we could not deliver your message.{' '}
              {contactEmail ? (
                <>
                  Please email us at{' '}
                  <a href={`mailto:${contactEmail}`} className="underline underline-offset-2">
                    {contactEmail}
                  </a>{' '}
                  instead — your details are still in the form if you want to copy them.
                </>
              ) : (
                <>Your details remain in the form. Please try again later.</>
              )}
            </p>
          </div>
        )}
        {status.kind === 'error' && (
          <div className="rounded-lg border border-[#b3261e]/40 bg-[#fdf0ee] p-5 text-[0.9rem] text-[#8c1d18]" role="alert">
            {status.message}
          </div>
        )}
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status.kind === 'submitting'}
          className="inline-flex h-12 shrink-0 items-center gap-2 rounded-md bg-navy px-6 whitespace-nowrap text-[0.95rem] font-medium text-white transition-colors hover:bg-graphite disabled:cursor-wait disabled:opacity-70"
        >
          {status.kind === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> {slow ? 'Delivering your enquiry…' : 'Sending…'}
            </>
          ) : (
            <>
              Request a consultation <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </>
          )}
        </button>
        <p className="text-[0.8rem] text-muted">We reply by email. Submitting this form does not schedule a meeting.</p>
      </div>
    </form>
  )
}
