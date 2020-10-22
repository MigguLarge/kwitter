import React, { useState } from "react";
import { dbService } from "fbase";

const Kweet = ({kweetObj, isOwner}) => {
  const [editing, setEditing] = useState(false);
  const [newKweet, setNewKweet] = useState(kweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this kweet?")
    if (ok) {
      await dbService.doc(`kweets/${kweetObj.id}`).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewKweet(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`kweets/${kweetObj.id}`).update({
      text: newKweet,
    });
    setEditing(false);
  }
  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="edit your kweet" value={newKweet} required onChange={onChange} />
            <input type="submit" value="Update Kweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{kweetObj.text}</h4>
          {isOwner && <><button onClick={onDeleteClick}> Delete Kweet</button>
          <button onClick={toggleEditing}>Edit Kweet</button></>}
        </>
      )}
    </div>
  );
};

export default Kweet;
