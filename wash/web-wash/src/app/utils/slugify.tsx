export function slugify(text: string): string {
    return text
        .toString()
        .normalize('NFD') // Normaliza acentos
        .replace(/[\u0300-\u036f]/g, '') // Remove acentos
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Substitui espaços por hifens
        .replace(/[^\w\-()]/g, '') // Remove caracteres especiais, exceto parênteses
        .replace(/\-\-+/g, '-'); // Substitui múltiplos hifens por um único
}
