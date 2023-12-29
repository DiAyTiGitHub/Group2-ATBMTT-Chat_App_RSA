import React, { memo } from "react";
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
  console.log(type);
  const { authStore, chatStore } = useStore();
  const { privateKey } = authStore;

  const { rsaDecrypt } = chatStore;

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
          {format(parseISO(sendDate), "do MMMM yyyy")} <br/>
          {data}
        </div>
      )}

      {type == "join" && (
        <div className="notification">
          {author} has joined
        </div>
      )}

      {type == "left" && (
        <div className="notification">
          {author} has left
        </div>
      )}
      
      {type == "chat" && (
        <>
          {startsSequence && <div className="username">{author}</div>}
          <div className="user-container">
            {startsSequence && !isMine && (
              <img className="thumbnail" src={photo} alt=""></img>
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
