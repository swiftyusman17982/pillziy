import nodemailer from "nodemailer";
import type { InsertDemoRequest } from "@shared/schema";

// Fail fast if env is wrong
if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        throw new Error("SMTP_USER or SMTP_PASS missing in .env");
}

const port = Number(process.env.SMTP_PORT || 587);

const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port,
        secure: port === 465, // ✅ correct handling
        auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
        },
});

// Verify SMTP connection at startup
transporter.verify((error) => {
        if (error) {
                console.error("❌ SMTP verification failed:", error);
        } else {
                console.log("✅ SMTP server is ready to send emails");
        }
});

function obfuscateEmail(email: string | undefined): string {
        if (!email) return "undefined";
        const [name, domain] = email.split("@");
        if (!domain) return email;
        return `${name[0]}***@${domain}`;
}

export async function sendDemoRequestEmail(data: InsertDemoRequest) {
        const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_FROM;

        if (!adminEmail) {
                throw new Error("ADMIN_EMAIL or SMTP_FROM must be configured in .env");
        }

        console.log("📧 Sending demo request email to:", adminEmail);

        const info = await transporter.sendMail({
                from: `"${data.fullName} via PILLziy" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
                replyTo: data.workEmail,
                to: adminEmail,
                subject: `Request for a PILLziy demo from ${data.fullName}`,
                text: `
Request for a PILLziy demo
------------------------
Organization Name: ${data.orgName}
Full Name: ${data.fullName}
Work Email: ${data.workEmail}
Role: ${data.role}
Organization Type: ${data.orgType}
Phone: ${data.phone}
    `,
                html: `
<h2>Request for a PILLziy demo</h2>
<p><strong>Organization Name:</strong> ${data.orgName}</p>
<p><strong>Full Name:</strong> ${data.fullName}</p>
<p><strong>Work Email:</strong> ${data.workEmail}</p>
<p><strong>Role:</strong> ${data.role}</p>
<p><strong>Organization Type:</strong> ${data.orgType}</p>
<p><strong>Phone:</strong> ${data.phone}</p>
    `,
        });

        console.log("✅ Email sent successfully:", info.messageId);
        return info;
}

export async function sendEarlyAccessEmail(email: string) {
        const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_FROM;

        if (!adminEmail) {
                throw new Error("ADMIN_EMAIL or SMTP_FROM must be configured in .env");
        }

        console.log(`📧 Attempting to send early access email for ${email} to admin: ${obfuscateEmail(adminEmail)}`);

        const info = await transporter.sendMail({
                from: `"Early Access Waitlist" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
                replyTo: email,
                to: adminEmail,
                subject: `Join PILLziy Early Access: ${email}`,
                text: `New user has joined the early access waitlist: ${email}`,
                html: `
<h2>Join PILLziy Early Access</h2>
<p><strong>Email:</strong> ${email}</p>
    `,
        });

        console.log("✅ Early Access email sent successfully. Message ID:", info.messageId, "Response:", info.response);
        return info;
}
