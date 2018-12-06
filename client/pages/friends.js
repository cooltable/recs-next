import FriendSearch from '../components/FriendsSearch';
import Friends from '../components/Friends';

const FriendsPage = () => (
	<div style={{ display: 'flex', justifyContent: 'space-around' }}>
		<FriendSearch />
		<Friends />
	</div>
);

export default FriendsPage;
