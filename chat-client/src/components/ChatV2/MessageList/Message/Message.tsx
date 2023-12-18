import React, { memo } from "react";
import "./Message.css";
import { format, parseISO } from "date-fns";
import { observer } from "mobx-react";
import { useStore } from "src/stores";
import RSAService from "src/components/Auth/RSAService";

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

  const { authStore } = useStore();
  const { privateKey } = authStore;

  const decryptRSA = (messageContent: string) => {
    let plaintext = "";
    const { n, d } = privateKey;

    try {
      // Trim and remove whitespace from the Base64 string
      let cleanBase64String = messageContent.trim().replace(/\s/g, '');

      // Decoding the Base64 string
      let decodedString = atob(cleanBase64String);

      // Decrypting each character code and constructing the plaintext
      for (let i = 0; i < decodedString.length; i++) {
        let decryptedCharCode = RSAService.mod(decodedString.charCodeAt(i), d, n);
        plaintext += String.fromCharCode(decryptedCharCode);
      }
      console.log("Chuoi tin nhan giai ma: " + plaintext);
    } catch (error) {
      console.error("Error decoding Base64:", error);
      console.log("Input causing the issue:", messageContent);
      return "";
    }

    return plaintext;
  };

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
          {format(parseISO(sendDate), "do MMMM yyyy")}
        </div>
      )}
      {startsSequence && <div className="username">{author}</div>}
      <div className="user-container">
        {startsSequence && !isMine && (
          <img className="thumbnail" src={photo} alt=""></img>
        )}
        <div className="bubble-container">
          <div className="bubble">
            {/* {decryptRSA(data)} */}
            {data}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(observer(Message));