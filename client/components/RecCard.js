import styled from 'styled-components';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import RecModal from './RecModal';

const Wrapper = styled.div`
	margin-right: 20px;
	border: 1px solid lightgray;
	border-radius: 5px;
	position: relative;
	overflow: hidden;
	cursor: pointer;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.img-wrapper {
		position: relative;
		overflow: hidden;
		width: 270px;
		height: 410px;
	}

	.details {
		position: absolute;
		padding: 10px;
		width: 100%;
		bottom: 0;
		left: 0;
		color: #eee;
		background-color: rgba(0, 0, 0, 0.75);
		transition: all 0.3s;
		transform: translateY(100%);

		h3 {
			font-size: 2rem;
		}

		p {
			font-size: 1.2rem;
		}
	}

	&:hover {
		.details {
			transform: translateY(0);
		}
	}

	.sender {
		padding: 20px;
		display: flex;

		img {
			width: 30px;
			height: 30px;
			object-fit: cover;
			margin-right: 20px;
			border-radius: 50%;
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
		// const { pathname, query } = this.props.router;
		// console.log(typeof query.id, this.props.rec.id);
		// if (
		//   query.id !== prevProps.router.query.id &&
		//   query.id == this.props.rec.id
		// ) {
		//   console.log(this.props.rec);
		//   this.setState({ modal: true });
		// }
	}

	handleClose = e => {
		e.stopPropagation();
		this.setState({ modal: false });
		Router.push('/recs');
	};

	openModal = e => {
		e.stopPropagation();
		// Router.push({
		//   pathname: "/recs",
		//   query: { id: this.props.rec.id },
		// });
		this.setState({ modal: true });
	};

	render() {
		return (
			<React.Fragment>
				<Wrapper onClick={this.openModal} status={this.props.rec.status}>
					<div className='img-wrapper'>
						<img src={this.props.rec.image} />
						<div className='details'>
							<h3>{this.props.rec.title}</h3>
							<p>{this.props.rec.comment}</p>
						</div>
					</div>
					<div className='sender'>
						<img src='https://placekitten.com/500/500' alt='profile pic' />
						<p>{`${this.props.rec.fromUser.username}`}</p>
					</div>
				</Wrapper>

				{this.state.modal && (
					<RecModal rec={this.props.rec} handleClose={this.handleClose} />
				)}
			</React.Fragment>
		);
	}
}

export default withRouter(RecCard);
