import React from 'react'

export function UseState(props) {
  const [error, setError] = React.useState(true);
  return (
    <div className='p-5 border rounded-lg m-5'>
      <h2 className='font-bold'> Eliminar {props.name} </h2>
      <p className='p-5'>Por favor, escribe el código de seguridad</p>

      {error && ( <p className='text-red-600'> Error: el código es incorrecto </p>) }

      <input 
        className='m-5 p-4 border border-black rounded-lg h-4'
        placeholder='Código de seguridad.' />
      <button
        className='bg-green-500 text-white w-32 h-10 rounded-lg'
        onClick={()=> setError(!error)}> Comprobar</button>
    </div>
  )
}