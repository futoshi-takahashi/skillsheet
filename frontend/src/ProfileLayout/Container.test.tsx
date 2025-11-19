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
        createdDate: '2025-11-19',
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
      expect(props.footer).toEqual({
        createdDate: '2025-11-19'
      })
    })
  })

  describe('workHistoryのstartDateとendDateを渡すと', () => {
    it('period文字列に整形される', () => {
      const profile: Profile = {
        createdDate: '2025-11-19',
        name: 'Taro Yamada',
        nameJp: '山田 太郎',
        skills: [],
        summary: [],
        operatingSystems: [],
        workHistory: [
          {
            title: 'プロジェクトA',
            details: ['詳細'],
            startDate: '2020-01-01',
            endDate: '2023-12-31',
            phases: ['設計'],
            languages: ['TypeScript']
          }
        ]
      }

      const { container } = render(<Container profile={profile} />)
      const presentationalDiv = container.querySelector(
        '[data-testid="presentational"]'
      )
      const props = JSON.parse(presentationalDiv?.textContent || '{}')

      expect(props.workHistory.items[0].period).toBe('2020-01-01 - 2023-12-31')
      expect(props.workHistory.items[0].title).toBe('プロジェクトA')
      expect(props.workHistory.items[0].details).toEqual(['詳細'])
      expect(props.workHistory.items[0].phases).toEqual(['設計'])
      expect(props.workHistory.items[0].languages).toEqual(['TypeScript'])
    })
  })
})
