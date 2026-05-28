import nodemailer from "nodemailer";

import { ENV } from "../config/env.js";

type PasswordResetMailParams = {
  email: string;
  resetUrl: string;
};

type PasswordResetMailResult = {
  transport: "smtp" | "preview";
  preview?: string;
};

const previewToString = (value: unknown) => {
  if (typeof value === "string") {
    return value;
  }

  if (Buffer.isBuffer(value)) {
    return value.toString("utf8");
  }

  return JSON.stringify(value, null, 2);
};

class PasswordResetMailService {
  async sendPasswordResetEmail({ email, resetUrl }: PasswordResetMailParams) {
    const hasSmtpConfig = Boolean(ENV.MAIL.HOST && ENV.MAIL.PORT);
    const transport = hasSmtpConfig
      ? nodemailer.createTransport({
          host: ENV.MAIL.HOST,
          port: ENV.MAIL.PORT,
          secure: ENV.MAIL.SECURE || ENV.MAIL.PORT === 465,
          auth:
            ENV.MAIL.USER && ENV.MAIL.PASS
              ? {
                  user: ENV.MAIL.USER,
                  pass: ENV.MAIL.PASS,
                }
              : undefined,
        })
      : nodemailer.createTransport({
          jsonTransport: true,
        });

    const info = await transport.sendMail({
      from: ENV.MAIL.FROM,
      to: email,
      subject: "Réinitialisation de votre mot de passe",
      text: [
        "Bonjour,",
        "",
        "Vous avez demandé la réinitialisation de votre mot de passe.",
        `Utilisez ce lien pour définir un nouveau mot de passe : ${resetUrl}`,
        "",
        "Si vous n'êtes pas à l'origine de cette demande, ignorez simplement ce message.",
      ].join("\n"),
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
          <p>Bonjour,</p>
          <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
          <p>
            <a href="${resetUrl}" style="display: inline-block; padding: 12px 18px; border-radius: 12px; background: #8c3237; color: #ffffff; text-decoration: none; font-weight: 600;">
              Réinitialiser le mot de passe
            </a>
          </p>
          <p>Si le bouton ne fonctionne pas, utilisez ce lien :</p>
          <p><a href="${resetUrl}">${resetUrl}</a></p>
          <p>Si vous n'êtes pas à l'origine de cette demande, ignorez simplement ce message.</p>
        </div>
      `,
    });

    if (hasSmtpConfig) {
      return { transport: "smtp" } satisfies PasswordResetMailResult;
    }

    const previewInfo = info as { message?: unknown };

    return {
      transport: "preview",
      preview: previewToString(previewInfo.message ?? info),
    } satisfies PasswordResetMailResult;
  }
}

export { PasswordResetMailService, type PasswordResetMailResult };
