class Nil {
  constructor() {
    Object.defineProperty(this, "kind", {
      configurable: false,
      enumerable: false,
      writable: false,
      value: "Nil",
    });
  }

  toString() {
    return "Nil()";
  }

  inspect() {
    return this.toString();
  }
}

export const NIL = new Nil();

class Cons extends Array {
  constructor(car, cdr) {
    super(car, cdr);
  }

  toString() {
    let arrStr = [...this].toString();
    let strArr = arrStr.split(",");
    let str =
      strArr.length == 2
        ? "'(" + strArr.join(" . ") + ")"
        : "'(" + strArr.join(" ") + ")";
    return str;
  }

  [Symbol.iterator]() {
    let head = this;
    let i = 0;

    return {
      next() {
        let value = head[i];
        if (value == null) {
          return {
            done: true,
          };
        } else {
          if (head[1] instanceof Cons) {
            head = head[1];
            return {
              value,
              done: false,
            };
          } else {
            i++;
            return {
              value,
              done: false,
            };
          }
        }
      },
    };
  }
}

export const cons = (car, cdr) => new Cons(car, cdr);

export const List = (...args) => {
  if (args.length === 0 || args[0] == null || args[0] instanceof Nil) {
    return NIL;
  }

  let i = 0;
  let head = new Cons(args[i], NIL);
  let l = head;
  i++;
  while (i < args.length) {
    head[1] = new Cons(args[i], NIL);
    head = head[1];
    i++;
  }

  Object.defineProperty(l, "kind", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: "List",
  });
  return l;
};
