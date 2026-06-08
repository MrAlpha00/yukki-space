import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Form received:", body);
    const { name, email, subject, message, turnstileToken } = body;

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
    const destinationEmail = process.env.CONTACT_EMAIL || "yukthaaryukthaar@gmail.com";

    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: destinationEmail,
      subject: "🚀 New Contact Form Submission | Yukki Portfolio",
      replyTo: email,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid rgba(112, 66, 248, 0.3); border-radius: 16px; background-color: #030014; color: #f3f4f6; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);">
          <!-- Header Banner -->
          <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid rgba(112, 66, 248, 0.2);">
            <h2 style="font-size: 22px; font-weight: 700; margin: 0; color: #b49bff;">
              🚀 New Transmission Received
            </h2>
            <p style="font-size: 11px; color: #9ca3af; font-family: monospace; text-transform: uppercase; letter-spacing: 2px; margin: 5px 0 0 0;">
              Yukki Portfolio Contact Form
            </p>
          </div>

          <!-- Details Table -->
          <div style="background-color: rgba(112, 66, 248, 0.05); border: 1px solid rgba(112, 66, 248, 0.15); border-radius: 12px; padding: 20px; margin-bottom: 25px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 6px 0; font-size: 14px; color: #9ca3af; width: 30%;"><strong>Sender Name:</strong></td>
                <td style="padding: 6px 0; font-size: 14px; color: #ffffff;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 14px; color: #9ca3af;"><strong>Sender Email:</strong></td>
                <td style="padding: 6px 0; font-size: 14px; color: #00f2fe;"><a href="mailto:${email}" style="color: #00f2fe; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 14px; color: #9ca3af;"><strong>Subject:</strong></td>
                <td style="padding: 6px 0; font-size: 14px; color: #ffffff;">${subject}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; font-size: 14px; color: #9ca3af;"><strong>Time:</strong></td>
                <td style="padding: 6px 0; font-size: 12px; color: #9ca3af; font-family: monospace;">${new Date().toISOString()}</td>
              </tr>
            </table>
          </div>

          <!-- Message Body -->
          <div style="margin-bottom: 30px;">
            <h3 style="font-size: 15px; color: #b49bff; margin-top: 0; margin-bottom: 10px; border-left: 3px solid #7042f8; padding-left: 10px;">
              Message Content
            </h3>
            <div style="background-color: rgba(3, 0, 20, 0.8); border: 1px solid rgba(112, 66, 248, 0.2); border-radius: 8px; padding: 20px; font-size: 15px; line-height: 1.6; color: #e5e7eb; white-space: pre-wrap;">${message}</div>
          </div>

          <!-- Footer Info -->
          <div style="font-size: 11px; color: #6b7280; text-align: center; border-top: 1px solid rgba(112, 66, 248, 0.2); padding-top: 20px;">
            <p style="margin: 0 0 5px 0;">This email was sent from your portfolio contact form.</p>
            <p style="margin: 0;"><strong>Sender IP:</strong> ${ip} | Secure Verification Active</p>
          </div>
        </div>
      `,
    });

    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      return NextResponse.json(
        { error: emailResponse.error.message },
        { status: 500 }
      );
    }

    console.log("Email sent:", emailResponse);

    return NextResponse.json({ success: true, data: emailResponse.data });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
