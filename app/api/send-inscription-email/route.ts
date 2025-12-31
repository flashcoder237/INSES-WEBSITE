import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/client'
const SibApiV3Sdk = require('@getbrevo/brevo')

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName, status, formation } = await request.json()

    console.log('📧 Envoi email avec:', { email, firstName, lastName, status, formation })

    // Validation des données
    if (!email || !firstName || !lastName || !status) {
      return NextResponse.json(
        { error: 'Données manquantes' },
        { status: 400 }
      )
    }

    // Vérifier que la clé API Brevo est configurée
    if (!process.env.BREVO_API_KEY) {
      console.error('BREVO_API_KEY non configurée')
      return NextResponse.json(
        { error: 'Service d\'envoi d\'email non configuré' },
        { status: 500 }
      )
    }

    // Charger les informations de contact depuis la base de données
    const supabase = createClient()
    const { data: siteInfo } = await supabase
      .from('site_info')
      .select('phone, email, location, whatsapp')
      .single()

    const contactPhone = siteInfo?.phone || '+237 674 93 66 04'
    const contactEmail = siteInfo?.email || 'contact@univ-inses.com'
    const contactLocation = siteInfo?.location || 'Douala Bonabéri, Cameroun'

    // Configurer Brevo
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
    apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY)

    const formationText = formation ? ` en ${formation}` : '';

    const statusMessages = {
      approved: {
        subject: `Demande d'inscription approuvée - INSES${formationText}`,
        message: `Bonjour ${firstName} ${lastName},\n\nNous avons le plaisir de vous informer que votre demande d'inscription${formationText} à l'INSES a été approuvée.\n\nNous vous contacterons prochainement pour finaliser votre inscription et vous fournir les informations nécessaires pour le début de votre formation.\n\nCordialement,\nL'équipe INSES`
      },
      rejected: {
        subject: `Demande d'inscription - INSES${formationText}`,
        message: `Bonjour ${firstName} ${lastName},\n\nNous vous remercions de l'intérêt que vous portez à l'INSES et à la formation${formationText}.\n\nMalheureusement, nous ne pouvons pas donner suite à votre demande d'inscription pour le moment.\n\nNous vous encourageons à postuler à nouveau lors de nos prochaines sessions d'admission.\n\nCordialement,\nL'équipe INSES`
      },
      pending: {
        subject: `Demande d'inscription reçue - INSES${formationText}`,
        message: `Bonjour ${firstName} ${lastName},\n\nNous avons bien reçu votre demande d'inscription${formationText} à l'INSES.\n\nVotre dossier est actuellement en cours d'examen. Nous vous contacterons dans les plus brefs délais.\n\nCordialement,\nL'équipe INSES`
      }
    }

    const emailContent = statusMessages[status as keyof typeof statusMessages]

    // Préparer l'email pour Brevo
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

    sendSmtpEmail.sender = {
      name: "INSES",
      email: process.env.BREVO_SENDER_EMAIL || "noreply@univ-inses.com"
    }

    sendSmtpEmail.to = [{
      email: email,
      name: `${firstName} ${lastName}`
    }]

    sendSmtpEmail.subject = emailContent.subject
    sendSmtpEmail.htmlContent = `
      <!DOCTYPE html>
      <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${emailContent.subject}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
              line-height: 1.6;
              color: #333333;
              background-color: #f4f4f4;
            }
            .email-wrapper {
              width: 100%;
              background-color: #f4f4f4;
              padding: 20px 0;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            .header {
              background: linear-gradient(135deg, #B22234 0%, #800020 100%);
              padding: 40px 30px;
              text-align: center;
            }
            .logo {
              width: 80px;
              height: 80px;
              margin: 0 auto 20px;
              background-color: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 32px;
              font-weight: bold;
              color: #B22234;
            }
            .header h1 {
              color: white;
              font-size: 28px;
              font-weight: 700;
              margin-bottom: 8px;
              letter-spacing: -0.5px;
            }
            .header p {
              color: rgba(255, 255, 255, 0.9);
              font-size: 16px;
              font-weight: 300;
            }
            .content {
              padding: 40px 30px;
              background-color: white;
            }
            .greeting {
              font-size: 20px;
              font-weight: 600;
              color: #1a1a1a;
              margin-bottom: 24px;
            }
            .message {
              font-size: 16px;
              line-height: 1.8;
              color: #4a4a4a;
              margin-bottom: 20px;
            }
            .status-badge {
              display: inline-block;
              padding: 10px 20px;
              border-radius: 6px;
              font-weight: 600;
              font-size: 14px;
              margin: 20px 0;
              ${status === 'approved' ? 'background-color: #10b981; color: white;' : ''}
              ${status === 'rejected' ? 'background-color: #ef4444; color: white;' : ''}
              ${status === 'pending' ? 'background-color: #f59e0b; color: white;' : ''}
            }
            .cta-button {
              display: inline-block;
              padding: 14px 32px;
              background-color: #B22234;
              color: white;
              text-decoration: none;
              border-radius: 6px;
              font-weight: 600;
              margin-top: 24px;
              transition: background-color 0.3s;
            }
            .cta-button:hover {
              background-color: #800020;
            }
            .divider {
              height: 1px;
              background: linear-gradient(to right, transparent, #e5e5e5, transparent);
              margin: 30px 0;
            }
            .info-box {
              background-color: #f9fafb;
              border-left: 4px solid #B22234;
              padding: 16px;
              margin: 20px 0;
              border-radius: 4px;
            }
            .info-box p {
              margin: 0;
              font-size: 14px;
              color: #6b7280;
            }
            .footer {
              background-color: #1a1a1a;
              padding: 30px;
              text-align: center;
            }
            .footer-content {
              margin-bottom: 20px;
            }
            .footer-title {
              color: white;
              font-size: 18px;
              font-weight: 600;
              margin-bottom: 12px;
            }
            .footer-info {
              color: #9ca3af;
              font-size: 14px;
              margin: 8px 0;
            }
            .footer-info a {
              color: #B22234;
              text-decoration: none;
            }
            .footer-info a:hover {
              text-decoration: underline;
            }
            .footer-divider {
              height: 1px;
              background-color: #374151;
              margin: 20px 0;
            }
            .footer-legal {
              color: #6b7280;
              font-size: 12px;
              line-height: 1.5;
            }
            .social-links {
              margin: 16px 0;
            }
            .social-links a {
              display: inline-block;
              width: 36px;
              height: 36px;
              background-color: #374151;
              color: white;
              border-radius: 50%;
              margin: 0 6px;
              line-height: 36px;
              text-decoration: none;
              transition: background-color 0.3s;
            }
            .social-links a:hover {
              background-color: #B22234;
            }
            @media only screen and (max-width: 600px) {
              .email-container { border-radius: 0; }
              .header { padding: 30px 20px; }
              .content { padding: 30px 20px; }
              .header h1 { font-size: 24px; }
              .greeting { font-size: 18px; }
            }
          </style>
        </head>
        <body>
          <div class="email-wrapper">
            <div class="email-container">
              <!-- Header avec logo -->
              <div class="header">
                <div class="logo">IN</div>
                <h1>INSES</h1>
                <p>Institut Supérieur de l'Espoir</p>
              </div>

              <!-- Contenu principal -->
              <div class="content">
                <div class="greeting">Bonjour ${firstName} ${lastName},</div>

                <div class="status-badge">
                  ${status === 'approved' ? 'DEMANDE APPROUVÉE' : ''}
                  ${status === 'rejected' ? 'DEMANDE NON RETENUE' : ''}
                  ${status === 'pending' ? 'DEMANDE EN COURS D\'EXAMEN' : ''}
                </div>

                ${formation ? `
                  <div class="info-box" style="margin: 20px 0; background-color: #f0f9ff; border-left-color: #0284c7;">
                    <p style="margin: 0;"><strong style="color: #0284c7;">FORMATION CHOISIE</strong></p>
                    <p style="margin: 8px 0 0 0; font-size: 16px; font-weight: 600; color: #1e40af;">${formation}</p>
                  </div>
                ` : ''}

                <div class="message">
                  ${emailContent.message.split('\n\n')[1] || emailContent.message}
                </div>

                ${status === 'approved' ? `
                  <div class="info-box">
                    <p><strong>Prochaines étapes :</strong></p>
                    <p>• Un conseiller pédagogique vous contactera sous 48h</p>
                    <p>• Préparez les documents requis pour votre inscription</p>
                    <p>• Consultez les modalités de paiement sur notre site</p>
                  </div>
                  <a href="https://univ-inses.com/inscription" class="cta-button">
                    Accéder à mon espace
                  </a>
                ` : ''}

                ${status === 'pending' ? `
                  <div class="info-box">
                    <p><strong>Que se passe-t-il maintenant ?</strong></p>
                    <p>Votre dossier est en cours d'examen par notre équipe pédagogique. Nous étudions attentivement chaque candidature pour garantir la meilleure adéquation avec nos programmes.</p>
                  </div>
                ` : ''}

                <div class="divider"></div>

                <p class="message">
                  <strong>Pour toute question, n'hésitez pas à nous contacter :</strong><br><br>
                  <strong>Téléphone :</strong> ${contactPhone}<br>
                  <strong>Email :</strong> <a href="mailto:${contactEmail}" style="color: #B22234; text-decoration: none;">${contactEmail}</a>
                </p>
              </div>

              <!-- Footer -->
              <div class="footer">
                <div class="footer-content">
                  <div class="footer-title">INSES</div>
                  <p class="footer-info">Institut Supérieur de l'Espoir</p>
                  <p class="footer-info">${contactLocation}</p>
                  <p class="footer-info">
                    <a href="https://univ-inses.com">www.univ-inses.com</a>
                  </p>
                  <p class="footer-info">
                    ${contactPhone} | ${contactEmail}
                  </p>

                  <div class="social-links">
                    <a href="#" title="Facebook">f</a>
                    <a href="#" title="Instagram">i</a>
                    <a href="#" title="LinkedIn">in</a>
                  </div>
                </div>

                <div class="footer-divider"></div>

                <div class="footer-legal">
                  Cet email a été envoyé automatiquement. Merci de ne pas y répondre directement.<br>
                  © ${new Date().getFullYear()} INSES - Tous droits réservés.
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>
    `
    sendSmtpEmail.textContent = emailContent.message

    // Envoi de l'email avec Brevo
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail)

    console.log('Email envoyé avec succès via Brevo:', data)

    return NextResponse.json({
      success: true,
      message: 'Email envoyé avec succès',
      messageId: data.messageId,
    })

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    )
  }
}
