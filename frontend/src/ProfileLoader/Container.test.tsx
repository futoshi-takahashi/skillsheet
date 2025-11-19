import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Container } from './Container'
import type { UseProfileState } from '../hooks/useProfile'

vi.mock('../hooks/useProfile')
vi.mock('./Presentational', () => ({
  LoadingUI: () => <div data-testid="loading-ui">Loading...</div>,
  ErrorUI: ({ message }: { message: string }) => (
    <div data-testid="error-ui">{message}</div>
  )
}))
vi.mock('../ProfileLayout', () => ({
  ProfileLayout: ({ profile }: { profile: unknown }) => (
    <div data-testid="profile-layout">{JSON.stringify(profile)}</div>
  )
}))

const mockUseProfile = vi.hoisted(() => vi.fn())

vi.mock('../hooks/useProfile', () => ({
  useProfile: mockUseProfile
}))

describe('Container', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('useProfileがidle状態を返すと', () => {
    it('LoadingUIが表示される', () => {
      const state: UseProfileState = {
        status: 'idle',
        data: null,
        error: null
      }
      mockUseProfile.mockReturnValue(state)

      render(<Container />)

      expect(screen.getByTestId('loading-ui')).toBeInTheDocument()
    })
  })

  describe('useProfileがloading状態を返すと', () => {
    it('LoadingUIが表示される', () => {
      const state: UseProfileState = {
        status: 'loading',
        data: null,
        error: null
      }
      mockUseProfile.mockReturnValue(state)

      render(<Container />)

      expect(screen.getByTestId('loading-ui')).toBeInTheDocument()
    })
  })

  describe('useProfileがerror状態を返すと', () => {
    it('ErrorUIがエラーメッセージと共に表示される', () => {
      const errorMessage = 'ネットワークエラーが発生しました'
      const state: UseProfileState = {
        status: 'error',
        data: null,
        error: new Error(errorMessage)
      }
      mockUseProfile.mockReturnValue(state)

      render(<Container />)

      const errorUI = screen.getByTestId('error-ui')
      expect(errorUI).toBeInTheDocument()
      expect(errorUI).toHaveTextContent(errorMessage)
    })
  })

  describe('useProfileがsuccess状態を返すと', () => {
    it('ProfileLayoutがプロフィールデータと共に表示される', () => {
      const profileData = { id: '123', name: '山田太郎' }
      const state: UseProfileState = {
        status: 'success',
        data: profileData,
        error: null
      } as any
      mockUseProfile.mockReturnValue(state)

      render(<Container />)

      const profileLayout = screen.getByTestId('profile-layout')
      expect(profileLayout).toBeInTheDocument()
      expect(profileLayout).toHaveTextContent(JSON.stringify(profileData))
    })
  })
})
