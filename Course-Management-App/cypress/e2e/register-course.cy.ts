describe('Course Registration', () => {
  it('Should register a course', () => {
    cy.visit('/');
    cy.wait(1500);
    cy.get('table')
      .find('tr')
      .then((rows) => {
        if (rows) {
          cy.wrap(rows).find('.detail-button').first().click();
          cy.contains('Course Information');
          cy.get('#register-button').click();
          cy.get('#firstName').type('Test');
          cy.get('#lastName').type('tLastname');
          cy.get('#phone').type('0769240957');
          cy.get('#email').type('test@gmail.com');
          cy.get('[data-test-id=submit]').click();
          cy.contains('[role="alert"]', 'Successful').should('be.visible');
          cy.wait(3000);
          cy.contains('[role="alert"]', 'Successful').should('not.exist');
        } else {
          cy.log('no course found');
        }
      });
  });
});