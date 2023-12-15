export default function (obj: any) {
  return Object.keys(obj).reduce((acc: any, curr: any) => {
    acc[curr] = typeof acc[curr] == 'string' ? acc[curr].trim() : acc[curr]
    return acc
  }, obj)
}
