export default (string: string, numberOfCharacter: number) =>
  string &&
  `${string.slice(0, numberOfCharacter)} . . . ${string.slice(string.length - numberOfCharacter, string.length)}`
