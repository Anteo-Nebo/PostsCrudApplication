import React from 'react';
import { Edit, SimpleForm, TextInput, EditProps } from 'react-admin';

export const PostEdit: React.FC<EditProps> = (props) => (
  <Edit {...props}>
    <SimpleForm warnWhenUnsavedChanges>
      <TextInput source="title" />
      <TextInput source="views" />
    </SimpleForm>
  </Edit>
);
