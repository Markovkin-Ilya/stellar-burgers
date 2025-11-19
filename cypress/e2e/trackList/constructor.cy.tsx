

describe('проверяем constructor', function () {
    beforeEach(() => {
        window.localStorage.setItem("refreshToken",
            JSON.stringify("test-refreshToken")
        );
        cy.setCookie("accessToken", "test-accessToken");
        cy.intercept("GET", "https://norma.education-services.ru/api/ingredients", { fixture: "ingredients" });
        cy.intercept("GET", "https://norma.education-services.ru/api/auth/user", { fixture: "user" });
        cy.intercept("POST", "https://norma.education-services.ru/api/orders", { fixture: "order" });
        cy.visit('http://localhost:4000');
    })

    it('добавление ингредиента в список заказа', function () {
        cy.get("[data-cy=add-2] > button").click()
        cy.get("[data-cy=ConstructorElement]").should('be.visible')
    });

    it('открытие и закрытие модального окна', function () {
        cy.get("[data-cy=ingredient-2]").click()
        cy.get("[data-cy=modal]").should('be.visible')
        cy.get("[data-cy=closeModal]").click()
        cy.get("[data-cy=modal]").should('not.exist')
    });

    it('создание заказа', function () {
        cy.get("[data-cy=add-1] > button").click()
        cy.get("[data-cy=add-2] > button").click()
        cy.get("[data-cy=orderButton]").click()
        cy.get("[data-cy=modal]").should('be.visible')
        cy.get("[data-cy=orderNumber]").contains('94705')
        cy.get("[data-cy=closeModal]").click()
        cy.get("[data-cy=modal]").should('not.exist')
        cy.get("[data-cy=ConstructorElement]").should('not.exist')
    });


});