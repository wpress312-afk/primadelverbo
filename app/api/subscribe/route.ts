import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Email non valida." }, { status: 400 });
  }

  try {
    // Salva il contatto nell'audience Resend (se l'ID è configurato)
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      });
    }

    // Email di benvenuto all'iscritto
    await resend.emails.send({
      from: "Prima del Verbo <noreply@primadelverbo.it>",
      to: email,
      subject: "Sei nella soglia.",
      html: `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#0c0c0a;font-family:'Georgia',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0c0c0a;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="padding-bottom:32px;border-bottom:1px solid #28261f;">
          <p style="margin:0;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#94885c;">
            Prima del Verbo
          </p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:40px 0 32px;">
          <p style="margin:0 0 24px;font-size:22px;font-weight:300;color:#c7ba8c;line-height:1.4;">
            Sei nella soglia.
          </p>
          <p style="margin:0 0 20px;font-size:17px;color:#a09881;line-height:1.8;">
            Grazie per esserti iscritto. Riceverai i nuovi articoli quando escono —
            non più spesso, non meno di quanto valga la pena.
          </p>
          <p style="margin:0 0 20px;font-size:17px;color:#a09881;line-height:1.8;">
            Nel frattempo, se non hai ancora letto il primo articolo della serie
            <em>Dalla separazione all'Uno</em>, è da lì che si comincia.
          </p>
          <p style="margin:32px 0 0;">
            <a href="https://primadelverbo.it/blog/non-sei-i-tuoi-pensieri"
               style="display:inline-block;padding:10px 24px;border:1px solid #94885c;color:#c7ba8c;text-decoration:none;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;">
              Leggi il primo articolo
            </a>
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding-top:32px;border-top:1px solid #28261f;">
          <p style="margin:0;font-size:12px;color:#605a48;line-height:1.7;">
            Hai ricevuto questa email perché ti sei iscritto su primadelverbo.it.<br>
            <a href="https://primadelverbo.it" style="color:#605a48;">primadelverbo.it</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Errore durante l'iscrizione." }, { status: 500 });
  }
}
