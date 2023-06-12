import React from 'react'

const SECURITY_CODE = 'paradigma'

export function UseState(props) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(()=>{
    // console.log('Empezando el efecto')
    if (!!loading) {

      setTimeout(()=> {
        // console.log('Haciendo la validación')
        if (value !== SECURITY_CODE) {
          setError(true)
        }
          setLoading(false);
        // console.log('terminando la validación')
      },1500)
    }
    // console.log('Terminando el efecto')
  },[value, loading])

  function load(){
    setLoading(!loading)
    setError(false)
  }
  return (
    <div className='p-5 border rounded-lg m-5'>
      <h2 className='font-bold'> Eliminar {props.name} </h2>
      <p className='p-5'>Por favor, escribe el código de seguridad</p>

      {(error  && !loading) && ( <p className='text-red-600'> Error: el código es incorrecto </p>) }
      {loading && ( <p> Cargando... </p>) }

      <input 
        className='m-5 p-4 border border-black rounded-lg h-4'
        placeholder='Código de seguridad.' 
        value={value}
        onChange={(event)=>{
          setValue(event.target.value)
        }}/>
      <button
        className='bg-green-500 text-white w-32 h-10 rounded-lg'
        onClick={()=> load()}> Comprobar</button>
    </div>
  )
}