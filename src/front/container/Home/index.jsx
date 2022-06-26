import Banner from "./component/Banner";
import Footer from "./component/Footer";
import Notes from "./component/Notes";
import { parseJsonByString } from "../../../utils";
const schema = parseJsonByString(window.localStorage.schema, {});
const listData = schema?.children?.splice(3) || [];
const Home = () => {
  return (
    <div>
      <Banner />
      <Notes />
      <Footer />
      {listData.map((item, index) => {
        return (
          <div key={index} className="wrapper">
            area
          </div>
        );
      })}
    </div>
  );
};
export default Home;
