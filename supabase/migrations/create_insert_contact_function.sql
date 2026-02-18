-- Créer une fonction pour insérer des contacts (bypass RLS)
CREATE OR REPLACE FUNCTION public.insert_contact_message(
  p_name VARCHAR(255),
  p_email VARCHAR(255),
  p_phone VARCHAR(50),
  p_subject VARCHAR(255),
  p_message TEXT
)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER -- Cette fonction s'exécute avec les privilèges du créateur (bypass RLS)
SET search_path = public
AS $$
DECLARE
  v_result json;
BEGIN
  -- Insérer le message de contact
  INSERT INTO public.contacts (name, email, phone, subject, message, is_read, created_at)
  VALUES (p_name, p_email, p_phone, p_subject, p_message, false, NOW())
  RETURNING json_build_object(
    'id', id,
    'name', name,
    'email', email,
    'phone', phone,
    'subject', subject,
    'message', message,
    'is_read', is_read,
    'created_at', created_at
  ) INTO v_result;

  RETURN v_result;
EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Erreur lors de l''insertion: %', SQLERRM;
END;
$$;

-- Donner les permissions d'exécution à tous
GRANT EXECUTE ON FUNCTION public.insert_contact_message(VARCHAR, VARCHAR, VARCHAR, VARCHAR, TEXT) TO anon;
GRANT EXECUTE ON FUNCTION public.insert_contact_message(VARCHAR, VARCHAR, VARCHAR, VARCHAR, TEXT) TO authenticated;

-- Commentaire
COMMENT ON FUNCTION public.insert_contact_message IS 'Fonction pour insérer un message de contact (bypass RLS)';
