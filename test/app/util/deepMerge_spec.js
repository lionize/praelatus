import { expect } from 'chai'
import deepMerge from 'app/util/deepMerge'

describe('deepMerge', () => {
  describe('with two arrays', () => {
    it('concats the arrays', () => {
      const result = deepMerge([1], [2])

      expect(result).to.have.members([1, 2])
    })

    it('removes non-unique items', () => {
      const result = deepMerge([1, 2], [2, 3])

      expect(result).to.deep.eq([1, 2, 3])
    })
  })

  describe('with two objects', () => {
    it('merges the objects', () => {
      const result = deepMerge({id: 1}, {name: 'John'})

      expect(result).to.deep.eq({id: 1, name: 'John'})
    })

    it('deep merges the objects', () => {
      const result = deepMerge({ids: [1, 2]}, {ids: [2, 3]})

      expect(result).to.deep.eq({ids: [1, 2, 3]})
    })
  })

  describe('two values', () => {
    it('returns the second value', () => {
      const result = deepMerge(1, 2)

      expect(result).to.eq(2)
    })
  })
})
