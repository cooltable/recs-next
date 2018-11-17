import styled from 'styled-components';

const Wrapper = styled.div`
	margin-right: 20px;
	max-width: 220px;
	border: 1px solid lightgray;
	border-radius: 5px;
	padding: 10px;

	img {
		max-width: 200px;
	}
`;

const RecCard = ({ rec }) => (
	<Wrapper>
		<img src='http://www.gstatic.com/tv/thumb/tvbanners/15655830/p15655830_b_v8_aa.jpg' />
		<h3>{rec.title}</h3>
		<p>{rec.description}</p>
	</Wrapper>
);

export default RecCard;
