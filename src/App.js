import React, { useState, useEffect } from 'react';
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
const initialDisabled = true



export default function App() {


  
  //////////////// STATES ////////////////
  //////////////// STATES ////////////////
  //////////////// STATES ////////////////
  const [pizzaOrders, setPizzaOrders] = useState(initialPizza)          
  const [formValues, setFormValues] = useState(initialFormValues) 
  const [formErrors, setFormErrors] = useState(initialFormErrors) 
  const [disabled, setDisabled] = useState(initialDisabled)       

  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  const getOrders = () => {

    axios.get('http://buddies.com/api/friends')
      .then(resp => {
          setPizzaOrders(resp.data)
      }).catch(err => console.error(err))
  }

  const postNewOrder = newOrder => {
    
    axios.post('http://buddies.com/api/friends', newOrder)
      .then(resp => {
          setPizzaOrders([ resp.data, ...pizzaOrders ]);
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
    // 🔥 STEP 10- RUN VALIDATION WITH YUP
    validate(name, value);
    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const formSubmit = () => {
    const newOrder = {
      name: formValues.name.trim(),
      special: formValues.special,
    
      toppings: ['pineapple', 'beef sausage', 'anchovies', 'mushrooms'].filter(topping => !!formValues[topping])
    }
    // 🔥 STEP 8- POST NEW FRIEND USING HELPER
    postNewOrder(newOrder);
  }

  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  //////////////// SIDE EFFECTS ////////////////
  useEffect(() => {
    getOrders()
  }, [])

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])



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
            disabled={disabled}
        
          />
         </Switch>
      </div>
    </>
  );
};

