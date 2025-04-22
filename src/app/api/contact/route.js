
import { EmailTemplate } from "@/components/emailTemplateResend/email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { serviceUrl, fullName, email, tele, comment, checkView ,type, adresse} = body;
    const data = await resend.emails.send({
      from: `${fullName}<onboarding@dayafandco.com>`,
      to: "dayafandco@gmail.com",
      subject: serviceUrl ? "`Dayaf & Co - Demande de participation à une activité ou d'information sur l'immobilier`" :type?("Le client a contacté via la page de Vendre.") :("Le client a contacté via la page de contact."),
      react: EmailTemplate({
        serviceUrl: serviceUrl,
        fullName: fullName,
        comment: comment,
        email: email,
        Phone: tele,
        checkView:checkView,
        typeVendre:type,
        adresseVendre:adresse
      }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
