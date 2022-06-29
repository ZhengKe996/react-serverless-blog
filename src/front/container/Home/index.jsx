import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";

import { parseJsonByString } from "../../../utils";
import service from "../../../service";
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
    service.get("/api/schema/getLatestOne").then((res) => {
      const { data = null } = res;
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
