// stolen from https://github.com/adobe/ferrum/blob/6434098c7f8ca6cb31a6bbe54dff3d1026a25f2d/src/functional.js#L109
export const pipeline = (val, ...fns) => fns.reduce((v, fn) => fn(v), val);
