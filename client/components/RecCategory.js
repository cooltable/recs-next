import styled from 'styled-components';
import RecCard from './RecCard';

const Wrapper = styled.div`
	margin: 40px;

	text-align: left;
	text-transform: uppercase;

	h3 {
		color: ${props => props.theme.colorPrimaryDark};
		letter-spacing: 3px;
	}
`;

const RecWrapper = styled.div`
	display: flex;
	overflow: scroll;
	padding: 20px 0;
`;

const RecCategory = ({ type, recs }) => {
	return (
		<Wrapper>
			<h3>{type.replace('_', ' ')}s</h3>
			<RecWrapper>{recs.map(rec => <RecCard rec={rec} key={rec.id} />)}</RecWrapper>
		</Wrapper>
	);
};

export default RecCategory;
