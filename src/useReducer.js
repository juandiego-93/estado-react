import React from 'react'

const SECURITY_CODE = 'paradigma'

export function UseReducer(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {
        if (!!state.loading) {
            setTimeout(() => {
                if (state.value === SECURITY_CODE) {
                    dispatch({ type: 'CONFIRM' })
                } else {
                    dispatch({ type: 'ERROR' })
                }
            }, 1500)
        }
    }, [state.value, state.loading])

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
                        dispatch({ type: 'WRITE', payload: event.target.value })
                    }} />
                <button
                    className='bg-green-500 text-white w-32 h-10 rounded-lg'
                    onClick={() => dispatch({ type: 'LOAD' })}> Comprobar</button>
            </div>
        )
    } else if (state.confirmed && !state.deleted) {
        return (
            <>
                <div>
                    <p>¿Seguro que quieres eliminar {props.name}?</p>
                    <div className='flex items-center justify-center'>
                        <button
                            className='bg-green-500 text-white w-32 h-10 rounded-lg'
                            onClick={() => {
                                dispatch({ type: 'DELETE' })
                            }}>Si, eliminar</button>

                        <button
                            className='bg-green-500 text-white w-40 m-4 h-10 rounded-lg'
                            onClick={() => {
                                dispatch({ type: 'RESET' })
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
                        dispatch({ type: 'RESET' })
                    }}
                >Resetear, volver atrás</button>
                {console.log(state)}
            </>
        )
    }
}

const initialState = {
    value: 'paradigma',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};
const reducerObject = (state, payload) => ({
    'CONFIRM': {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'LOAD': {
        ...state,
        loading: !state.loading,
        error: false
    },
    'DELETE': {
        ...state,
        deleted: true
    },
    'RESET': {
        ...state,
        confirmed: false,
        deleted: false,
        value: 'paradigma'
    },
    'WRITE': {
        ...state,
        value: payload
    }
});

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state, action.payload)[action.type];
    } else {
        return state;
    }
}

// const reducer = (state, action) => {
// };

// const reducerIf = (state, action) => {
//     if (action.type === 'ERROR') {
//         return {
//             ...state,
//             error: true,
//             loading: false
//         };
//     } else if (action.type === 'CHECK') {
//         return {
//             ...state,
//             loading: true,
//         };
//     } else {
//         return {
//             ...state,
//         };
//     }
// };

// const reducerSwitch = (state, action) => {
//     switch(action.type) {
//         case 'ERROR':
//             return {
//                 ...state,
//                 error:true,
//                 loading: false,
//             };
//         case 'CHECK':
//             return {
//                 ...state,
//                 loading: true,
//             };
//         default:
//             return{
//                 ...state,
//             };
//     }
// };
