import React from 'react';
import { Create, SimpleForm, TextInput, Toolbar, SaveButton } from 'react-admin';
import { useNavigate } from 'react-router-dom';

// Custom Toolbar with Cancel Button
const PostCreateToolbar = () => {
  const navigate = useNavigate();

  // Function to handle cancel action
  const handleCancel = () => {
    navigate('/posts');  // Navigate back to the list page (assuming '/posts' is the list path)
  };

  return (
    <Toolbar>
      <SaveButton />
      <button
        type="button"
        onClick={handleCancel}
        style={{
          marginLeft: '900px',  // Add some space between the buttons
          padding: '6px 16px', // Make the Cancel button size the same as the Save button
          fontSize: '20px',     // Ensure font size is similar to the Save button
          backgroundColor: 'blue', // Light background color
          border: '1px solid blue', // Border like the Save button
          borderRadius: '4px', // Rounded corners
          cursor: 'pointer', // Pointer cursor on hover
        }}
      >
        Cancel
      </button>
    </Toolbar>
  );
};

const PostCreate: React.FC = () => (
  <Create>
    <SimpleForm toolbar={<PostCreateToolbar />}>
      <TextInput source="id" />
      <TextInput source="title" />
      <TextInput source="views" />
    </SimpleForm>
  </Create>
);

export default PostCreate;
