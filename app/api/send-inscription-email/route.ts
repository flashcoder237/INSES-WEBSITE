import { NextResponse } from 'next/server'
const SibApiV3Sdk = require('@getbrevo/brevo')

export async function POST(request: Request) {
  try {
    const { email, firstName, lastName, status } = await request.json()

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

    // Configurer Brevo
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi()
    apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY)

    const statusMessages = {
      approved: {
        subject: 'Demande d\'inscription approuvée - INSES',
        message: `Bonjour ${firstName} ${lastName},\n\nNous avons le plaisir de vous informer que votre demande d'inscription à l'INSES a été approuvée.\n\nNous vous contacterons prochainement pour finaliser votre inscription et vous fournir les informations nécessaires pour le début de votre formation.\n\nCordialement,\nL'équipe INSES`
      },
      rejected: {
        subject: 'Demande d\'inscription - INSES',
        message: `Bonjour ${firstName} ${lastName},\n\nNous vous remercions de l'intérêt que vous portez à l'INSES.\n\nMalheureusement, nous ne pouvons pas donner suite à votre demande d'inscription pour le moment.\n\nNous vous encourageons à postuler à nouveau lors de nos prochaines sessions d'admission.\n\nCordialement,\nL'équipe INSES`
      },
      pending: {
        subject: 'Demande d\'inscription reçue - INSES',
        message: `Bonjour ${firstName} ${lastName},\n\nNous avons bien reçu votre demande d'inscription à l'INSES.\n\nVotre dossier est actuellement en cours d'examen. Nous vous contacterons dans les plus brefs délais.\n\nCordialement,\nL'équipe INSES`
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
      <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #B22234; color: white; padding: 20px; text-align: center; }
            .content { padding: 30px 20px; background-color: #f9f9f9; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>INSES</h1>
              <p>Institut Supérieur de l'Espoir</p>
            </div>
            <div class="content">
              <p>${emailContent.message.replace(/\n/g, '<br>')}</p>
            </div>
            <div class="footer">
              <p>Cet email a été envoyé automatiquement, merci de ne pas y répondre.</p>
              <p>INSES - Douala, Cameroun</p>
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
