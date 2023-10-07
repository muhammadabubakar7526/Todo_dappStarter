import React, { useState } from 'react'

function StateArray() {
 const [fruits, setFruits] = useState([])
 const [currentFruit, setCurrentFruit] = useState('')
 const [editedFruit, setEditedFruit] = useState('')
 const [editedIndex, setEditedIndex] = useState(-1)

 function updateCurrentFruit(text) {
  setCurrentFruit(text)
 }

 function addFruitToArray() {
  const newFruits = [...fruits, currentFruit]
  setFruits(newFruits)
  setCurrentFruit('')
 }

 function DelFruitToArray(index) {
  const newFruits = [...fruits.slice(0, index), ...fruits.slice(index + 1)]
  setFruits(newFruits)
  setCurrentFruit('')
  setEditedIndex(-1) // Clear edited index when deleting
 }

 function EditFruitToArray(index, editedValue) {
  const newFruits = [...fruits]
  newFruits[index] = editedValue
  setFruits(newFruits)
  setCurrentFruit('')
  setEditedIndex(-1) // Clear edited index when saving
 }

 return (
  <div className="mx-auto mt-[200px] w-full max-w-md rounded-lg border border-gray-300 bg-white p-4 shadow-lg">
   <div className="mb-4">
    <input
     type="text"
     value={currentFruit}
     onChange={e => updateCurrentFruit(e.target.value)}
     className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
     placeholder="Enter Fruit Name"
    />
   </div>
   <div className="mb-4">
    <button
     onClick={addFruitToArray}
     className="w-full rounded-lg bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
     Add Fruit
    </button>
   </div>

   <ul>
    {fruits.map((fruit, index) => (
     <li
      key={index}
      className="mb-2 flex items-center justify-between text-gray-700"
     >
      <span>
       {index + 1}. {fruit}
      </span>
      <div className="flex gap-2">
       <button
        onClick={() => DelFruitToArray(index)}
        className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-red-500 p-2 text-white hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
       >
        &#10005; {/* Cross symbol */}
       </button>
       <button
        onClick={() => {
         setEditedIndex(index)
         setEditedFruit(fruit)
        }}
        className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600 focus:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
       >
        Edit
       </button>
      </div>
     </li>
    ))}
   </ul>

   {editedIndex !== -1 && (
    <div>
     <input
      type="text"
      value={editedFruit}
      onChange={e => setEditedFruit(e.target.value)}
      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Edit Fruit Name"
     />
     <button
      onClick={() => {
       EditFruitToArray(editedIndex, editedFruit)
       setEditedIndex(-1) // Clear edited index when saving
      }}
      className="mt-2 w-full rounded-lg bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-600 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
     >
      Save
     </button>
    </div>
   )}
  </div>
 )
}

export default StateArray
