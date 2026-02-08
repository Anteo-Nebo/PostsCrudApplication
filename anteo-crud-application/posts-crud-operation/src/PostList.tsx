import React from 'react';
import { List, Datagrid, TextField, EditButton, DeleteButton } from 'react-admin';

const PostList: React.FC = () => (
  <List>
    <Datagrid>
      <TextField source="id"/>
      <TextField source="title" />
      <TextField source="views" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);

export default PostList;
