
# Đề Tài: Xây dựng chương trình mã hóa và giải mã RSA
# Bộ môn: An toàn và bảo mật thông tin
# Nhóm thực hiện: Nhóm 2
# Thành viên: Đinh Tuấn Đạt, Trịnh Tuấn Đạt, Nguyễn Duy Sơn, Nguyễn Ngọc Tú Tài, Hoàng Văn Vương.



## Mục tiêu dự án

Dự án ChatApp sử dụng thuật toán RSA (Rivest-Shamir-Adleman) nhằm đảm bảo tính an toàn và bảo mật trong quá trình truyền thông tin. Mục tiêu chính của dự án là xây dựng một ứng dụng trò chuyện trực tuyến an toàn, nơi người dùng có thể trao đổi tin nhắn mà không lo lắng về vấn đề bảo mật.


## Các công nghệ sử dụng

- Hệ mã RSA: : Sử dụng RSA để đảm bảo tính an toàn trong quá trình truyền tải thông điệp giữa các client và server.
- JSONWebToken: Sử dụng JWT để xác thực và quản lý phiên đăng nhập của người dùng.
- TCP Protocol + WebSocket: Sử dụng TCP Protocol để kết nối giữa client và server, và WebSocket để truyền dữ liệu theo thời gian thực.
- Restful API: Cung cấp các API Restful để quản lý người dùng, thông điệp, và các chức năng khác.
- Mô hình client - server: Dự án tuân theo mô hình client - server, với client được xây dựng bằng React TypeScript và server sử dụng Java Spring Boot.
- JavaScript + React TypeScript: Sử dụng React TypeScript để xây dựng giao diện người dùng thân thiện và hiệu quả.
- Java Spring Boot: Sử dụng Java Spring Boot để xây dựng server, quản lý người dùng và xử lý các yêu cầu từ phía client.



## Tính năng
- Đăng nhập và đăng ký người dùng.
- Chat với bạn bè.
- Tạo phòng chat và tham gia nhóm chat.
- Gửi và nhận tin nhắn an toàn qua mô hình mã hóa RSA.



## Hướng dẫn cài đặt
**Client:**

- Clone the project

```bash
  git clone https://github.com/DiAyTi2004/Group2-ATBMTT-Chat_App_RSA.git
```

- Go to the project directory

```bash
  cd chat-client
```

- install yarn 
```bash
  npm install --global yarn
```

- Install dependencies

```bash
  yarn install
```

- Start the server

```bash
  yarn start
```
**Server:**

- install Extension Pack for Java
![App Screenshot](https://scontent.xx.fbcdn.net/v/t1.15752-9/410765610_224985747312538_7695285106616389188_n.png?stp=dst-png_p206x206&_nc_cat=101&ccb=1-7&_nc_sid=510075&_nc_eui2=AeEjJoFxG2668-5b5LusMMRXKJKqLrdw6kcokqout3DqR9m4RydhjRCFrFvIBBwlUWyCAFW1FN_SitSeHxXkSZPy&_nc_ohc=bowWLgOUBTMAX_hGTBL&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTcCfhObIjbAilmObR-q2TK3yR-KLPolqY8g21yM8H0OA&oe=65B54881)
- install Spring Boot Extension Pack
![App Screenshot](https://scontent.xx.fbcdn.net/v/t1.15752-9/411243520_684358733850676_1653977239017351040_n.png?stp=dst-png_p206x206&_nc_cat=102&ccb=1-7&_nc_sid=510075&_nc_eui2=AeHTeqlPsfcL8brlaC79YcBnpa2uGo0nUTylra4ajSdRPMWbsNd85lvxCkrt5WC_WZ7OXI5M7aIgzzZO9skq4nNK&_nc_ohc=4YYq0C_35AUAX-FtXeP&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTInt7yvtMUnreZH8Fx2lfBNEXlAdOJH_GLxDf1HULRIg&oe=65B5673C)
- run file ChatApplication.java
![App Screenshot](https://scontent.xx.fbcdn.net/v/t1.15752-9/411386863_900489028381213_3513357721652227151_n.png?stp=dst-png_p206x206&_nc_cat=110&ccb=1-7&_nc_sid=510075&_nc_eui2=AeFfJ8TPP2fq2pBsilrAoRhOzbxKahAkrBTNvEpqECSsFMExJeO4k_yRiioOs6fPrC9q4YDv3se2Ecgj-s6r1elD&_nc_ohc=PB--3v_uqx0AX8yxVlQ&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&oh=03_AdTmVQmTpv8rO4vZOJdVTgnBeM41xlFHs74988ny-DBqGQ&oe=65B53A99)
## Báo Cáo Lỗi

Nếu bạn phát hiện lỗi, vui lòng báo cáo chúng bằng cách tạo một issue mới.

