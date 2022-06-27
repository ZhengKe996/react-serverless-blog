import { parseJsonByString } from "../../../utils";
import Banner from "./component/Banner";
import Footer from "./component/Footer";
import Notes from "./component/Notes";
const pageSchema = parseJsonByString(window.localStorage.schema, {});
const children = pageSchema.children || [];

const map = {
  Banner,
  Footer,
  Notes,
};
const render = (item, index) => {
  const Component = map[item.name];
  return Component ? <Component key={index} schema={item} /> : null;
};

const Home = () => {
  return <div>{children.map((item, index) => render(item, index))}</div>;
};
export default Home;
