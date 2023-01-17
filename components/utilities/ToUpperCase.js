export default function toUpperCase(name) {
  const capitalized = name.charAt(0).toUpperCase() + name.slice(1);
  return capitalized;
}
