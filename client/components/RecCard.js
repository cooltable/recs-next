import styled from 'styled-components';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import RecModal from './RecModal';

const Wrapper = styled.div`
	margin-right: 20px;
	width: 220px;
	border: ${props =>
		props.status === 'NEW' ? '1px solid' + props.theme.colorSecondary : '1px solid lightgray'};
	border-radius: 5px;
	padding: 10px;
	position: relative;

	img {
		width: 200px;
		max-height: 250px;
		overflow: hidden;
	}

	&:hover {
		width: 280px;
		cursor: pointer;
		img {
			width: 260px;
			max-height: 300px;
		}
	}
`;

const Circle = styled.div`
	border-radius: 50%;
	border: 1px solid black;
	width: 30px;
	background-color: white;
	height: 30px;
	position: absolute;
	right: -5px;
	bottom: -5px;
`;

class RecCard extends React.Component {
	state = {
		modal: false,
	};
	componentDidUpdate(prevProps) {
		const { pathname, query } = this.props.router;
		console.log(typeof query.id, this.props.rec.id);
		if (query.id !== prevProps.router.query.id && query.id == this.props.rec.id) {
			console.log(this.props.rec);
			this.setState({ modal: true });
		}
	}

	handleClose = e => {
		e.stopPropagation();
		this.setState({ modal: false });
		Router.push('/recs');
	};

	openModal = e => {
		e.stopPropagation();
		Router.push({
			pathname: '/recs',
			query: { id: this.props.rec.id },
		});
	};

	render() {
		return (
			<React.Fragment>
				<Wrapper onClick={this.openModal} status={this.props.rec.status}>
					<img src={this.props.rec.img} />
					<h3>{this.props.rec.title}</h3>
					<p>{this.props.rec.comment}</p>
					<p>{`From: ${this.props.rec.from}`}</p>
				</Wrapper>

				{this.state.modal && (
					<RecModal rec={this.props.rec} handleClose={this.handleClose} />
				)}
			</React.Fragment>
		);
	}
}

export default withRouter(RecCard);
