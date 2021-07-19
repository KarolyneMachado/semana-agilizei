/// <reference types="cypress" />

//import de biblioteca chance 
let Chance = require('chance');
let chance = new Chance();

When(/^informar meus dados$/, () => {
	//type -- usandos dados aleatórios da biblioteca chance.js → ex chance.firts
    cy.get('input[placeholder="First Name"]').type(chance.first());
    cy.get('input[ng-model^=Last]').type(chance.last());
    cy.get('input[ng-model^=Email]').type(chance.email());
    cy.get('input[ng-model^=Phone]').type(chance.phone({formatted: false})); // função formatted - sem formatação

    //check → radio's e checkboxes
    cy.get('input[value=FeMale]').check();
    cy.get('input[type=checkbox]').check('Cricket');
    cy.get('input[type=checkbox]').check('Hockey');

    
    // select → select & select2 (combos)
    cy.get('select#Skills').select('Documentation');
    cy.get('select#countries').select('Brazil');
    cy.get('select#country').select('United States of America',{force: true}); //🚨 
    cy.get('select#yearbox').select('1997');
    cy.get('select[ng-model^=month]').select('June');
    cy.get('select#daybox').select('23');
    cy.get('input#firstpassword').type('Agilizei@2021');
    cy.get('input#secondpassword').type('Agilizei@2021');

    // attanchFile - input file
    cy.get('input#imagesrc').attachFile('Photodeperfil.jpg');
    
});

When(/^salvar$/, () => {
	// click
    cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
	cy.wait('@postNewtable').then((resNewtable) =>{
        //chai
        expect(resNewtable.status).to.eq(null)/*console.log(resNewtable.status) -- mapear os status cy.log(resNewtable.status)*/
    })

    //isersão para identificar retorno de sucesso
    cy.wait('@postUsertable').then((resUsertable)=>{
        expect(resUsertable.status).to.eq(null)
    });
    cy.wait('@getNewtable').then((resNewtable) =>{
        expect(resNewtable.status).to.eq(null)
    })

    cy.url().should('contain', 'Register') //Comando para validar teste se foi aprovado 
    
});

