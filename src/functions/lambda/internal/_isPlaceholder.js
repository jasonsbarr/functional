// curry functions and their dependencies stolen from Ramda
export const _isPlaceholder = (a) => {
  return (
    a != null && typeof a === "object" && a["@@functional/placeholder"] === true
  );
};
