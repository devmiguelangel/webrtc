import React from 'react';
import { v4 as uuid } from 'uuid';

const CreateRoom = (props) => {
  const create = () => {
    const id = uuid();
    props.history.push(`/room/${id}`);
  };

  return (
    <button onClick={create}>Create Room</button>
  )
}

export default CreateRoom;
