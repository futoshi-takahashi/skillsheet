import { describe, it, expect } from 'vitest'
import { calculateDuration } from './calculateDuration'

describe('calculateDuration', () => {
  describe('年月を渡すと', () => {
    it('1ヶ月の場合はmonthsのみ返す', () => {
      const result = calculateDuration(2024, 1, 2024, 1)
      expect(result).toEqual({ months: 1 })
    })

    it('11ヶ月の場合はmonthsのみ返す', () => {
      const result = calculateDuration(2024, 1, 2024, 11)
      expect(result).toEqual({ months: 11 })
    })

    it('12ヶ月（ちょうど1年）の場合はyearsのみ返す', () => {
      const result = calculateDuration(2024, 1, 2024, 12)
      expect(result).toEqual({ years: 1 })
    })

    it('13ヶ月の場合はyearsとmonthsを返す', () => {
      const result = calculateDuration(2024, 1, 2025, 1)
      expect(result).toEqual({ years: 1, months: 1 })
    })

    it('24ヶ月（ちょうど2年）の場合はyearsのみ返す', () => {
      const result = calculateDuration(2024, 1, 2025, 12)
      expect(result).toEqual({ years: 2 })
    })

    it('27ヶ月の場合はyearsとmonthsを返す', () => {
      const result = calculateDuration(2024, 1, 2026, 3)
      expect(result).toEqual({ years: 2, months: 3 })
    })

    it('年をまたぐ場合も正しく計算する', () => {
      const result = calculateDuration(2020, 1, 2023, 12)
      expect(result).toEqual({ years: 4 })
    })

    it('開始月が終了月より大きい場合も正しく計算する', () => {
      const result = calculateDuration(2024, 10, 2025, 3)
      expect(result).toEqual({ months: 6 })
    })
  })
})
