import React, { useEffect, useState } from "react";
import { GroceryItemContext, GroceryInputContext } from './context/context'
import { v4 as uuidv4 } from 'uuid';

import GroceryItem from './GroceryItem'
import GroceryInput from './GroceryInput'

import "./App.css";

let todoObj = [
  {
    id: uuidv4(),
    grocery: "milk",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    grocery: "coffee",
    isCompleted: false,
  },
]

function App() {
  const [groceryArray, setGroceryArray] = useState(todoObj)

  function addGrocery(grocery) {
    let newAddedGroceryArray = [
      ...groceryArray,
      {
        id: uuidv4(),
        grocery,
        isCompleted: false,
      }
    ]
    setGroceryArray(newAddedGroceryArray)
  }

  function deleteGrocery(id) {
    let newDeletedGroceryArray = groceryArray.filter((item) => {
      if(item.id !== id) {
        return item
    }
    })
    setGroceryArray(newDeletedGroceryArray)
  }

  function doneGrocery(id) {
    console.log("done button checker")
    let newDoneArray = groceryArray.map((item) => {
      if(item.id === id) {
        item.isCompleted = !item.isCompleted
      }
      return item
  })
  setGroceryArray(newDoneArray)
}

  function showGroceryInput() {
    return <GroceryInputContext.Provider value={{addGrocery}}>
      <GroceryInput />
    </GroceryInputContext.Provider>

  }

  function showGrocery() {
    return groceryArray.map((item) => {
      return (
        <GroceryItemContext.Provider key={item.id} value={{ 
          groceryItem: item, deleteGrocery, doneGrocery
          }}
        >
          <GroceryItem />
        </GroceryItemContext.Provider>
      )

    }) 
  }

  return (
    <div className="App">
      {showGroceryInput()}
      {showGrocery()}
    </div>
  );
}
export default App;