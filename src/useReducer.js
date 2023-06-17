import React from 'react'

const SECURITY_CODE = 'paradigma'

export function UseReducer(props) {
    const [state, dispatch] = React.useReducer(reducer, initialState);

    const onConfirm = () => dispatch({ type: actionTypes.confirm })
    const onError = () => dispatch({ type: actionTypes.error })
    const onLoad = () => dispatch({ type: actionTypes.load })
    const onDelete = () => dispatch({ type: actionTypes.delete })
    const onReset = () => dispatch({ type: actionTypes.reset })

    const onWrite = ({ target: { value } }) => {
        dispatch({ type: actionTypes.write, payload: value })
    }

    React.useEffect(() => {
        if (!!state.loading) {
            setTimeout(() => {
                if (state.value === SECURITY_CODE) {
                    onConfirm()
                } else {
                    onError()
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
                    onChange={onWrite} />
                <button
                    className='bg-green-500 text-white w-32 h-10 rounded-lg'
                    onClick={onLoad}> Comprobar</button>
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
                            onClick={onDelete}>Si, eliminar</button>

                        <button
                            className='bg-green-500 text-white w-40 m-4 h-10 rounded-lg'
                            onClick={onReset}
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
                    onClick={onReset}
                >Resetear, volver atrás</button>
                {console.log(state)}
            </>
        )
    }
}

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    write: 'WRITE',
    load: 'LOAD',
    delete: 'DELETE',
    reset: 'RESET'
}

const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.load]: {
        ...state,
        loading: !state.loading,
        error: false
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: ''
    },
    [actionTypes.write]: {
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
