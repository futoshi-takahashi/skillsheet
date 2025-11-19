import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Container } from './Container'

vi.mock('./Presentational', () => ({
  Presentational: (props: any) => (
    <div data-testid="presentational">{JSON.stringify(props)}</div>
  )
}))

describe('Container', () => {
  describe('workHistory items を渡すと', () => {
    it('endDate で降順にソートされ、日本語フォーマットの期間文字列が生成される', () => {
      const items = [
        {
          startDate: '2020-01-01',
          endDate: '2023-12-31',
          title: 'プロジェクトA',
          details: ['詳細A'],
          phases: ['設計'],
          languages: ['TypeScript']
        },
        {
          startDate: '2024-01-01',
          endDate: '2025-12-31',
          title: 'プロジェクトB',
          details: ['詳細B'],
          phases: ['実装'],
          languages: ['JavaScript']
        },
        {
          startDate: '2018-01-01',
          endDate: '2019-12-31',
          title: 'プロジェクトC',
          details: ['詳細C'],
          phases: ['テスト'],
          languages: ['Python']
        }
      ]

      const { container } = render(<Container items={items} />)
      const presentationalDiv = container.querySelector(
        '[data-testid="presentational"]'
      )
      const props = JSON.parse(presentationalDiv?.textContent || '{}')

      expect(props.items[0].period).toBe('2024年01月〜2025年12月（2年）')
      expect(props.items[0].title).toBe('プロジェクトB')
      expect(props.items[1].period).toBe('2020年01月〜2023年12月（4年）')
      expect(props.items[1].title).toBe('プロジェクトA')
      expect(props.items[2].period).toBe('2018年01月〜2019年12月（2年）')
      expect(props.items[2].title).toBe('プロジェクトC')
    })
  })
})
