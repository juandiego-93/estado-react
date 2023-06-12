import React from 'react'
import { Loading } from './Loading'

const SECURITY_CODE = 'paradigma'

export class ClassState extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            error: false,
            loading: false
        }
    }
    // UNSAFE_componentWillMount() {
    //   console.log('componentWillMount')
    // }

    // componentDidMount() {
    //   console.log('componentDidMount')
    // }

    componentDidUpdate() {
        console.log('actualización');
        if (!!this.state.loading) {
            setTimeout(() => {
                // console.log('Haciendo la validación')
                if (SECURITY_CODE === this.state.value) {
                    this.setState({ error: false, loading: false });
                } else {
                    this.setState({ error: true, loading: false })
                }
                // console.log('terminando la validación')
            }, 2000)
        }
    }


    render() {


        return (
            <div className='p-5 border rounded-lg m-5'>
                <h2 className='font-bold'> Eliminar {this.props.name} </h2>
                <p className='p-5'>Por favor, escribe el código de seguridad</p>
                {(this.state.error && !this.state.loading) && (<p className='text-red-600'>Error: el código es incorrecto</p>)}
                {this.state.loading && (<Loading />)}
                <input
                    className='m-5 p-4 border border-black rounded-lg h-4'
                    placeholder='Código de seguridad.'
                    value={this.state.value}
                    onChange={(event) => {
                        this.setState({ value: event.target.value })
                    }} />
                <button
                    className='bg-green-500 text-white w-32 h-10 rounded-lg'
                    onClick={() => this.setState({ loading: !this.state.loading })}
                > Comprobar</button>
            </div>
        )
    }
}