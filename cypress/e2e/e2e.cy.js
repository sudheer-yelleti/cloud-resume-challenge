describe('Visitor number changes on multiple reloads', () => {
  const divSelector = '#result'; // adjust if needed
  const reloadCount = 5;

  it('should show a different visitor number on each reload', { timeout: 180000 }, () => {
    let previousNumbers = [];

    function checkVisitorNumber(reloadsLeft) {
      cy.visit('/index.html', { timeout: 60000 });

      // Wait until the text contains a number
      cy.get(divSelector, { timeout: 60000 })
        .should(($el) => {
          const text = $el.text().trim();
          const match = text.match(/\d+/);
          expect(match, 'Visitor number exists').to.not.be.null;
        })
        .invoke('text')
        .then((text) => {
          cy.log(`Div text: ${text}`);
          const visitorNumber = parseInt(text.match(/\d+/)[0], 10);

          expect(previousNumbers, 'Visitor number has changed').not.to.include(visitorNumber);
          previousNumbers.push(visitorNumber);

          if (reloadsLeft > 1) {
            checkVisitorNumber(reloadsLeft - 1);
          }
        });
    }

    checkVisitorNumber(reloadCount);
  });
});
