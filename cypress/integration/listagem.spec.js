/// <reference types="cypress" />

context('Listagem', () => {
    it('Listagem sem registros', () => {
        cy.server()
        cy.route({
            method: 'GET',
            url: '**//api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fx:webtable-get-vazio' //retorna sem nenhum registro
        }).as('getNewtable');
        
        cy.visit('WebTable.html')

        cy.get('div[role=row]').should('have.length', 1);
    });
    it('Listagem com apenas um registro', () => { //comando only - priorizar o que rodar
        cy.server()
        cy.route({
            method: 'GET',
            url:'**//api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fx:webtable-get-unico'
           })
           
        cy.visit('WebTable.html');

        cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone');
        cy.get('@gridCellPhone').should('contain.text','1234567890' );
    });
});