describe('Course page Test', () => {
  it('Visits the courses page', () => {
    cy.visit('/')
    cy.contains('Active Courses')
  })
})
