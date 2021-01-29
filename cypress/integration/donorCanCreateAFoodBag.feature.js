/* eslint-disable no-undef */
describe('Donor can create a foodbag', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'http:localhost:3000/api/auth/sign_in',
      response: 'fx:donor_can_register.json',
      headers: {
        uid: 'donor@donor.com',
      },
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/auth/validate_token**',
      response: 'fx:donor_can_register.json',
    })
    cy.visit('/')
  })
  describe('successfully', () => {
    it('fills in pickup time 12-16', () => {
      cy.route({
        method: 'POST',
        url: 'http://localhost:3000/api/foodbags',
        response: { message: 'Your foodbag was successfully created!' },
      })
      cy.get("[data-cy='foodbag-form']").within(() => {
        cy.get('[data-cy="pickuptime-dropdown"]').select('12-16')
        cy.get("[data-cy='submit-btn']").contains('Donate').click()
        cy.get("[data-cy='api-response-success-message']").should(
          'contain',
          'Your foodbag was successfully created!'
        )
      })
    })
  })
  describe('successfully', () => {
    it('fills in pickup time 16-20', () => {
      cy.route({
        method: 'POST',
        url: 'http://localhost:3000/api/foodbags',
        response: { message: 'Your foodbag was successfully created!' },
      })
      cy.get("[data-cy='foodbag-form']").within(() => {
        cy.get('[data-cy="pickuptime-dropdown"]').select('16-20')
        cy.get("[data-cy='submit-btn']").contains('Donate').click()
        cy.get("[data-cy='api-response-success-message']").should(
          'contain',
          'Your foodbag was successfully created!'
        )
      })
    })
  })
  describe('unsuccessfully', () => {
    it('fills in form', () => {
      cy.route({
        method: 'POST',
        url: 'http://localhost:3000/api/foodbags',
        response: { message: "Pickuptime can't be blank!" },
        status: 422,
      })
      cy.get("[data-cy='foodbag-form']").within(() => {
        cy.get("[data-cy='submit-btn']").contains('Donate').click()
        cy.get("[data-cy='api-response-error-message']").should(
          'contain',
          "Pickuptime can't be blank!"
        )
      })
    })
  })
})
