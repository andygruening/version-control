interface InputLabelProps {
    label: string;
    value: string;
    placeholder: string;
    onChange(value: string): void;
}

function InputLabel(props: InputLabelProps) {
    return (
        <div className={'layout horizontal stretch gap flex-grow'} style={{alignItems: 'center', gap: 10}}>
            <p>{props.label}</p>
            <input value={props.value}
                   placeholder={props.placeholder}
                   onChange={(e) => {
                       props.onChange(e.target.value)
                   }}
            />
        </div>
    )
}

export default InputLabel;