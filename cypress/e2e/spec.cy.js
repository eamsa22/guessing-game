describe('Guessing Game Application Tests', () => {
     beforeEach(() => {
     cy.visit("http://localhost:4000");
     });

     it('should load the application', () => {
     // Check if the application loads successfully
     cy.get('h1').should('contain', 'Guessing game');
     });

     it('should prompt the user to enter a word when clicking "Démarrer une partie', () => {
          cy.get("#button-start-game").click();
          cy.contains("Saisir le mot !");
          cy.get("#game-keyboard").should("exist");
          cy.get("#case0").should("exist");
          cy.get("#case1").should("exist");
          cy.get("#case2").should("exist");
          cy.get("#case3").should("exist");
          cy.get("#case4").should("exist");
     });

     it('Vérifiez que lorsque vous saisissez “zzzzz”, vous avez le message d’erreur "le mot saisi n est pas dans la liste"” qui apparaît', () => {
          cy.get("#button-start-game").click();
          cy.get("#game-keyboard").get("#toucheZ").click();
          cy.get("#game-keyboard").get("#toucheZ").click();
          cy.get("#game-keyboard").get("#toucheZ").click();
          cy.get("#game-keyboard").get("#toucheZ").click();
          cy.get("#game-keyboard").get("#toucheZ").click();
          cy.get("#game-keyboard").get("#button-valider").click();
          cy.contains("le mot saisi n'est pas dans la liste");
     });
     it('Vérifiez que lorsque vous saisissez le mot ”jante”, celui-ci est bien accepté', () => {
          cy.get("#button-start-game").click();
          cy.get("#game-keyboard").get("#toucheJ").click();
          cy.get("#game-keyboard").get("#toucheA").click();
          cy.get("#game-keyboard").get("#toucheN").click();
          cy.get("#game-keyboard").get("#toucheT").click();
          cy.get("#game-keyboard").get("#toucheE").click();
          cy.get("#game-keyboard").get("#button-valider").click();
          cy.get("#mesage-erreur").should('not.contain',"le mot saisi n'est pas dans la liste");
     });

     it('Vérifiez que lorsque vous appuyez sur le bouton “abandonner la partie”, vous arrivez bien sur une page de défaite', () => {
          cy.get("#button-start-game").click();
          cy.get("#button-abandonner").click();
          cy.contains("Oups , partie perdue !");
     });
     it('Lorsque vous accédez aux statistiques, vérifiez bien que vous avez la page des statistiques qui s’affiche', () => {
          cy.get("#button-start-game").click();
          cy.get("#button-abandonner").click();
          cy.contains("Oups , partie perdue !");
          cy.get("#result-retour-acceuil").click();
          cy.get("#button-stat").click();
          cy.contains("Page Statistiques");
     });
});