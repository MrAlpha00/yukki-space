import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, turnstileToken } = await req.json();

    // Client-side field completeness checks
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Get client IP address
    const ip = req.headers.get("x-forwarded-for") || "Unknown";

    // Verify Cloudflare Turnstile token if secret key is present
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!turnstileToken) {
        return NextResponse.json(
          { error: "Turnstile challenge token is missing." },
          { status: 400 }
        );
      }

      const turnstileRes = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `secret=${encodeURIComponent(
            process.env.TURNSTILE_SECRET_KEY
          )}&response=${encodeURIComponent(turnstileToken)}&remoteip=${encodeURIComponent(
            ip
          )}`,
        }
      );

      const turnstileData = await turnstileRes.json();
      if (!turnstileData.success) {
        return NextResponse.json(
          { error: "Cloudflare Turnstile token verification failed." },
          { status: 400 }
        );
      }
    } else {
      console.warn("TURNSTILE_SECRET_KEY is not defined. Skipping token verification.");
    }

    // Resend Email Dispatch
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not defined. Email transmission simulated.");
      return NextResponse.json({
        success: true,
        message: "Message received (Simulated). Please define RESEND_API_KEY.",
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const destinationEmail = process.env.CONTACT_EMAIL || "delivered@resend.dev";

    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: destinationEmail,
      subject: `Portfolio: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #7042f830; border-radius: 10px; background-color: #030014; color: #fff;">
          <h2 style="color: #b49bff; border-bottom: 1px solid #7042f850; padding-bottom: 10px;">New Contact Form Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #00f2fe;">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; border-left: 3px solid #7042f8; bg-color: #0c0926;">
            <strong>Message:</strong><br/>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          <div style="margin-top: 30px; font-size: 12px; color: #7f7f90; border-top: 1px solid #7042f830; padding-top: 10px;">
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <p><strong>Sender IP:</strong> ${ip}</p>
          </div>
        </div>
      `,
    });

    if (emailResponse.error) {
      return NextResponse.json(
        { error: emailResponse.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: emailResponse.data });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
