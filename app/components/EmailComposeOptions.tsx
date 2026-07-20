"use client"

import { useState } from "react"
import { Mail, Copy, CheckCircle, ExternalLink } from "lucide-react"

const WINNIE_EMAIL = "winnie.lanenga@gmail.com"

interface EmailComposeOptionsProps {
  subject: string
  body: string
}

export default function EmailComposeOptions({ subject, body }: EmailComposeOptionsProps) {
  const [copied, setCopied] = useState(false)

  const mailtoHref = `mailto:${WINNIE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    WINNIE_EMAIL,
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

  const handleCopy = async () => {
    const fullText = `To: ${WINNIE_EMAIL}\nSubject: ${subject}\n\n${body}`
    try {
      await navigator.clipboard.writeText(fullText)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      // Clipboard API unavailable (e.g. very old browser) — fall back to a prompt
      window.prompt("Copy your message below, then paste it into an email:", fullText)
    }
  }

  return (
    <div className="space-y-3">
      <a href={mailtoHref} className="btn-gold w-full">
        <Mail className="h-4 w-4" />
        Open My Email App
      </a>
      <a href={gmailHref} target="_blank" rel="noopener noreferrer" className="btn-gold-ghost w-full">
        <ExternalLink className="h-4 w-4" />
        Compose in Gmail
      </a>
      <button onClick={handleCopy} className="btn-gold-ghost w-full">
        {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied!" : "Copy Message Instead"}
      </button>
      <p className="text-center text-xs text-latte">
        Apple Mail &amp; Outlook users: use the first button. Gmail users: use the second. Or copy everything and
        paste it into any email to <span className="text-gold">{WINNIE_EMAIL}</span>.
      </p>
    </div>
  )
}
