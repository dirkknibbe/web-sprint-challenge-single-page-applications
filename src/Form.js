import React from 'react'
import { Route, Switch } from 'react-router-dom'

export default function Form(props) {
  const {
    values,
    submit,
    change,
    errors,
  } = props

  const onSubmit = evt => {
    evt.preventDefault()
    submit()
  }

  const onChange = evt => {
    const { name, value, checked, type } = evt.target
    const valueToUse = type === 'checkbox' ? checked : value;
    change(name, valueToUse)
  }
  

  return (
<Switch>
    <Route path='/pizza'>
        <form id='pizza-form' onSubmit={onSubmit}>
        <div className='errors'>
          <div>{errors.name}</div>
        </div>
        
            <label > Fill out the Order Form
              <label>Name
               {/* <div>{errors.name}</div> */}
              <input
                id='name-input'
                value={values.name}
                onChange={onChange}
                name='name'
                type='text'
                
              />
              </label>
              <label id='size-dropdown'>Size of Za?
              <select
                onChange={onChange}
                value={values.size}
                name='size'
              >
                <option value=''>- Select a Size -</option>
                <option value='Small'>Small</option>
                <option value='Medium'>Medium</option>
                <option value='Large'>Large</option>
              </select>
              </label>
              
               <label >Pineapple
                <input
                  type='checkbox'
                  name='pineapple'
                  checked={values.pineapple}
                  onChange={onChange}
                />
                </label>

                <label>Beef Sausage
                <input
                  type='checkbox'
                  name='beefsausage'
                  checked={values.beefsausage}
                  onChange={onChange}
                />
                </label>

                <label>Anchovies
                <input
                  type='checkbox'
                  name='anchovies'
                  checked={values.anchovies}
                  onChange={onChange}
                />

                <label>Mushrooms
                <input
                  type='checkbox'
                  name='mushrooms'
                  checked={values.mushrooms}
                  onChange={onChange}
                />
              {/* <input id='special-text' type='text'>Special Instructions?</input> */}
              <label>Special Instructions?
              <input
                id='special-text'
                value={values.special}
                onChange={onChange}
                name='special'
                type='text'
                
              />
              <div  className='submit'><button  id='order-button' type='submit' onSubmit={onSubmit}>Add to Order</button></div>
              
              </label>
              
              </label>
              

              </label>
              </label>
            
          </form>
        </Route>
      </Switch>
  )
}
