import Banner from "./component/Banner";
import Footer from "./component/Footer";
import Notes from "./component/Notes";
import { parseJsonByString } from "../../../utils";
const listData = parseJsonByString(window.localStorage.homeData, []);

const Home = () => {
  return (
    <div>
      <Banner />
      <Notes />
      <Footer />
      {listData.map((item, index) => {
        return <div className="wrapper">area</div>;
      })}
    </div>
  );
};
export default Home;
