import nodemailer from "nodemailer";
import type { ConsultationFormData } from "./validations/consultation";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export async function sendConsultationAlert(
    data: ConsultationFormData & { createdAt: Date }
) {
    const formattedDate = new Intl.DateTimeFormat("ko-KR", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "Asia/Seoul",
    }).format(data.createdAt);

    const html = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <style>
        body { font-family: 'Noto Sans KR', sans-serif; background: #f4f4f4; margin: 0; padding: 20px; }
        .container { max-width: 560px; margin: 0 auto; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
        .header { background: #4a5d52; color: #fff; padding: 28px 32px; }
        .header h1 { margin: 0; font-size: 20px; }
        .header p { margin: 4px 0 0; font-size: 13px; opacity: 0.8; }
        .body { padding: 28px 32px; }
        .field { margin-bottom: 18px; }
        .label { font-size: 12px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
        .value { font-size: 16px; color: #111; font-weight: 500; }
        .divider { border: none; border-top: 1px solid #eee; margin: 20px 0; }
        .footer { background: #f9f9f9; padding: 18px 32px; font-size: 12px; color: #aaa; text-align: center; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌿 새 상담 신청이 도착했습니다</h1>
          <p>${formattedDate}</p>
        </div>
        <div class="body">
          <div class="field">
            <div class="label">이름</div>
            <div class="value">${data.name}</div>
          </div>
          <div class="field">
            <div class="label">전화번호</div>
            <div class="value">${data.phone}</div>
          </div>
          ${data.interest
            ? `<div class="field">
              <div class="label">관심 분야</div>
              <div class="value">${data.interest}</div>
            </div>`
            : ""
        }
          ${data.message
            ? `<hr class="divider" />
            <div class="field">
              <div class="label">문의 내용</div>
              <div class="value" style="white-space:pre-line">${data.message}</div>
            </div>`
            : ""
        }
          ${data.utmSource
            ? `<hr class="divider" />
            <div class="field">
              <div class="label">유입 경로</div>
              <div class="value" style="font-size:13px; color:#666">${data.utmSource}${data.utmMedium ? ` / ${data.utmMedium}` : ""}${data.utmCampaign ? ` / ${data.utmCampaign}` : ""}</div>
            </div>`
            : ""
        }
        </div>
        <div class="footer">도테라 웰니스 비즈니스 — 정종범 코치</div>
      </div>
    </body>
    </html>
  `;

    await transporter.sendMail({
        from: `"도테라 웰니스" <${process.env.SMTP_USER}>`,
        to: process.env.ADMIN_NOTIFY_EMAIL,
        subject: `[상담 신청] ${data.name}님이 상담을 신청하셨습니다`,
        html,
    });
}
