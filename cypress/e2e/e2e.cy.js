describe('Div text changes on multiple page reloads', () => {
  // const url = 'https://localhost:5000/index.html'; // replace with your page URL
  const divSelector = 'result'; // replace with your div selector
  const reloadCount = 5; // number of reloads to check

  it('should have different text on each reload', () => {
    let previousTexts = [];

    function checkTextChange(reloadsLeft) {
      cy.visit();
      cy.get(divSelector)
        .invoke('text')
        .then((text) => {
          const trimmedText = text.trim();
          // Ensure new text is not equal to any previous text
          expect(previousTexts).not.to.include(trimmedText);
          previousTexts.push(trimmedText);

          if (reloadsLeft > 1) {
            checkTextChange(reloadsLeft - 1);
          }
        });
    }

    checkTextChange(reloadCount);
  });
});
