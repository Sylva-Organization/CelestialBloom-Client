import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Home from '../pages/Home'

// Mock del store de autenticación
vi.mock('../store/authStore', () => ({
  useAuthStore: vi.fn(() => ({
    user: null,
    token: null,
    isAdmin: () => false,
    roles: []
  }))
}))

test('Home page renders without crashing', () => {
  const { container } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )
  
  expect(container).toBeTruthy()
})

test('shows content on Home page', () => {
  const { container } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )
  
  // Verificar que existe contenido en la página
  expect(container.textContent).toBeTruthy()
  expect(container.querySelector('div')).toBeTruthy()
})

test('Home has main section', () => {
  const { container } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )
  
  // Verificar que tiene una estructura básica
  expect(container.firstChild).toBeTruthy()
  expect(container.innerHTML.length > 0).toBe(true)
})

test('has navigation or interactive elements', () => {
  const { container } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )
  
  // Verificar que existe algún elemento interactivo (botones, enlaces, etc.)
  const buttons = container.querySelectorAll('button')
  const links = container.querySelectorAll('a')
  
  // Al menos debería tener botones o enlaces (del navbar u otros componentes)
  expect(buttons.length + links.length).toBeGreaterThan(0)
})

test('contains any meaningful content', () => {
  const { container } = render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )
  
  // Verificar que contiene algún texto significativo
  const textContent = container.textContent.toLowerCase()
  expect(textContent.length).toBeGreaterThan(10)
  
  // Verificar que no está completamente vacío
  expect(textContent.trim()).toBeTruthy()
})
