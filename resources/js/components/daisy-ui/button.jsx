import Spinner from './spinner'

export default function Button(props) {
    const { type } = props

    const types = {
        default: '',
        neutral: 'btn-neutral',
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        accent: 'btn-accent',
        ghost: 'btn-ghost',
        link: 'btn-link',
        //
        info: 'btn-info',
        error: 'btn-error',
        success: 'btn-success',
        warning: 'btn-warning',

        //
        only: '',
    }

    return (
        <button
            type="button"
            disabled={props.disabled || props.processing || false}
            onClick={props.onClick}
            className={`btn ${!type ? types.default : types[type]} ${
                props.className ? props.className : ''
            }`}
        >
            {props.processing ? (
                <>
                    <Spinner />
                    Cargando...
                </>
            ) : (
                props.children
            )}
        </button>
    )
}
