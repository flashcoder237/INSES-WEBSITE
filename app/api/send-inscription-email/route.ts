import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // Vérifier que la clé API Resend est configurée
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY non configurée')
      return NextResponse.json(
        { error: 'Service d\'envoi d\'email non configuré' },
        { status: 500 }
      )
    }

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

    // Envoi de l'email avec Resend
    const { data, error } = await resend.emails.send({
      from: 'INSES <onboarding@resend.dev>', // Changez ceci après avoir vérifié votre domaine
      to: email,
      subject: emailContent.subject,
      text: emailContent.message,
    })

    if (error) {
      console.error('Erreur Resend:', error)
      return NextResponse.json(
        { error: 'Échec de l\'envoi de l\'email', details: error },
        { status: 500 }
      )
    }

    console.log('Email envoyé avec succès:', data)

    return NextResponse.json({
      success: true,
      message: 'Email envoyé avec succès',
      emailId: data?.id,
    })

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi de l\'email' },
      { status: 500 }
    )
  }
}
