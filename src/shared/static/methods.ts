declare global {
  interface Number {
    fprice(): string;
  }
  interface String {
    telFormat(): string;
  }
}

Number.prototype.fprice = function () {
  return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " UZS";
};

String.prototype.telFormat = function () {
  return this.replace(/(\+998)(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
};
