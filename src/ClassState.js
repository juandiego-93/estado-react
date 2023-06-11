import React from 'react'

export class ClassState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: true
  }

  }
  render() {
    return (
      <div className='p-5 border rounded-lg m-5'>
        <h2 className='font-bold'> Eliminar {this.props.name} </h2>
        <p className='p-5'>Por favor, escribe el código de seguridad</p>
        {this.state.error && (<p className='text-red-600'>Error: el código es incorrecto</p>)}
        <input 
          className='m-5 p-4 border border-black rounded-lg h-4'
          placeholder='Código de seguridad.' />
        <button
        className='bg-green-500 text-white w-32 h-10 rounded-lg'
          onClick={()=> this.setState({error: !this.state.error})}
        > Comprobar</button>
      </div>
    )
  }
}