import R from 'ramda'

export default function deepMerge(v1, v2) {
  if (Array.isArray(v1) && Array.isArray(v2)) {
    return R.uniq(R.concat(v1, v2))
  } else if (typeof v1 === 'object' && typeof v2 === 'object') {
    return R.mergeWith(deepMerge, v1, v2)
  }

  return v2
}
