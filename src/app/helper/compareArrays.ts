export default function compareArrays(a: any[], b: any[]): boolean {
  if (a.length !== b.length) return false;

  return a.every((element, index) => element === b[index]);
}
