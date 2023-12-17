import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import LocalStorage from "src/common/LocalStorage";
import { getAllJoinedRooms } from "src/services/UserService";

class ChatStore {
  stompClient = null;

  setStompClient = (stompClient: any) => {
    this.stompClient = stompClient;
  };

  constructor() {
    makeAutoObservable(this);
  }

  searchConversation = async (keyword: string) => {
    try {
      const searchObject = {
        keyword: keyword,
      };
    } catch (err) {
      console.log(err);
      toast.error("Find conversation errors :( Please try again!");
      throw new Error(err);
    }
  };

  sendMessage = (messageContent: string) => {
    if (!messageContent || messageContent.length === 0) {
      return;
    }
    try {
      const currentUser = LocalStorage.getLoginUser();

      const chatMessage = {
        // content: this.encryptRSA(messageContent),
        content: messageContent,
        room: { id: this.chosenRoom.id },
        messageType: { name: "chat" },
        user: currentUser,
      };
      // bộ 3 số n,e,d
      this.generate();

      this.stompClient.send(
        "/app/privateMessage",
        {},
        JSON.stringify(chatMessage)
      );
    } catch (err) {
      console.log(err);
      toast.error("Error occured when sending message, please try again :(");
      throw new Error(err);
    }
  };
  //hàm tính modulo theo lũy thừa
  mod = (a, b, n) => {
    if (n === 1) return 0;
    let result = 1;
    for (let i = 0; i < b; i++) {
      result = (result * a) % n;
    }
    return result;
  };
  // tinh nghịch đảo a mod m
  modInverse = (a, m) => {
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
  };
  // Check số nguyên tố
  isPrime = (num) => {
    let sqrtnum = Math.floor(Math.sqrt(num));
    let prime = num !== 1;
    for (let i = 2; i <= sqrtnum; i++) {
      if (num % i === 0) {
        prime = false;
        break;
      }
    }
    return prime;
  };

  //random số nguyên tố bất kì
  getRandomPrime = () => {
    let prime;
    do {
      prime = Math.floor(Math.random() * 1000000) + 2;
    } while (!this.isPrime(prime));
    return prime;
  };
  //tìm ước chung lớn nhất
  gcd = (a, b) => {
    return b === 0 ? a : this.gcd(b, a % b);
  };
  // tìm số nguyên tố sấp xỉ với num
  getCoPrime = (num) => {
    let coPrime;
    do {
      coPrime = Math.floor(Math.random() * (num - 2)) + 2;
    } while (
      (this.gcd(num, coPrime) !== 1 || this.isPrime(coPrime) === false) &&
      num !== coPrime
    );
    return coPrime;
  };
  // Hiện ra màn hình p,q,n,e,d
  generate = async () => {
    try {
      let p = this.getRandomPrime();
      let q = this.getRandomPrime();

      let n = p * q;
      let phi = (p - 1) * (q - 1);

      let e = this.getCoPrime(phi);

      let d = this.modInverse(e, phi);

      console.log("p:", p, "\nq:", q, "\nn:", n, "\ne:", e, "\nd:", d);
      return { n, e, d };
    } catch (error) {
      console.error("Lỗi: " + error.message);
    }
  };

  registerUser = () => {
    this.connect();
  };

  connect = () => {
    let Sock = new SockJS("http://localhost:8000/ws");
    this.stompClient = over(Sock);
    this.stompClient.connect({}, this.onConnected, this.onError);
  };

  onConnected = () => {
    const currenUser = LocalStorage.getLoginUser();
    this.stompClient.subscribe(
      "/user/" + currenUser.id + "/privateMessage",
      this.onReceiveRoomMessage
    );
  };

  onError = (err: any) => {
    console.log(err);
    toast.error("Connect to chat server error, please try again!");
  };

  chosenRoom = null;
  setChosenRoom = (chosenRoom: any) => {
    this.chosenRoom = chosenRoom;
  };

  joinedRooms = [];
  getAllJoinedRooms = async () => {
    console.log("getAllJoinedRooms is called");
    try {
      const { data } = await getAllJoinedRooms();
      this.joinedRooms = data;
      this.chosenRoom = data[0];

      if (!this.stompClient) {
        toast.error(
          "You haven't connected to chat server! Please login again!"
        );
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Load conversation fail, please try again!");
    }
  };

  onReceiveRoomMessage = (payload: any) => {
    const payloadData = JSON.parse(payload.body);
    const roomId = payloadData?.room?.id;
    if (!roomId) {
      toast.error("Received message errors!");
      return;
    }

    let isExisted = null;
    for (let i = 0; i < this.joinedRooms.length; i++) {
      const currentRoom = this.joinedRooms[i];
      if (currentRoom.id === roomId) {
        currentRoom.messages.push(payloadData);
        this.joinedRooms[i] = { ...currentRoom };
        isExisted = i;

        if (currentRoom.id === this.chosenRoom.id) {
          this.chosenRoom = { ...currentRoom };
        }
      }
    }

    if (isExisted || isExisted == 0) {
      const temp = this.joinedRooms[isExisted];
      for (let i = isExisted; i >= 1; i--) {
        this.joinedRooms[i] = this.joinedRooms[i - 1];
      }
      this.joinedRooms[0] = temp;
      this.joinedRooms = [...this.joinedRooms];
    } else {
      const newRoom = payloadData.room;
      this.joinedRooms.unshift(newRoom);
      this.joinedRooms = [...this.joinedRooms];
    }
  };
}

export default ChatStore;
