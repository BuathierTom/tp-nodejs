const { getUser } = require("../shop");

const fakeUsers = require("../__mocks__/fakeUserValid.json");

describe("shop.js", () => {
  describe("getUser", () => {
    it("Doit retourner le bon user", () => {
      const res = getUser(1, fakeUsers);
      expect(res).toBe(fakeUsers[0]);
    });
    it("Doit renvoyer une erreur car l'utilisateur n'existe pas", () => {
      try {
        getUser(10, fakeUsers);
      } catch (e) {
        expect(e.message).toBe("L'utilisateur 10 n'existe pas!");
      }
    });
    it("Doit throw une erreur car l'identifiant passé en parametre est du mauvais type", () => {
      try {
        const res = getUser("toto", 2);
      } catch (e) {
        expect(e.message).toBe("L'identifiant doit être un entier positif");
      }
    });
    it("Doit throw une erreur car la liste des utilisateur est du mauvais type", () => {
      try {
        const res = getUser(1, "liste");
      } catch (e) {
        expect(e.message).toBe(
          "La liste des utilisateur doit être un tableau contenant des utilisateurs"
        );
      }
    });
    it("Doit throw une erreur car la liste des utilisateur ne doit pas être vide", () => {
      try {
        const res = getUser(1, []);
      } catch (e) {
        expect(e.message).toBe("La liste des utilisateur est vide");
      }
    });
    it("Doit throw une erreur car l'id est invalide", () => {
      try {
        const res = getUser(-1, fakeUsers);
      } catch (e) {
        expect(e.message).toBe("L'identifiant doit être un entier positif");
      }
    });
  });
});
