import { renderHook, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useProfile } from './useProfile'
import type { Profile } from '../api/Profile'

const mockFetchProfile = vi.hoisted(() => vi.fn())

vi.mock('../api/fetchProfile', () => ({
  fetchProfile: mockFetchProfile,
}))

describe('useProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('マウント時に', () => {
    it('loading状態になり、fetchProfileが呼ばれる', async () => {
      mockFetchProfile.mockImplementation(() => new Promise(() => {}))

      const { result } = renderHook(() => useProfile())

      await waitFor(() => {
        expect(result.current.status).toBe('loading')
      })

      expect(result.current).toEqual({
        status: 'loading',
        data: null,
        error: null,
      })
      expect(mockFetchProfile).toHaveBeenCalledTimes(1)
    })
  })

  describe('fetchProfileが成功すると', () => {
    it('success状態になり、取得したデータが設定される', async () => {
      const mockProfile: Profile = {
        name: '山田太郎',
        age: 30,
        email: 'yamada@example.com',
      } as any

      mockFetchProfile.mockResolvedValue(mockProfile)

      const { result } = renderHook(() => useProfile())

      await waitFor(() => {
        expect(result.current.status).toBe('success')
      })

      expect(result.current).toEqual({
        status: 'success',
        data: mockProfile,
        error: null,
      })
    })
  })

  describe('fetchProfileがErrorをスローすると', () => {
    it('error状態になり、エラーオブジェクトが設定される', async () => {
      const errorMessage = 'ネットワークエラー'
      const mockError = new Error(errorMessage)

      mockFetchProfile.mockRejectedValue(mockError)

      const { result } = renderHook(() => useProfile())

      await waitFor(() => {
        expect(result.current.status).toBe('error')
      })

      expect(result.current).toEqual({
        status: 'error',
        data: null,
        error: mockError,
      })
    })
  })

  describe('fetchProfileがError以外をスローすると', () => {
    it('error状態になり、デフォルトのエラーメッセージが設定される', async () => {
      mockFetchProfile.mockRejectedValue('unknown error')

      const { result } = renderHook(() => useProfile())

      await waitFor(() => {
        expect(result.current.status).toBe('error')
      })

      expect(result.current.status).toBe('error')
      if (result.current.status === 'error') {
        expect(result.current.error.message).toBe('プロフィール取得に失敗しました')
      }
    })
  })
})
