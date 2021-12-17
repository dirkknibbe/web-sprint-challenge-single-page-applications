//  test that you can add text to the box
//  test that you can select multiple toppings
//  test that you can submit the form

describe('Quotes App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/pizza')
    })


    // helpers to grab elems
    const nameInput = () => cy.get('input[name=name]');
    const pineappleBox = () => cy.get('input[name=pineapple]');
    const beefSausageBox = () => cy.get('input[name=beefsausage]');
    const anchoviesBox = () => cy.get('input[name=anchovies]');
    const mushroomsBox = () => cy.get('input[name=mushrooms]')
    const submitBtn = () => cy.get('button');

    it('the proper elements are showing', () => {
        nameInput().should('exist');
       
    })
    describe('can select multiple toppings', () => {
        it('multiple toppings?', () => {
          pineappleBox().click()
          beefSausageBox().click()
          anchoviesBox().click()
          mushroomsBox().click()  
        }) 
        
       

        it('can type in the input', () => {
            nameInput()
            .should('have.value', '')
            .type('Jeremiah')
            .should('have.value', 'Jeremiah')

            
        })

        it('the submit button pushes data', () => {
            nameInput().type('Jeremiah');
            
            submitBtn().click()
            submitBtn().should(console.log())
        })
        
    })
 }) 