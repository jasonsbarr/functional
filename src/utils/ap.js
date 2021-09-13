export const liftA2 = (f) => (a, b) => b.ap(a.map(f));
