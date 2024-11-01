// eslint-disable-next-line react/prop-types
const FormCheckbox = ({ label, name, defaultValue, size }) => {
	return (
		<div className="form-control items-center">
			<label htmlFor={name} className="label cursor-pointer">
				<span className="label-text capitalize">{label}</span>
			</label>
			<input
				type="checkbox"
				name={name}
				defaultChecked={defaultValue}
				className={`checkbox checkbox-primary ${size}`}
				value={true}
			/>
		</div>
	);
};
export default FormCheckbox;
