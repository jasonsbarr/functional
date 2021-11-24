// Execution states
const { Pending, Cancelled, Rejected, Resolved } = {
  Pending: () => ({ name: "Pending" }),
  Cancelled: () => ({ name: "Cancelled" }),
  Rejected: (reason) => ({ name: "Rejected", reason }),
  Resolved: (value) => ({ name: "Resolved", value }),
};

export { Pending, Cancelled, Rejected, Resolved };
