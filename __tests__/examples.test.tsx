/**
 * Exemples de tests simples pour comprendre les bases
 *
 * Ce fichier contient des exemples de tests de base pour vous aider
 * à comprendre comment écrire vos propres tests.
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'

// Exemple de composant simple à tester
function Counter() {
  const [count, setCount] = React.useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

// Exemple de formulaire simple
function SimpleForm() {
  const [name, setName] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Submit</button>
      {submitted && <p>Form submitted! Name: {name}</p>}
    </form>
  )
}

describe('Exemples de tests basiques', () => {
  // Exemple 1: Test d'affichage simple
  it('devrait afficher un texte', () => {
    render(<div>Hello World</div>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  // Exemple 2: Test avec un bouton
  it('devrait incrémenter le compteur', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    // Vérifier l'état initial
    expect(screen.getByText('Count: 0')).toBeInTheDocument()

    // Cliquer sur le bouton Increment
    await user.click(screen.getByText('Increment'))

    // Vérifier que le compteur a augmenté
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
  })

  // Exemple 3: Test de multiple clics
  it('devrait gérer plusieurs clics', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    const incrementBtn = screen.getByText('Increment')

    // Cliquer 3 fois
    await user.click(incrementBtn)
    await user.click(incrementBtn)
    await user.click(incrementBtn)

    expect(screen.getByText('Count: 3')).toBeInTheDocument()
  })

  // Exemple 4: Test de décrémentation
  it('devrait décrémenter le compteur', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    await user.click(screen.getByText('Increment'))
    await user.click(screen.getByText('Increment'))
    expect(screen.getByText('Count: 2')).toBeInTheDocument()

    await user.click(screen.getByText('Decrement'))
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
  })

  // Exemple 5: Test de reset
  it('devrait réinitialiser le compteur', async () => {
    const user = userEvent.setup()
    render(<Counter />)

    await user.click(screen.getByText('Increment'))
    await user.click(screen.getByText('Increment'))
    expect(screen.getByText('Count: 2')).toBeInTheDocument()

    await user.click(screen.getByText('Reset'))
    expect(screen.getByText('Count: 0')).toBeInTheDocument()
  })

  // Exemple 6: Test de formulaire simple
  it('devrait soumettre le formulaire', async () => {
    const user = userEvent.setup()
    render(<SimpleForm />)

    // Remplir le champ
    const input = screen.getByLabelText('Name:')
    await user.type(input, 'John Doe')

    // Vérifier la valeur
    expect(input).toHaveValue('John Doe')

    // Soumettre
    await user.click(screen.getByText('Submit'))

    // Vérifier le message de confirmation
    expect(screen.getByText('Form submitted! Name: John Doe')).toBeInTheDocument()
  })

  // Exemple 7: Test de présence/absence d'éléments
  it('ne devrait pas afficher le message avant soumission', () => {
    render(<SimpleForm />)

    // Le message ne devrait pas être présent initialement
    expect(screen.queryByText(/Form submitted/)).not.toBeInTheDocument()
  })

  // Exemple 8: Test de sélection par rôle
  it('devrait trouver les boutons par leur rôle', () => {
    render(<Counter />)

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)
  })

  // Exemple 9: Test avec regex
  it('devrait trouver le texte avec regex', () => {
    render(<Counter />)

    expect(screen.getByText(/Count:/i)).toBeInTheDocument()
    expect(screen.getByText(/^Count: \d+$/)).toBeInTheDocument()
  })

  // Exemple 10: Test de valeur d'input
  it('devrait mettre à jour la valeur de l\'input', async () => {
    const user = userEvent.setup()
    render(<SimpleForm />)

    const input = screen.getByLabelText('Name:')

    await user.type(input, 'Test')
    expect(input).toHaveValue('Test')

    await user.clear(input)
    expect(input).toHaveValue('')

    await user.type(input, 'New Value')
    expect(input).toHaveValue('New Value')
  })
})

// Exemples de matchers courants
describe('Exemples de matchers', () => {
  it('matchers de présence', () => {
    render(<div>Test Content</div>)

    // L'élément est dans le document
    expect(screen.getByText('Test Content')).toBeInTheDocument()

    // L'élément est visible
    expect(screen.getByText('Test Content')).toBeVisible()
  })

  it('matchers de valeur', () => {
    render(<input type="text" value="test" readOnly />)
    const input = screen.getByRole('textbox')

    expect(input).toHaveValue('test')
  })

  it('matchers de classe et attributs', () => {
    render(<button className="primary" disabled>Click me</button>)
    const button = screen.getByRole('button')

    expect(button).toHaveClass('primary')
    expect(button).toBeDisabled()
  })

  it('matchers de nombre', () => {
    const value = 5

    expect(value).toBe(5)
    expect(value).toBeGreaterThan(4)
    expect(value).toBeLessThan(6)
    expect(value).toBeGreaterThanOrEqual(5)
  })

  it('matchers de tableau', () => {
    const array = [1, 2, 3]

    expect(array).toHaveLength(3)
    expect(array).toContain(2)
    expect(array).toEqual([1, 2, 3])
  })

  it('matchers de string', () => {
    const text = 'Hello World'

    expect(text).toContain('World')
    expect(text).toMatch(/Hello/)
    expect(text).toHaveLength(11)
  })
})

// Note: Ces exemples utilisent React.useState qui nécessite l'import de React
import React from 'react'
