import React from "react";
import "./Message.css";
import { format, parseISO } from "date-fns";

export default function Message(props) {
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
  //hàm tính modulo theo lũy thừa
  const mod = (a, b, n) => {
    if (n === 1) return 0;
    let kq = 1;
    for (let i = 0; i < b; i++) {
      kq = (kq * a) % n;
    }
    return kq;
  };
  // tinh nghịch đảo a mod m
  function modInverse(a, m) {
    let m0 = m;
    let x0 = 0;
    let x1 = 1;

    if (m === 1) return 0;

    while (a > 1) {
      let q = Math.floor(a / m);
      let t = m;
      m = a % m;
      a = t;
      t = x0;
      x0 = x1 - q * x0;
      x1 = t;
    }
    if (x1 < 0) x1 += m0;
    return x1;
  }
  const decryptRSA = (messageContent) => {
    const q = 11,
      p = 13,
      e = 97;
    const n = p * q, phiN = (p - 1) * (q - 1);
    const d = modInverse(e, phiN);
    let plaintext = "";

    try {
      // Trim and remove whitespace from the Base64 string
      let cleanBase64String = messageContent.trim().replace(/\s/g, '');

      // Decoding the Base64 string
      let decodedString = atob(cleanBase64String);

      // Decrypting each character code and constructing the plaintext
      for (let i = 0; i < decodedString.length; i++) {
        let decryptedCharCode = mod(decodedString.charCodeAt(i), d, n);
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


  //

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
