/// <reference types="cypress" />

//import de biblioteca chance 

let Chance = require('chance');
let chance = new Chance();


context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
        //   rotas
        //GET (aborted) /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        //POST (aborted) /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        //POST (aborted) /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        

        cy.server();
        
        cy.route('GET', '**//api/1/databases/userdetails/collections/newtable?**')
            .as('getNewtable');

        cy.route('POST', '**//api/1/databases/userdetails/collections/newtable?**')
            .as('postNewtable');

        cy.route('POST', '**//api/1/databases/userdetails/collections/usertable?**')
            .as('postUsertable');


        // baseUrl + Register.html
        cy.visit('Register.html');

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
        
        // click
        cy.get('button#submitbtn').click();

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
});

//elementos 
//input[placeholder="First Name"] -- Preencher Nome 
//input[ng-model^=Last] -- Preencher sobrenome
//input[ng-model^=Email] -- Preencher email
//input[ng-model^=Phone] -- Preencher telefone 
//input[value=FeMale] -- selecionar lista "gênero"
//input[type=checkbox]-- assinalar checkbox
//select#Skills -- selecionar compotência 
//select#Country -- selecionar
//select#countries -- selecionar pais
//select#yearbox -- selecionar ano de nasc
//select[ng-model^=month] -- selecionar mês 
//select#daybox -- dia 
//input#firstpassword -- inserir senha
//input#secondpassword -- confirmação de senha
//input#imagesrc -- Uploand de photo