import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Container } from './Container'
import type { Profile } from '../api/Profile'

vi.mock('./Presentational', () => ({
  Presentational: (props: any) => (
    <div data-testid="presentational">{JSON.stringify(props)}</div>
  )
}))

describe('Container', () => {
  describe('Profileデータを渡すと', () => {
    it('各セクションのpropsに整形してPresentationalに渡される', () => {
      const profile: Profile = {
        name: 'Taro Yamada',
        nameJp: '山田 太郎',
        skills: ['React', 'TypeScript'],
        summary: ['エンジニア歴10年'],
        operatingSystems: ['Mac', 'Windows'],
        workHistory: [
          {
            title: 'フロントエンド開発',
            details: ['Reactで開発'],
            startDate: '2020-01-01',
            endDate: '2023-12-31',
            phases: ['設計', '実装'],
            languages: ['TypeScript']
          }
        ]
      }

      const { container } = render(<Container profile={profile} />)
      const presentationalDiv = container.querySelector(
        '[data-testid="presentational"]'
      )
      const props = JSON.parse(presentationalDiv?.textContent || '{}')

      expect(props.header).toEqual({
        name: 'Taro Yamada',
        nameJp: '山田 太郎'
      })
      expect(props.summary).toEqual({
        items: ['エンジニア歴10年']
      })
      expect(props.skills).toEqual({
        skills: ['React', 'TypeScript'],
        operatingSystems: ['Mac', 'Windows']
      })
    })
  })

  describe('workHistoryのstartDateとendDateを渡すと', () => {
    it('startDateとendDateがそのまま渡される', () => {
      const profile: Profile = {
        name: 'Taro Yamada',
        nameJp: '山田 太郎',
        skills: [],
        summary: [],
        operatingSystems: [],
        workHistory: [
          {
            title: 'プロジェクトA',
            details: ['詳細A'],
            startDate: '2020-01-01',
            endDate: '2023-12-31',
            phases: ['設計'],
            languages: ['TypeScript']
          },
          {
            title: 'プロジェクトB',
            details: ['詳細B'],
            startDate: '2024-01-01',
            endDate: '2025-12-31',
            phases: ['実装'],
            languages: ['JavaScript']
          }
        ]
      }

      const { container } = render(<Container profile={profile} />)
      const presentationalDiv = container.querySelector(
        '[data-testid="presentational"]'
      )
      const props = JSON.parse(presentationalDiv?.textContent || '{}')

      // 配列の順序は元のまま（ソートはProfileWorkHistory/Containerで行われる）
      expect(props.workHistory.items[0].startDate).toBe('2020-01-01')
      expect(props.workHistory.items[0].endDate).toBe('2023-12-31')
      expect(props.workHistory.items[0].title).toBe('プロジェクトA')
      expect(props.workHistory.items[0].details).toEqual(['詳細A'])
      expect(props.workHistory.items[0].phases).toEqual(['設計'])
      expect(props.workHistory.items[0].languages).toEqual(['TypeScript'])

      expect(props.workHistory.items[1].startDate).toBe('2024-01-01')
      expect(props.workHistory.items[1].endDate).toBe('2025-12-31')
      expect(props.workHistory.items[1].title).toBe('プロジェクトB')
    })
  })
})
