import styled from 'styled-components';

const FormWrapper = styled.div`
	text-align: center;
	max-width: 550px;
	margin: 0 auto;

	h1 {
		margin: 30px 0;
		text-transform: uppercase;
		letter-spacing: 5px;
		color: ${props => props.theme.colorPrimary};
		font-weight: normal;
	}
`;

const InputWrapper = styled.div`
	position: relative;

	label {
		position: absolute;
		top: 10px;
		left: 10px;
		color: ${props => props.theme.colorPrimary};
		transform-origin: left;
		transition: all 0.4s;
		visibility: hidden;
		opacity: 0;
	}
`;
const Border = styled.span`
	&,
	&::after {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: darken(${props => props.theme.colorWhite}, 20%);
		border-radius: 30px;
	}

	&::after {
		content: '';
		background-color: ${props => props.theme.colorSecondary};
		transform: scaleX(0);
		transition: all 0.4s;
	}

	&::before {
		content: '→';
		position: absolute;
		top: -33px;
		left: -25px;
		/* width: 5px;
    height: 5px; */
		color: ${props => props.theme.colorSecondary};
		border-radius: 50%;
		font-size: 20px;
		/* background-color: $color-primary; */
		opacity: 0;
		/* transition: all 0.4s; */
	}
`;

const StyledInput = styled.input`
	padding: 10px;
	display: block;
	width: 100%;
	border-radius: 3px;
	font-size: inherit;
	font-family: inherit;
	color: inherit;
	border: none;

	&::placeholder {
		color: darken(${props => props.theme.colorWhite}, 25%);
	}

	&:not(:last-child) {
		margin-bottom: 30px;
	}

	&:focus {
		outline: none;

		${Border}::after {
			transform: scale(1);
		}

		${Border}::before {
			opacity: 1;
		}
	}

	&:not(:placeholder-shown) ~ label {
		opacity: 1;
		visibility: visible;
		transform: translateY(-25px) scale(0.8);
	}
`;

export const AuthForm = ({ title, handleSubmit, children }) => (
	<FormWrapper>
		<h1>{title}</h1>
		<form onSubmit={handleSubmit}>{children}</form>
	</FormWrapper>
);

export const AuthInput = ({ name, type, handleChange, value, label }) => (
	<InputWrapper>
		<StyledInput
			name={name}
			type={type}
			onChange={handleChange}
			value={value}
			placeholder={label}
		/>
		<label>{label}</label>
		<Border />
	</InputWrapper>
);

const ButtonWrapper = styled.button`
	border-radius: 3px;
	border: 1px solid ${props => props.theme.colorSecondary};
	padding: 5px 10px;
	margin: 5px 0;
	width: 100%;
	text-transform: uppercase;
	letter-spacing: 2px;
	color: ${props => props.theme.colorSecondary};
	cursor: pointer;
	font-size: 14px;
	font-family: inherit;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: transparent;

	&:hover,
	&:focus {
		background-color: ${props => props.theme.colorSecondary};
		color: white;
		outline: none;
	}
`;

export const AuthButton = () => <ButtonWrapper>Submit</ButtonWrapper>;
