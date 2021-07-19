// Steps/passos comuns a mais de uma feature -- acesso ao site 

Given(/^que acesso o site$/, () => {
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
});