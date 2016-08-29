export function makeRandomNumberArray (size: number, upperLimit: number) {
    return new Array(size).fill(0).map(n => Math.floor(Math.random() * 100) % upperLimit);
}