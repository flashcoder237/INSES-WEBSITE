import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Tous les champs requis doivent être remplis' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide' },
        { status: 400 }
      );
    }

    // Create a Supabase client with anon key (no auth required)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Insert message using the PostgreSQL function (bypasses RLS)
    const { data, error } = await supabase.rpc('insert_contact_message', {
      p_name: name,
      p_email: email,
      p_phone: phone || null,
      p_subject: subject,
      p_message: message,
    });

    if (error) {
      console.error('Error saving contact message:', error);
      console.error('Full error details:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        {
          error: 'Erreur lors de l\'enregistrement du message',
          details: error.message
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message envoyé avec succès',
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in contact API:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
