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
  // const rsaDecrypt = (messageContent) => {
  //   let plaintext = "";
  //   const { n, d } = privateKey;
  //   console.log("n:"+n+"\nd:"+d);
    
  //   console.log("Chuoi can gia ma la: "+messageContent);
    
  //   let modifiedMessageContent = String(messageContent.replace(/-/g, '+').replace(/_/g, '/'));
  //   try {
  //     // Use `atob` to decode base64-encoded string
  //     let charCode = atob(modifiedMessageContent);
  //     var mang = charCode.split(",").map(Number);

  //     for (let i = 0; i < mang.length; i++) {
  //       // Use mang.length instead of charCode.length
  //       let decryptedCharCode = RSAService.mod(mang[i], d, n);
  //       plaintext += String.fromCharCode(decryptedCharCode);
  //     }

  //     console.log("Chuoi giai ma la: " + plaintext);

  //     return plaintext;
  //   } catch (error) {
  //     console.log("loi :" + error.message);
  //   }
  // };

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
            {/* {rsaDecrypt(data)} */}
            {data}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(observer(Message));
