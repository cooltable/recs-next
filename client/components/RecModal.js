import Link from 'next/link';
import styled from 'styled-components';

const ModalWrapper = styled.div`
	position: fixed;
	display: flex;
	overflow-y: auto;
	overflow-x: hidden;
	justify-content: center;
	align-items: flex-start;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.4);
	cursor: default;
	z-index: 1000;
`;

const ModalContent = styled.section`
	position: relative;
	overflow: hidden;
	display: block;
	margin: 100px 0 80px;
	width: 768px;
	text-align: left;
	background-color: #eaecee;
	border-radius: 3px;
	padding: 6px 6px 16px 16px;
	display: flex;
	img {
		width: 50%;
		height: 500px;
	}
`;

const Content = styled.div`
	padding: 10px;
	p {
		text-transform: none;
	}
`;

const Close = styled.button`
	width: 10px;
	float: right;
	cursor: pointer;
	color: white;
	height: 23px;
	fill: white;
`;
const RecModal = ({ rec, handleClose }) => (
	<ModalWrapper>
		<ModalContent>
			<img src={rec.image} />
			<Content>
				<h1>{rec.title}</h1>
				<p>{rec.description}</p>
			</Content>
			<Close onClick={handleClose}>X</Close>
		</ModalContent>
	</ModalWrapper>
);

export default RecModal;
