import styled from 'styled-components'

export const ContactFormContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
`

export const ContactFormForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 40%;
	padding: 3rem;
	background: grey;

	.checkbox {
		margin: 1.5rem;
	}

	input[type='submit'] {
		padding: 0.4rem;
		border-radius: 10px;
		border: none;
		transform: translateY(0);
		transition: transform 0.1s;

		&:active {
			transform: translateY(1px);
		}
	}
`

export const FormInstructions = styled.p`
	width: 80%;
	margin-bottom: 1rem;
`

export const Row = styled.div`
	text-align: right;
	width: 100%;
	display: grid;
	grid-template-columns: 5fr 5.5fr;
	justify-content: center;
	align-content: center;
	justify-items: center;

	textarea,
	input {
		font-family: inherit;
		border-radius: 0.3rem;
	}

	&:not(:last-child) {
		margin-bottom: 10px;
	}

	// label
	& > :first-child {
		justify-self: end;
		margin-right: 2rem;
	}

	// input
	& > :last-child {
		justify-self: start;
		width: 55%;
		min-width: 23rem;
		font-size: 1.4rem;
		margin: 0;
		padding: 0.7rem 0.7rem;
		color: black;
	}
`

export const ErrorBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background: royalblue;
	color: black;
	padding: 0.3rem;
	margin-bottom: 1rem;
	border-radius: 10px;
	max-width: 70%;
`
