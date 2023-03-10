const { age } = require("../users");

const fakeUsers = require("../__mocks__/fakeUserValid.json");

describe("users.js", () => {
    describe("age", () => {
        it("Doit retourner le bon user qui a 50 ans", () => {
            const res = age(fakeUsers);
            expect(res).toStrictEqual([fakeUsers[0]]);
        });
        it("Doit throw une erreur car la liste des utilisateur est du mauvais type", () => {
        expect(() => {
                age("liste");
            }).toThrow("La liste des utilisateur doit être un tableau contenant des utilisateurs");
        });
        it("Doit throw une erreur car la liste des utilisateur ne doit pas être vide", () => {
            expect(() => {
              age([]);
            }).toThrow("La liste des utilisateur est vide");
        });
    });
});