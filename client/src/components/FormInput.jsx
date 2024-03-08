
export const FormInput = ({label, name, type, defaultValue, size}) => {

    return (
        <div className= 'form-control'>
            <label className= 'label'>
                <span className= 'label-text capitalize'>
                    {label}
                </span>
            </label>
            <input
            type={type}
            name={name}
            className= {`input input-bordered ${size}`}
            required
            />
        </div>
    )
}