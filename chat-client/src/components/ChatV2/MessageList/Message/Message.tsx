import React, { memo, useState, useEffect } from "react";
import "./Message.css";
import { format, parseISO } from "date-fns";
import { observer } from "mobx-react";
import { useStore } from "src/stores";

function Message(props: any) {
  const {
    data,
    author,
    type,
    isMine,
    startsSequence,
    endsSequence,
    photo,
    sendDate,
  } = props;
  const { authStore, chatStore, accountStore } = useStore();
  const { privateKey } = authStore;
  const { rsaDecrypt } = chatStore;
  const { getAvatarSrc } = accountStore;
  const [imagePath, setImagePath] = useState('https://www.treasury.gov.ph/wp-content/uploads/2022/01/male-placeholder-image.jpeg');



  function renderPhoto() {
    if (photo && photo != "") {
      const imageSrcPromise = getAvatarSrc(photo);
      imageSrcPromise.then(function (data) {
        setImagePath(data);
      });
    }
  }

  useEffect(renderPhoto, [])


  return (
    <div
      className={[
        "message",
        `${isMine ? "mine" : ""}`,
        `${startsSequence ? "start" : ""}`,
        `${endsSequence ? "end" : ""}`,
      ].join(" ")}
    >
      {type == "notification" && (
        <div className="notification">
          {format(parseISO(sendDate), "do MMMM yyyy")} <br />
          {data}
        </div>
      )}

      {type == "join" && (
        <div className="notification">
          {data}
        </div>
      )}

      {type == "left" && (
        <div className="notification">
          {data}
        </div>
      )}

      {type == "chat" && (
        <>
          {startsSequence && <div className="username">{author}</div>}
          <div className="user-container">
            {startsSequence && !isMine && (
              <img className="thumbnail" src={imagePath} alt=""></img>
            )}
            <div className="bubble-container">
              <div className="bubble">
                {rsaDecrypt(data, type, privateKey)}
              </div>
            </div>
          </div>
        </>
      )}

    </div>
  );
}

export default memo(observer(Message));
