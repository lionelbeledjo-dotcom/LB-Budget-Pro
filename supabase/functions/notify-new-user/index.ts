import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "lbcloudadmin@gmail.com";

interface WebhookPayload {
  type: "INSERT";
  table: string;
  record: {
    id: string;
    email?: string;
    raw_user_meta_data?: {
      full_name?: string;
      avatar_url?: string;
    };
    created_at: string;
  };
}

serve(async (req) => {
  try {
    const payload: WebhookPayload = await req.json();
    const user = payload.record;
    const email = user.email || "inconnu";
    const name = user.raw_user_meta_data?.full_name || email.split("@")[0];
    const createdAt = new Date(user.created_at).toLocaleString("fr-FR", {
      dateStyle: "long",
      timeStyle: "short",
    });

    const htmlContent = `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f8fafc; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0A2E5C 0%, #1a4a8a 100%); padding: 32px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">LB Budget Pro</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Nouvelle inscription</p>
        </div>
        <div style="padding: 32px;">
          <div style="background: white; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0;">
            <h2 style="color: #0A2E5C; margin: 0 0 16px; font-size: 18px;">Un nouveau client s'est inscrit !</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Nom</td>
                <td style="padding: 8px 0; font-weight: 600; font-size: 14px; text-align: right;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email</td>
                <td style="padding: 8px 0; font-weight: 600; font-size: 14px; text-align: right;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Date d'inscription</td>
                <td style="padding: 8px 0; font-weight: 600; font-size: 14px; text-align: right;">${createdAt}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">ID utilisateur</td>
                <td style="padding: 8px 0; font-size: 12px; color: #94a3b8; text-align: right; font-family: monospace;">${user.id}</td>
              </tr>
            </table>
          </div>
          <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 24px;">
            Connectez-vous au panel admin pour gerer ce compte.
          </p>
        </div>
      </div>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "LB Budget Pro <notifications@lbbudgetpro.com>",
        to: [ADMIN_EMAIL],
        subject: `Nouveau client inscrit : ${name} (${email})`,
        html: htmlContent,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend error:", data);
      return new Response(JSON.stringify({ error: data }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
});
