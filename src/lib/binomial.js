function logf(n) {
    return n === 0 ? 0 : (n + .5) * Math.log(n) - n + 0.9189385332046728 + 0.08333333333333333 / n - 0.002777777777777778 * Math.pow(n, -3);
}

export default function binomial(n , k) {
    return Math.exp(logf(n) - logf(n - k) - logf(k));
}