import styled from "styled-components";
import RecCard from "./RecCard";

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
const recs = [
  {
    id: 1,
    title: "Grizzly Man",
    comment: "best eva",
    description:
      "Pieced together from Timothy Treadwells actual video footage, Werner Herzogs remarkable documentary examines the calling that drove Treadwell to live among a tribe of wild grizzly bears on an Alaskan reserve. A devoted conservationist with a passion for adventure, Timothy believed he had bridged the gap between human and beast. When one of the bears he loved and protected tragically turns on him, the footage he shot serves as a window into our understanding of nature and its grim realities.",
    status: "NEW",
    img: "http://www.gstatic.com/tv/thumb/v22vodart/87006/p87006_v_v8_aa.jpg",
    from: "Lauren",
  },
  {
    id: 2,
    title: "Bachelor in Paradise",
    comment: "best eva",
    description:
      'Former "The Bachelor" and "The Bachelorette" cast members -- both fan-favorites and characters who caused controversy -- try to leave their wounded hearts behind as they take another shot at finding love. After traveling to a secluded paradise in Mexico, the cast members explore new relationships and see if summer flings will turn into something more -- or if their hearts will be shattered yet again. The pursuit of a potential happily-ever-after is sure to include shocking twists, unexpected guests, unlikely pairings and other surprises.',
    status: "SEEN",
    img:
      "http://www.gstatic.com/tv/thumb/tvbanners/15655830/p15655830_b_v8_aa.jpg",
    from: "Lauren",
  },
  {
    id: 3,
    title: "Dark Knight",
    comment: "best eva",
    description:
      "With the help of allies Lt. Jim Gordon (Gary Oldman) and DA Harvey Dent (Aaron Eckhart), Batman (Christian Bale) has been able to keep a tight lid on crime in Gotham City. But when a vile young criminal calling himself the Joker (Heath Ledger) suddenly throws the town into chaos, the caped Crusader begins to tread a fine line between heroism and vigilantism.",
    status: "BOOKMARKED",
    img: "http://www.gstatic.com/tv/thumb/v22vodart/173378/p173378_v_v8_at.jpg",
    from: "Ash",
  },
  {
    id: 4,
    title: "Spirited Away",
    comment: "best eva",
    description:
      "In this animated feature by noted Japanese director Hayao Miyazaki, 10-year-old Chihiro (Rumi Hiiragi) and her parents (Takashi Naitô, Yasuko Sawaguchi) stumble upon a seemingly abandoned amusement park. After her mother and father are turned into giant pigs, Chihiro meets the mysterious Haku (Miyu Irino), who explains that the park is a resort for supernatural beings who need a break from their time spent in the earthly realm, and that she must work there to free herself and her parents.",
    status: "BOOKMARKED",
    img: "http://www.gstatic.com/tv/thumb/v22vodart/30673/p30673_v_v8_ae.jpg",
    from: "Liz Baker",
  },
];

const RecCategory = () => (
  <Wrapper>
    <h3>Movies</h3>
    <RecWrapper>
      {recs.map(rec => (
        <RecCard rec={rec} />
      ))}
    </RecWrapper>
  </Wrapper>
);

export default RecCategory;
