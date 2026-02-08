import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";

import { Layout } from "./Layout";
import dataProvider from "./dataProvider";

import { PostEdit } from "./PostEdit";
import PostList from "./PostList";
import PostCreate from "./PostCreate";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource
      name="Posts"
      list={PostList}
      edit={PostEdit}
      show={PostList}
      create={PostCreate}
    />
  </Admin>
);
