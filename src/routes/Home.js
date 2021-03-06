import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Kweet from "components/Kweet"

const Home = ({ userObj }) => {
  const [kweet, setKweet] = useState("");
  const [kweets, setKweets] = useState([]);
  const [attachment, setAttachment] = useState();

  useEffect(() => {
    dbService.collection("kweets").onSnapshot((snapshot) => {
      const kweetArray = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setKweets(kweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("kweets").add({
      text: kweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setKweet("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setKweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: {files},
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    }
    reader.readAsDataURL(theFile);
  };

  const onClearAttachmentClick = () => setAttachment(null);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={kweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Kweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" />
            <button onClick={onClearAttachmentClick}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {kweets.map((kweet) => (
            <Kweet key={kweet.id} kweetObj={kweet} isOwner={kweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};

export default Home;

