import User from '../queries/User';

const Friends = () => (
	<User>
		{({ data }) => {
			if (!data.me.friends.length) return <div>Ewps u don have friends</div>;
			return data.me.friends.map(friend => <li>{friend.username}</li>);
		}}
	</User>
);

export default Friends;
