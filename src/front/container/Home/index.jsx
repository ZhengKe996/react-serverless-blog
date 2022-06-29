import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { parseJsonByString } from "../../../utils";
import Banner from "./component/Banner";
import Footer from "./component/Footer";
import Notes from "./component/Notes";
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
  const [pageSchema, setPageSchema] = useState({});
  const { children = [], attributes = {} } = pageSchema;
  useEffect(() => {
    axios.get("/api/schema/getLatestOne").then((res) => {
      const data = res.data?.data;
      data && setPageSchema(parseJsonByString(data.schema, {}));
    });
  }, []);
  return (
    <div>
      <Helmet>
        <title>{attributes?.title || "Hello"}</title>
      </Helmet>
      {children.map((item, index) => render(item, index))}
    </div>
  );
};
export default Home;
