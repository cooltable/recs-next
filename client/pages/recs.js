import RecCategory from '../components/RecCategory';
import RecsQuery from '../queries/Recs';
import _ from 'lodash';

const Recs = () => (
	<RecsQuery>
		{({ data: { myRecs } }) => {
			let recs = _.groupBy(myRecs, rec => rec.type);
			console.log(recs);
			return Object.keys(recs).map(key => (
				<RecCategory key={key} type={key} recs={recs[key]} />
			));
		}}
	</RecsQuery>
);

export default Recs;
