import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Navbar from '../components/navBar'

// Mock del store de autenticación
vi.mock('../store/authStore', () => ({
  useAuthStore: vi.fn(() => ({
    user: null,
    token: null,
    logout: vi.fn(),
    isAdmin: () => false,
    roles: []
  }))
}))

test('Navbar renders without crashing', () => {
  const { container } = render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  )
  
  expect(container).toBeTruthy()
})
