/**
 * Tests simplifiés et réalistes pour le formulaire d'inscription
 *
 * Ces tests vérifient les fonctionnalités de base du formulaire
 * de manière pragmatique et maintenable.
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import InscriptionPage from '@/app/inscription/page'

// Mock des dépendances
vi.mock('@/components/providers/I18nProvider', () => ({
  useI18n: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'inscription.firstName': 'Prénom',
        'inscription.lastName': 'Nom',
        'inscription.email': 'Email',
        'inscription.phone': 'Téléphone',
        'inscription.dateOfBirth': 'Date de naissance',
        'inscription.photo': 'Photo',
        'inscription.gender': 'Genre',
        'inscription.city': 'Ville',
        'inscription.fullAddress': 'Adresse complète',
        'inscription.male': 'Masculin',
        'inscription.female': 'Féminin',
        'inscription.selectLevel': 'Sélectionnez',
        'inscription.chooseFormation': 'Formation souhaitée',
        'inscription.currentLevel': 'Niveau actuel',
        'inscription.selectFormation': 'Sélectionnez une formation',
        'inscription.bac': 'Baccalauréat',
        'inscription.submitButton': 'Envoyer la demande',
        'inscription.submitting': 'Envoi en cours...',
        'inscription.needHelp': 'Besoin d\'aide ?',
      }
      return translations[key] || key
    },
    locale: 'fr'
  })
}))

vi.mock('@/hooks/useFormations', () => ({
  useFormations: () => [
    { id: 1, slug: 'informatique', title: 'Informatique' },
    { id: 2, slug: 'gestion', title: 'Gestion' }
  ]
}))

vi.mock('@/hooks/useSiteInfo', () => ({
  useSiteInfo: () => ({
    phone: '+237 674 93 66 04',
    email: 'contact@univ-inses.com',
    location: 'Douala-Bonabéri, Cameroun'
  })
}))

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    from: () => ({
      insert: vi.fn().mockResolvedValue({ error: null })
    })
  })
}))

// Mock jsPDF pour éviter les erreurs
vi.mock('jspdf', () => ({
  jsPDF: vi.fn().mockImplementation(() => ({
    setFillColor: vi.fn(),
    rect: vi.fn(),
    setTextColor: vi.fn(),
    setFontSize: vi.fn(),
    setFont: vi.fn(),
    text: vi.fn(),
    addImage: vi.fn(),
    setDrawColor: vi.fn(),
    setLineWidth: vi.fn(),
    line: vi.fn(),
    roundedRect: vi.fn(),
    splitTextToSize: vi.fn(() => ['line 1']),
    addPage: vi.fn(),
    getNumberOfPages: vi.fn(() => 1),
    setPage: vi.fn(),
    save: vi.fn()
  }))
}))

describe('Formulaire d\'inscription - Tests simplifiés', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Affichage et navigation de base', () => {
    it('devrait afficher le formulaire avec l\'étape 1', () => {
      render(<InscriptionPage />)

      // Vérifier que l'étape 1 est affichée
      expect(screen.getByText(/Étape 1 sur 4/i)).toBeInTheDocument()
    })

    it('devrait afficher les champs de l\'étape 1', () => {
      render(<InscriptionPage />)

      // Vérifier la présence des champs principaux
      expect(screen.getByLabelText(/Prénom/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/^Nom/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Téléphone/i)).toBeInTheDocument()
    })

    it('devrait afficher le bouton "Suivant" à l\'étape 1', () => {
      render(<InscriptionPage />)

      expect(screen.getByRole('button', { name: /Suivant/i })).toBeInTheDocument()
    })

    it('ne devrait pas afficher le bouton "Précédent" à l\'étape 1', () => {
      render(<InscriptionPage />)

      expect(screen.queryByRole('button', { name: /Précédent/i })).not.toBeInTheDocument()
    })
  })

  describe('Validation des champs', () => {
    it('devrait afficher des erreurs si les champs obligatoires sont vides', async () => {
      const user = userEvent.setup()
      render(<InscriptionPage />)

      // Cliquer sur Suivant sans remplir les champs
      const suivantBtn = screen.getByRole('button', { name: /Suivant/i })
      await user.click(suivantBtn)

      // Vérifier qu'un message d'erreur apparaît
      expect(screen.getByText(/Veuillez remplir tous les champs obligatoires/i)).toBeInTheDocument()
    })

    it('devrait accepter une adresse email valide', async () => {
      const user = userEvent.setup()
      render(<InscriptionPage />)

      const emailInput = screen.getByLabelText(/Email/i)
      await user.type(emailInput, 'test@example.com')

      expect(emailInput).toHaveValue('test@example.com')
    })

    it('devrait rejeter une adresse email invalide', async () => {
      const user = userEvent.setup()
      render(<InscriptionPage />)

      const emailInput = screen.getByLabelText(/Email/i)
      await user.type(emailInput, 'email-invalide')

      const suivantBtn = screen.getByRole('button', { name: /Suivant/i })
      await user.click(suivantBtn)

      // Vérifier qu'une erreur de format email est affichée
      expect(screen.getByText(/format invalide/i)).toBeInTheDocument()
    })
  })

  describe('Saisie de données', () => {
    it('devrait permettre de saisir le prénom et le nom', async () => {
      const user = userEvent.setup()
      render(<InscriptionPage />)

      const firstNameInput = screen.getByLabelText(/Prénom/i)
      const lastNameInput = screen.getByLabelText(/^Nom/i)

      await user.type(firstNameInput, 'Jean')
      await user.type(lastNameInput, 'Dupont')

      expect(firstNameInput).toHaveValue('Jean')
      expect(lastNameInput).toHaveValue('Dupont')
    })

    it('devrait permettre de sélectionner le genre', async () => {
      const user = userEvent.setup()
      render(<InscriptionPage />)

      const genderSelect = screen.getByLabelText(/Genre/i)
      await user.selectOptions(genderSelect, 'male')

      expect(genderSelect).toHaveValue('male')
    })

    it('devrait permettre d\'entrer une date de naissance', async () => {
      const user = userEvent.setup()
      render(<InscriptionPage />)

      const dateInput = screen.getByLabelText(/Date de naissance/i)
      await user.type(dateInput, '2000-01-01')

      expect(dateInput).toHaveValue('2000-01-01')
    })
  })

  describe('Barre de progression', () => {
    it('devrait afficher un pourcentage', () => {
      render(<InscriptionPage />)

      // Chercher le texte qui contient %
      expect(screen.getByText(/%/)).toBeInTheDocument()
    })

    it('devrait afficher "Étape 1 sur 4"', () => {
      render(<InscriptionPage />)

      expect(screen.getByText(/Étape 1 sur 4/i)).toBeInTheDocument()
    })
  })

  describe('Événements clavier', () => {
    it('ne devrait pas soumettre le formulaire avec Entrée dans un input text', async () => {
      const user = userEvent.setup()
      render(<InscriptionPage />)

      const firstNameInput = screen.getByLabelText(/Prénom/i)
      await user.type(firstNameInput, 'Jean')
      await user.keyboard('{Enter}')

      // Le formulaire devrait toujours être à l'étape 1
      expect(screen.getByText(/Étape 1 sur 4/i)).toBeInTheDocument()
    })
  })

  describe('Boutons d\'aide', () => {
    it('devrait afficher un lien "Besoin d\'aide ?"', () => {
      render(<InscriptionPage />)

      const helpLink = screen.getByRole('link', { name: /Besoin d'aide/i })
      expect(helpLink).toBeInTheDocument()
      expect(helpLink).toHaveAttribute('href', '/contact')
    })
  })

  describe('Upload de fichier', () => {
    it('devrait permettre de sélectionner une photo', async () => {
      const user = userEvent.setup()
      render(<InscriptionPage />)

      const fileInput = screen.getByLabelText(/Photo/i)
      const file = new File(['photo'], 'photo.jpg', { type: 'image/jpeg' })

      await user.upload(fileInput, file)

      // Vérifier que le fichier a été sélectionné
      expect(fileInput).toBeTruthy()
      const inputElement = fileInput as HTMLInputElement
      expect(inputElement.files).toBeTruthy()
      expect(inputElement.files![0]).toBe(file)
    })
  })

  describe('Accessibilité', () => {
    it('tous les champs devraient avoir des labels', () => {
      render(<InscriptionPage />)

      // Vérifier que les inputs ont des labels associés
      const firstNameInput = screen.getByLabelText(/Prénom/i)
      const lastNameInput = screen.getByLabelText(/^Nom/i)
      const emailInput = screen.getByLabelText(/Email/i)

      expect(firstNameInput).toHaveAttribute('id')
      expect(lastNameInput).toHaveAttribute('id')
      expect(emailInput).toHaveAttribute('id')
    })

    it('les boutons devraient avoir du texte visible', () => {
      render(<InscriptionPage />)

      const suivantBtn = screen.getByRole('button', { name: /Suivant/i })
      expect(suivantBtn).toBeVisible()
    })
  })

  describe('Champs obligatoires', () => {
    it('les champs obligatoires devraient avoir l\'attribut required', () => {
      render(<InscriptionPage />)

      const firstNameInput = screen.getByLabelText(/Prénom/i)
      const emailInput = screen.getByLabelText(/Email/i)

      expect(firstNameInput).toHaveAttribute('required')
      expect(emailInput).toHaveAttribute('required')
    })

    it('les champs obligatoires devraient avoir une astérisque (*)', () => {
      render(<InscriptionPage />)

      // Vérifier que les labels contiennent une astérisque
      expect(screen.getByText(/Prénom.*\*/i)).toBeInTheDocument()
      expect(screen.getByText(/Email.*\*/i)).toBeInTheDocument()
    })
  })
})
