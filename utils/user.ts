export function getUserIconLetter(name: string, lastName: string): string {
  return name[0].toUpperCase() + lastName[0].toUpperCase();
}