const { getUser } = require("../shop");

const fakeUsers = require("../__mocks__/fakeUserValid.json");

describe("shop.js", () => {
  describe("getUser", () => {
    it("Doit retourner le bon user", () => {
      const res = getUser(1, fakeUsers);
      expect(res).toBe(fakeUsers[0]);
    });
    it("Doit renvoyer une erreur car l'utilisateur n'existe pas", () => {
      expect(() => {
        getUser(10, fakeUsers);
      }).toThrow("L'utilisateur 10 n'existe pas!");
    });
    it("Doit throw une erreur car l'identifiant passé en parametre est du mauvais type", () => {
      expect(() => {
        getUser("toto", 2);
      }).toThrow("L'identifiant doit être un entier positif");
    });
    it("Doit throw une erreur car la liste des utilisateur est du mauvais type", () => {
      expect(() => {
        getUser(1, "liste");
      }).toThrow(
        "La liste des utilisateur doit être un tableau contenant des utilisateurs"
      );
    });
    it("Doit throw une erreur car la liste des utilisateur ne doit pas être vide", () => {
      expect(() => {
        getUser(1, []);
      }).toThrow("La liste des utilisateur est vide");
    });
    it("Doit throw une erreur car l'id est invalide", () => {
      expect(() => {
        getUser(-1, fakeUsers);
      }).tothrow("L'identifiant doit être un entier positif");
    });
  });
});