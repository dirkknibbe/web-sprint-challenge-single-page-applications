import React, { useState } from 'react';
import { Link, Route, Switch } from 'react-router-dom'

import axios from 'axios';

import Form from './Form'
import schema from './formSchema.js';

import * as yup from 'yup';


//////////////// INITIAL STATES ////////////////
//////////////// INITIAL STATES ////////////////
//////////////// INITIAL STATES ////////////////
const initialFormValues = {
  ///// TEXT INPUTS /////
  name: '',
  special: '',
  ///// DROPDOWN /////
  size: '',
  ///// CHECKBOXES /////
  pineapple: false,
  beefsausage: false,
  anchovies: false,
  mushrooms: false,
}
const initialFormErrors = {
  name: '',
  special: '',
  size: '',
  
}
const initialPizza = []




export default function App() {


  
  //////////////// STATES ////////////////
  //////////////// STATES ////////////////
  //////////////// STATES ////////////////
  const [pizzaOrders, setPizzaOrders] = useState(initialPizza)          
  const [formValues, setFormValues] = useState(initialFormValues) 
  const [formErrors, setFormErrors] = useState(initialFormErrors) 
        

  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////

  const postNewOrder = newOrder => {
    
    axios.post('https://reqres.in/api/orders', newOrder)
      .then(resp => {
        console.log(resp)
          
      }).catch( err => console.error(err))
        .finally(() => setFormValues(initialFormValues))
  }


  const validate = (name, value) => {
    yup.reach(schema, name)
      .validate(value)
      .then(() => setFormErrors({ ...formErrors, [name]: '' }))
      .catch(err => setFormErrors({ ...formErrors, [name]: err.errors[0] }))
  }

  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
  const inputChange = (name, value) => {
 
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value 
    })
  }

  const formSubmit = () => {
    const newOrder = {
      name: formValues.name.trim(),
      special: formValues.special,
    
      toppings: ['pineapple', 'beef sausage', 'anchovies', 'mushrooms'].filter(topping => !!formValues[topping])
    }
  
    postNewOrder(newOrder);
  }

  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  
  return (
    <>
      <nav>
        <h1>Lambda Eats</h1>
        <div>
        <Link to='/'>Home</Link>
        </div>
      </nav>
      <div>
      <Switch>
        <Route exact path='/'>
          <form id='order-pizza' >
            <label> Get you a pie?
              
               <Link to='/pizza'>Don't make Zzz's make ZZa's!</Link>
            
            </label>
          </form>
        
         </Route>
          <Form 
            values={formValues}
            change={inputChange}
            submit={formSubmit}
            errors={formErrors}
          />
          
         </Switch>
      </div>
    </>
  );
};

