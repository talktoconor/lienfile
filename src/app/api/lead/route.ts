import { NextResponse } from "next/server"

interface LeadRequest {
  email: string
  state: string
  role: string
  lastDayOfWork: string
}

export async function POST(request: Request) {
  try {
    const body: LeadRequest = await request.json()

    const { email, state, role, lastDayOfWork } = body

    // Validate required fields
    if (!email || !state || !role || !lastDayOfWork) {
      return NextResponse.json(
        { error: "Missing required fields: email, state, role, lastDayOfWork" },
        { status: 400 }
      )
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      )
    }

    console.log("[Lead Capture]", {
      email,
      state,
      role,
      lastDayOfWork,
      capturedAt: new Date().toISOString(),
    })

    // TODO: Save lead to database
    // await db.leads.create({ email, state, role, lastDayOfWork })

    // TODO: Send welcome email + schedule deadline reminders via Resend
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: "LienFile <reminders@lienfile.io>",
    //   to: email,
    //   subject: `Your ${state} mechanic's lien deadline is approaching`,
    //   html: `<p>We'll remind you before your lien deadline expires...</p>`,
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Lead Capture Error]", error)
    return NextResponse.json(
      { error: "Failed to capture lead" },
      { status: 500 }
    )
  }
}
