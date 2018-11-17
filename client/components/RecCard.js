import styled from 'styled-components';

const Wrapper = styled.div`
	margin-right: 20px;
	max-width: 220px;
	border: 1px solid lightgray;
	border-radius: 5px;
	padding: 10px;
	position: relative;

	img {
		width: 200px;
		max-height: 250px;
		overflow: hidden;
	}
`;

const Circle = styled.div`
	border-radius: 50%;
	border: 1px solid black;
  width: 30px;
  background-color: white;
  height: 30px;
  position absolute;
  right: -5px;
  bottom: -5px;
`;

const RecCard = ({ rec }) => (
	<Wrapper>
		<img src='http://www.gstatic.com/tv/thumb/tvbanners/15655830/p15655830_b_v8_aa.jpg' />
		<h3>{rec.title}</h3>
		<p>{rec.description}</p>
		<Circle />
	</Wrapper>
);

export default RecCard;
