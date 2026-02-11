import tranEmailApi from "./brvo.js";

export default async function sendEmailOTP(email, otp) {
  try {
    const sender = {
      email: process.env.EMAIL_USER,
      name: "Blinkit",
    };

    const htmlContent = `
  <div style="
    font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',
    Roboto,Helvetica,Arial,sans-serif;
    background:#f4fdf6;
    padding:32px 16px;
  ">

    <div style="
      max-width:560px;
      margin:0 auto;
      background:#ffffff;
      padding:32px;
      border-radius:14px;
      box-shadow:0 10px 30px rgba(0,0,0,0.08);
    ">

      <!-- Logo / Brand -->
      <h1 style="
        margin:0 0 8px;
        color:#0c831f;
        font-size:26px;
        font-weight:700;
      ">
        Blinkit
      </h1>

      <p style="
        margin:0 0 24px;
        color:#444;
        font-size:15px;
      ">
        India’s Last Minute App 🛒
      </p>

      <!-- Title -->
      <h2 style="
        margin:0 0 12px;
        font-weight:600;
        color:#111;
      ">
        Verify your email
      </h2>

      <p style="
        margin:0 0 20px;
        color:#444;
        font-size:15px;
      ">
        Use the verification code below to sign in to your Blinkit account.
      </p>

      <!-- OTP -->
      <div style="text-align:center; margin:30px 0;">
        <span style="
          display:inline-block;
          padding:14px 30px;
          font-size:26px;
          font-weight:700;
          letter-spacing:6px;
          color:#0c831f;
          background:#e9f7ee;
          border-radius:10px;
        ">
          ${otp}
        </span>
      </div>

      <p style="
        margin:0 0 10px;
        color:#333;
        font-size:14px;
      ">
        ⏱ This code will expire in <strong>10 minutes</strong>.
      </p>

      <p style="
        margin:0;
        color:#666;
        font-size:13px;
      ">
        If you didn’t request this code, please ignore this email or
        contact Blinkit support.
      </p>

      <hr style="
        border:none;
        border-top:1px solid #eaeaea;
        margin:28px 0;
      " />

      <p style="
        margin:0;
        font-size:12px;
        color:#999;
      ">
        © Blinkit • Fast • Fresh • Reliable
      </p>

    </div>
  </div>
`;

    await tranEmailApi.sendTransacEmail({
      sender,
      to: [{ email }],
      subject: "Your Blinkit verification code",
      htmlContent,
    });

    console.log(`Blinkit OTP sent to ${email}`);
  } catch (err) {
    console.error("Email OTP error:", err);
    throw new Error("OTP email failed");
  }
}
