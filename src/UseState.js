import React from 'react'

const SECURITY_CODE = 'paradigma'

export function UseState(props) {

  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false
  })

  // const [value, setValue] = React.useState('');
  // const [error, setError] = React.useState(false);
  // const [loading, setLoading] = React.useState(false);

  const onConfirm = () => {
    setState({
      ...state,
      error: false,
      loading: false,
      confirmed: true
    })
  }
  const onError = () => {
    setState({ ...state, error: true, loading: false });
  }

  const onWrite = (newValue) => {
    setState({ value: newValue })
  }


  function load() {
    setState({
      ...state,
      loading: !state.loading,
      error: false
    })
  }

  function onDelete() {
    setState({
      ...state,
      deleted: true
    })
  }

  function onReset() {
    setState({
      ...state,
      confirmed: false,
      deleted: false,
      value: ''
    })
  }
  React.useEffect(() => {

    // console.log('Empezando el efecto')
    if (!!state.loading) {
      setTimeout(() => {
        // console.log('Haciendo la validación')
        if (state.value === SECURITY_CODE) {
          onConfirm()
        } else {
          onError()
        }
        // console.log('terminando la validación')
      }, 1500)
    }
    // console.log('Terminando el efecto')
  }, [onConfirm, onError, state.value, state.loading])

  if (!state.deleted && !state.confirmed) {
    return (
      <div className='p-5 border rounded-lg m-5'>
        <h2 className='font-bold'> Eliminar {props.name} </h2>
        <p className='p-5'>Por favor, escribe el código de seguridad</p>

        {(state.error && !state.loading) && (<p className='text-red-600'> Error: el código es incorrecto </p>)}
        {state.loading && (<p> Cargando... </p>)}

        <input
          className='m-5 p-4 border border-black rounded-lg h-4'
          placeholder='Código de seguridad.'
          value={state.value}
          onChange={(event) => {
            onWrite(event.target.value)
          }} />
        <button
          className='bg-green-500 text-white w-32 h-10 rounded-lg'
          onClick={() => load()}> Comprobar</button>
      </div>
    )
  } else if (state.confirmed && !state.deleted) {
    return (
      <>
        <div>
          <p>¿Seguro que quieres eliminar UseState?</p>
          <div className='flex items-center justify-center'>
            <button
              className='bg-green-500 text-white w-32 h-10 rounded-lg'
              onClick={() => {
                onDelete()
              }}>Si, eliminar</button>

            <button
              className='bg-green-500 text-white w-40 m-4 h-10 rounded-lg'
              onClick={() => {
                onReset()
              }}
            >Nop, me arrepentí</button>

          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <p>Eliminado con exito</p>

        <button
          className='bg-green-500 text-white w-40 m-4 h-10 rounded-lg'
          onClick={() => {
            onReset()
          }}
        >Resetear, volver atrás</button>
        {console.log(state)}
      </>
    )
  }
}