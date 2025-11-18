export const VERIFY_EMAIL_TEMPLATE = `
<td bgcolor="#fafafa" align="center" class="esd-stripe" style="background-color:#fafafa">
  <table width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" class="es-content-body" style="background-color:#ffffff">
    <tbody>

      <tr>
        <td align="center" class="esd-structure es-p40t es-p20r es-p20l">

          <table width="100%" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td width="560" valign="top" align="center" class="esd-container-frame">

                  <table width="100%" cellspacing="0" cellpadding="0">

                    <tbody>

                      <!-- Logo -->
                      <tr>
                        <td align="center" class="esd-block-image es-p10t es-p10b">
                          <img src="https://fwaosgn.stripocdn.email/content/guids/CABINET_dd354a98a803b60e2f0411e893c82f56/images/23891556799905703.png" alt="" width="175" style="display:block">
                        </td>
                      </tr>

                      <!-- Heading -->
                      <tr>
                        <td align="center" class="esd-block-text es-p10t es-p10b">
                          <h1 style="color:#333;font-size:22px;margin:0"><strong>VERIFY YOUR EMAIL</strong></h1>
                        </td>
                      </tr>

                      <!-- Greeting -->
                      <tr>
                        <td align="center" class="esd-block-text es-p10b">
                          <p style="font-size:16px;margin:0">Hi, <strong>{{email}}</strong></p>
                        </td>
                      </tr>

                      <!-- Description -->
                      <tr>
                        <td align="center" class="esd-block-text es-p10t es-p10b">
                          <p style="font-size:15px;margin:0">
                            Thank you for registering! Please use the OTP below to verify your email address:
                          </p>
                        </td>
                      </tr>

                      <!-- OTP BOX -->
                      <tr>
                        <td align="center" class="esd-block-button es-p30t es-p30b">
                          <span style="font-size:26px;font-weight:bold;padding:14px 22px; background:#eeeeee; border-radius:10px; display:inline-block;">
                            {{otp}}
                          </span>
                        </td>
                      </tr>

                      <!-- Note -->
                      <tr>
                        <td align="center" class="esd-block-text es-p10t es-p10b">
                          <p style="font-size:14px;margin:0;color:#555">
                            If you did not request this email, you can safely ignore it.
                          </p>
                        </td>
                      </tr>

                    </tbody>

                  </table>

                </td>
              </tr>
            </tbody>
          </table>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td align="center" class="esd-structure es-p20t es-p20b es-p20r es-p20l">
          <table width="100%" cellspacing="0" cellpadding="0">
            <tbody>
              <tr>
                <td align="center" class="esd-block-text">
                  <p style="font-size:14px;color:#666;margin:0">Contact us: irshadsha164@gmail.com</p>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>

    </tbody>
  </table>
</td>
`;
