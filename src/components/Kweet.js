import React from "react";

const Kweet = ({kweetObj, isOwner}) => (
    <div>
        <h4>{kweetObj.text}</h4>
        {isOwner && <><button>Delete Kweet</button>
        <button>Edit Kweet</button></>}
    </div>
)

export default Kweet;
