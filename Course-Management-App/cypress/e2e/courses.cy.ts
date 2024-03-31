describe('Course page Test', () => {
  beforeEach(() => {

    cy.wait(2000);
    cy.visit('/');
    cy.wait(2000);
  });

  it('it should  visit the courses page', () => {
    cy.contains('Active Courses');
  });

  it('it should filter courses by German language', () => {
    cy.get('#language').click();
    cy.get('.p-dropdown-items').contains('German').click();
    cy.wait(2000);
    cy.get('table').as('courseTable');
    cy.get('@courseTable')
      .find('tr')
      .then((rows) => {
        if (rows.find('td').length) {
          cy.wrap(rows).find('td').first().should('contain', 'German');
        } else {
          cy.log('no course with German');
        }
      });
  });

  it('it should navigate to a course details', () => {
    cy.get('table').as('courseTable');
    cy.get('table')
      .find('tr')
      .then((rows) => {
        if (rows) {
          cy.wrap(rows).find('.p-button-warning').first().click();
          cy.contains('Course Information').should('be.visible');
        } else {
          cy.log('no course found');
        }
      });
  });
});
