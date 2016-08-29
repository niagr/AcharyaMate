export function makeRandomNumberArray(size, upperLimit) {
    return new Array(size).fill(0).map(n => Math.floor(Math.random() * 100) % upperLimit);
}
