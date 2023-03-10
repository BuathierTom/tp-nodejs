const { addition, quotient } = require("../maths");

describe("maths.js", () => {
  describe("addition", () => {
    it("Doit retourner la somme de a et b", () => {
      const res = addition(1, 2);
      expect(res).toBe(3);
    });
    it("Doit retourner la somme de a et b avec a valant 0", () => {
      const res = addition(0, 2);
      expect(res).toBe(2);
    });
    it("Doit retourner la somme de a et b avec a < 0", () => {
      const res = addition(-5, 2);
      expect(res).toBe(-3);
    });
    it("Doit throw une erreur car un des parametres est du mauvais type", () => {
      expect(() => {
        addition(1, "ttoo");
      }).toThrow(new Error("Mauvais type!"));
    });
  });
  describe("quotient", () => {
    it("Doit retourner le quotient de a et b", () => {
      const res = quotient(4, 2);
      expect(res).toBe(2);
    });
    it("Doit retourner le quotient de a et b avec a valant 0", () => {
      const res = quotient(0, 2);
      expect(res).toBe(0);
    });
    it("Doit throw une erreur car b vaut 0", () => {
      expect(() => {
        quotient(4, 0);
      }).toThrow("Il est impossible de diviser par 0!");
    });
    it("Doit throw une erreur car un des parametres est du mauvais type", () => {
      expect(() => {
        quotient("toto", 2);
      }).toThrow("Mauvais type!");
    });
  });
});