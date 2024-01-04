-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th1 04, 2024 lúc 07:50 AM
-- Phiên bản máy phục vụ: 10.4.28-MariaDB
-- Phiên bản PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `chatapprsa`
--

drop database if exists chatapprsa;

create database chatapprsa;
use chatapprsa;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_friend`
--

CREATE TABLE `tbl_friend` (
  `id` varchar(255) NOT NULL,
  `last_modify_date` datetime DEFAULT NULL,
  `state` bit(1) DEFAULT NULL,
  `receiver_id` varchar(255) DEFAULT NULL,
  `request_sender_id` varchar(255) DEFAULT NULL,
  `room_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_friend`
--

INSERT INTO `tbl_friend` (`id`, `last_modify_date`, `state`, `receiver_id`, `request_sender_id`, `room_id`) VALUES
('25a79330-f9fa-4d21-b043-bf01d5cefa2d', '2024-01-04 13:42:43', b'0', '40d8bd21-7fde-4abb-a976-827fd268631e', 'cb92d3fa-08d0-44a0-9357-a3afdf3dff50', NULL),
('2e6ee0ba-232d-409d-94b7-5516fac8ed53', '2024-01-04 13:40:29', b'0', '40d8bd21-7fde-4abb-a976-827fd268631e', '97ac0f81-764f-494a-b89b-1f1cea92a6c7', NULL),
('3dc24e64-082c-48fc-a4e7-91049ba39061', '2024-01-04 13:31:34', b'1', '97ac0f81-764f-494a-b89b-1f1cea92a6c7', 'e9ceecfd-8cb6-45c0-9b3a-d9660d4f550f', '24e3e3de-bca5-41a9-9cde-e6a5204c4e93'),
('5094609e-8170-442b-9a2b-72421f3b84e3', '2024-01-04 13:31:38', b'0', '40d8bd21-7fde-4abb-a976-827fd268631e', 'e9ceecfd-8cb6-45c0-9b3a-d9660d4f550f', NULL),
('95bf8c32-ec4e-4307-950b-55e14398f953', '2024-01-04 13:31:36', b'0', '138eaedf-1718-4ea6-9e34-8eefa225999a', 'e9ceecfd-8cb6-45c0-9b3a-d9660d4f550f', NULL),
('9b67b71c-8e66-43cc-a5a7-827cb3c4eaea', '2024-01-04 13:40:31', b'0', 'cb92d3fa-08d0-44a0-9357-a3afdf3dff50', '97ac0f81-764f-494a-b89b-1f1cea92a6c7', NULL),
('b2d37278-ec09-4142-900d-ae1790acc8fe', '2024-01-04 13:31:30', b'0', 'cb92d3fa-08d0-44a0-9357-a3afdf3dff50', 'e9ceecfd-8cb6-45c0-9b3a-d9660d4f550f', NULL),
('cdca109d-4c69-4c8f-99c6-990f8fa32648', '2024-01-04 13:43:00', b'0', '138eaedf-1718-4ea6-9e34-8eefa225999a', 'cb92d3fa-08d0-44a0-9357-a3afdf3dff50', NULL),
('da3bdf31-3351-4ab9-9afe-5fb7067f5eb9', '2024-01-04 13:40:26', b'0', '138eaedf-1718-4ea6-9e34-8eefa225999a', '97ac0f81-764f-494a-b89b-1f1cea92a6c7', NULL),
('f35b0d50-be86-4b71-8388-8de0ed5b2df7', '2024-01-04 13:48:25', b'0', '138eaedf-1718-4ea6-9e34-8eefa225999a', '40d8bd21-7fde-4abb-a976-827fd268631e', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_message`
--

CREATE TABLE `tbl_message` (
  `id` varchar(255) NOT NULL,
  `content` longtext DEFAULT NULL,
  `send_date` datetime DEFAULT NULL,
  `message_type_id` varchar(255) DEFAULT NULL,
  `room_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_message`
--

INSERT INTO `tbl_message` (`id`, `content`, `send_date`, `message_type_id`, `room_id`, `user_id`) VALUES
('0b4b83a7-2515-4dfd-b8d1-f49a8c54e332', 'HoangVanVuong sended you an add friend request!', '2024-01-04 13:31:34', 'b7f9c9e5-38c7-4a5b-9643-a16549a9c13c', NULL, '97ac0f81-764f-494a-b89b-1f1cea92a6c7'),
('1c45bfe3-e177-40a6-b956-1680139bea3e', 'HoangVanVuong sended you an add friend request!', '2024-01-04 13:31:31', 'b7f9c9e5-38c7-4a5b-9643-a16549a9c13c', NULL, 'cb92d3fa-08d0-44a0-9357-a3afdf3dff50'),
('36ca463b-1e90-4d67-883a-aa6becc31ff6', 'HoangVanVuong sended you an add friend request!', '2024-01-04 13:31:36', 'b7f9c9e5-38c7-4a5b-9643-a16549a9c13c', NULL, '138eaedf-1718-4ea6-9e34-8eefa225999a'),
('4042aa3d-b275-4eec-8fcc-b2cfcd8413d1', 'DinhTuanDat sended you an add friend request!', '2024-01-04 13:40:29', 'b7f9c9e5-38c7-4a5b-9643-a16549a9c13c', NULL, '40d8bd21-7fde-4abb-a976-827fd268631e'),
('5b3f3187-fa5f-4154-8374-85612a444227', 'DinhTuanDat sended you an add friend request!', '2024-01-04 13:40:31', 'b7f9c9e5-38c7-4a5b-9643-a16549a9c13c', NULL, 'cb92d3fa-08d0-44a0-9357-a3afdf3dff50'),
('6d4bdabc-8c40-4f19-bfd5-03b9ce01133b', 'DinhTuanDat accepted your add friend request!', '2024-01-04 13:40:38', 'b7f9c9e5-38c7-4a5b-9643-a16549a9c13c', '24e3e3de-bca5-41a9-9cde-e6a5204c4e93', 'e9ceecfd-8cb6-45c0-9b3a-d9660d4f550f'),
('712dad12-abb9-49e8-9709-439d654c6c36', 'DinhTuanDat sended you an add friend request!', '2024-01-04 13:40:26', 'b7f9c9e5-38c7-4a5b-9643-a16549a9c13c', NULL, '138eaedf-1718-4ea6-9e34-8eefa225999a'),
('76d20305-b08d-49e3-8e10-1f40f7959f45', 'HoangVanVuong sended you an add friend request!', '2024-01-04 13:31:38', 'b7f9c9e5-38c7-4a5b-9643-a16549a9c13c', NULL, '40d8bd21-7fde-4abb-a976-827fd268631e'),
('8bb1c0e5-907a-4a89-8143-fb5fc5597717', 'TrinhTuanDat sended you an add friend request!', '2024-01-04 13:43:00', 'b7f9c9e5-38c7-4a5b-9643-a16549a9c13c', NULL, '138eaedf-1718-4ea6-9e34-8eefa225999a'),
('b4e02203-da16-4c57-98ba-c1b321e7fce4', 'NguyenNgocTuTai sended you an add friend request!', '2024-01-04 13:48:25', 'b7f9c9e5-38c7-4a5b-9643-a16549a9c13c', NULL, '138eaedf-1718-4ea6-9e34-8eefa225999a'),
('c47defb3-ae80-433e-b959-eff4210b9093', 'TrinhTuanDat sended you an add friend request!', '2024-01-04 13:42:43', 'b7f9c9e5-38c7-4a5b-9643-a16549a9c13c', NULL, '40d8bd21-7fde-4abb-a976-827fd268631e');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_message_type`
--

CREATE TABLE `tbl_message_type` (
  `id` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_message_type`
--

INSERT INTO `tbl_message_type` (`id`, `code`, `description`, `name`) VALUES
('41f8fe1c-3a91-4bb1-9f09-b53e893e00ee', '002', 'an user had left the conversation', 'left'),
('9f5deac6-46f4-4412-9f56-c5299ee6f4db', '001', 'new user joined conversation', 'join'),
('b7f9c9e5-38c7-4a5b-9643-a16549a9c13c', '004', 'is a notification', 'notification'),
('f990d572-debd-4f23-8f1b-b4b1ccd042eb', '003', 'a common message in the conversation', 'chat');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_room`
--

CREATE TABLE `tbl_room` (
  `id` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `private_key_id` varchar(255) DEFAULT NULL,
  `public_key_id` varchar(255) DEFAULT NULL,
  `room_type_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_room`
--

INSERT INTO `tbl_room` (`id`, `avatar`, `code`, `color`, `create_date`, `description`, `name`, `private_key_id`, `public_key_id`, `room_type_id`) VALUES
('24e3e3de-bca5-41a9-9cde-e6a5204c4e93', NULL, NULL, NULL, '2024-01-04 13:40:38', NULL, NULL, 'f8317763-f034-4e5e-b775-bc8470ad379d', 'b64ef79c-0704-43f9-817a-042ccf2e77fe', 'e6de79d6-dd0c-471d-9456-3870a732c0cd');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_room_type`
--

CREATE TABLE `tbl_room_type` (
  `id` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_room_type`
--

INSERT INTO `tbl_room_type` (`id`, `code`, `description`, `name`) VALUES
('3c20c721-d6ad-43cd-9551-e446f2c3f54d', '002', 'public room is for multiple people chatting', 'public'),
('dcd2cc00-9946-42c7-841c-d17aa55bc924', '003', 'is private room chat for at least 3 people', 'group'),
('e6de79d6-dd0c-471d-9456-3870a732c0cd', '001', 'private room is for 2 people chatting', 'private');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_rsa_key`
--

CREATE TABLE `tbl_rsa_key` (
  `id` varchar(255) NOT NULL,
  `d` longtext DEFAULT NULL,
  `e` longtext DEFAULT NULL,
  `n` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_rsa_key`
--

INSERT INTO `tbl_rsa_key` (`id`, `d`, `e`, `n`) VALUES
('0796b27b-49b8-4742-bb5e-39e0061108b7', NULL, '15505079', '53490949'),
('b61d1fbc-5eb0-4783-8d4b-3aa8fca64fd8', NULL, '23884769', '25818349'),
('b64ef79c-0704-43f9-817a-042ccf2e77fe', NULL, '131', '21509'),
('c64b318d-babe-4c21-90f2-45e6e9e9e8ed', NULL, '3638413', '9808727'),
('d37e3301-d1ff-413d-91e2-8ecd9a3b4864', NULL, '590357', '6706507'),
('f8317763-f034-4e5e-b775-bc8470ad379d', '3563', NULL, '21509'),
('feabe6be-eb18-429b-b61d-08a5acb19a60', NULL, '20845991', '64133677');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` varchar(255) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `birth_date` datetime DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `gender` bit(1) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `public_key_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `address`, `avatar`, `birth_date`, `code`, `fullname`, `gender`, `password`, `username`, `public_key_id`) VALUES
('02f227e9-c52d-454e-981f-affc32bebbde', NULL, NULL, NULL, NULL, NULL, NULL, '$2a$10$XDF04O8Ge3242ib/XbwuUum8abuOSM5mmouX332ICuQXfs0pFh4jy', 'Nathan2', NULL),
('138eaedf-1718-4ea6-9e34-8eefa225999a', 'Hà Nội', 'http://localhost:8000/api/user/avatar/NguyenDuySon_04-01-2024134520.jpg', NULL, NULL, 'Nguyễn Duy Sơn', b'1', '$2a$10$BVI3gzh8FdFNe3TR0UVNPu6huFyic5LM3aWXOfFgYPPJGvrjmXzQ6', 'NguyenDuySon', '0796b27b-49b8-4742-bb5e-39e0061108b7'),
('40d8bd21-7fde-4abb-a976-827fd268631e', 'Bắc Ninh', 'http://localhost:8000/api/user/avatar/NguyenNgocTuTai_04-01-2024134713.jpg', NULL, NULL, 'Nguyễn Ngọc Tú Tài', b'1', '$2a$10$NUpGH8VSC4nKMbBd9HceweUdFLk7cY2tUAW3fAetWZgocKSIOZw7u', 'NguyenNgocTuTai', 'd37e3301-d1ff-413d-91e2-8ecd9a3b4864'),
('97ac0f81-764f-494a-b89b-1f1cea92a6c7', 'Thái Nguyên', 'http://localhost:8000/api/user/avatar/DinhTuanDat_04-01-2024134012.jpg', NULL, NULL, 'Đinh Tuấn Đạt', b'1', '$2a$10$71LUeUC.cD7PkuriQ3vFP.M8Zp64.q4AHftUvpu9YCBynQ1eqCpuu', 'DinhTuanDat', 'c64b318d-babe-4c21-90f2-45e6e9e9e8ed'),
('cb92d3fa-08d0-44a0-9357-a3afdf3dff50', 'Hà Nội', 'http://localhost:8000/api/user/avatar/TrinhTuanDat_04-01-2024134205.jpg', NULL, NULL, 'Trịnh Tuấn Đạt', b'1', '$2a$10$MZVR8QImGXr7HHgMA5hYpex5g4K77o51MeDoHhSqthO3mjxiHocfC', 'TrinhTuanDat', 'b61d1fbc-5eb0-4783-8d4b-3aa8fca64fd8'),
('e9ceecfd-8cb6-45c0-9b3a-d9660d4f550f', 'Hà Nội', 'http://localhost:8000/api/user/avatar/HoangVanVuong_04-01-2024133055.jpg', NULL, NULL, 'Hoàng Văn Vương', b'1', '$2a$10$Hv63X.Xy4oAwSU6HXX17GODNKEcQbHx631qMlZrDUwn8vvea0BAy.', 'HoangVanVuong', 'feabe6be-eb18-429b-b61d-08a5acb19a60');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tbl_user_room`
--

CREATE TABLE `tbl_user_room` (
  `id` varchar(255) NOT NULL,
  `nick_name` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `room_id` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `tbl_user_room`
--

INSERT INTO `tbl_user_room` (`id`, `nick_name`, `role`, `room_id`, `user_id`) VALUES
('21b9331d-666b-4d65-80d5-12af54c51c4e', 'DinhTuanDat', 'member', '24e3e3de-bca5-41a9-9cde-e6a5204c4e93', '97ac0f81-764f-494a-b89b-1f1cea92a6c7'),
('23b89273-b00c-471d-9e26-011879ce0ff5', 'HoangVanVuong', 'member', '24e3e3de-bca5-41a9-9cde-e6a5204c4e93', 'e9ceecfd-8cb6-45c0-9b3a-d9660d4f550f');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `tbl_friend`
--
ALTER TABLE `tbl_friend`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKb1j08j31gblhl5qxmxw43qcpq` (`receiver_id`),
  ADD KEY `FKn91k9wm9unlca18b8syd4o8mv` (`request_sender_id`),
  ADD KEY `FKk5yxfmsqwrjmpuyte19p6hk5e` (`room_id`);

--
-- Chỉ mục cho bảng `tbl_message`
--
ALTER TABLE `tbl_message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKh5qqt34dhtarh7bu0kldu1djc` (`message_type_id`),
  ADD KEY `FK240k54csbuahxpoamqbetvn7s` (`room_id`),
  ADD KEY `FKf26lq84gj2cumeomuck24pkr8` (`user_id`);

--
-- Chỉ mục cho bảng `tbl_message_type`
--
ALTER TABLE `tbl_message_type`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tbl_room`
--
ALTER TABLE `tbl_room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKhk70r9xthekma0s80e97dar3l` (`private_key_id`),
  ADD KEY `FK4xh7h99rgerds7oqcq3d20jes` (`public_key_id`),
  ADD KEY `FKsq26n7x09891tujjx47klp3jk` (`room_type_id`);

--
-- Chỉ mục cho bảng `tbl_room_type`
--
ALTER TABLE `tbl_room_type`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tbl_rsa_key`
--
ALTER TABLE `tbl_rsa_key`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_a4lp2g29qretvd8m32h0of6xm` (`fullname`),
  ADD UNIQUE KEY `UK_k0bty7tbcye41jpxam88q5kj2` (`username`),
  ADD KEY `FKf00dp1wcfakwh8isgwe5ity4c` (`public_key_id`);

--
-- Chỉ mục cho bảng `tbl_user_room`
--
ALTER TABLE `tbl_user_room`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK13y2akkmkmg8jopbocob4c80a` (`room_id`),
  ADD KEY `FKcc01wixit56mh5dsg904xwome` (`user_id`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `tbl_friend`
--
ALTER TABLE `tbl_friend`
  ADD CONSTRAINT `FKb1j08j31gblhl5qxmxw43qcpq` FOREIGN KEY (`receiver_id`) REFERENCES `tbl_user` (`id`),
  ADD CONSTRAINT `FKk5yxfmsqwrjmpuyte19p6hk5e` FOREIGN KEY (`room_id`) REFERENCES `tbl_room` (`id`),
  ADD CONSTRAINT `FKn91k9wm9unlca18b8syd4o8mv` FOREIGN KEY (`request_sender_id`) REFERENCES `tbl_user` (`id`);

--
-- Các ràng buộc cho bảng `tbl_message`
--
ALTER TABLE `tbl_message`
  ADD CONSTRAINT `FK240k54csbuahxpoamqbetvn7s` FOREIGN KEY (`room_id`) REFERENCES `tbl_room` (`id`),
  ADD CONSTRAINT `FKf26lq84gj2cumeomuck24pkr8` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`),
  ADD CONSTRAINT `FKh5qqt34dhtarh7bu0kldu1djc` FOREIGN KEY (`message_type_id`) REFERENCES `tbl_message_type` (`id`);

--
-- Các ràng buộc cho bảng `tbl_room`
--
ALTER TABLE `tbl_room`
  ADD CONSTRAINT `FK4xh7h99rgerds7oqcq3d20jes` FOREIGN KEY (`public_key_id`) REFERENCES `tbl_rsa_key` (`id`),
  ADD CONSTRAINT `FKhk70r9xthekma0s80e97dar3l` FOREIGN KEY (`private_key_id`) REFERENCES `tbl_rsa_key` (`id`),
  ADD CONSTRAINT `FKsq26n7x09891tujjx47klp3jk` FOREIGN KEY (`room_type_id`) REFERENCES `tbl_room_type` (`id`);

--
-- Các ràng buộc cho bảng `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD CONSTRAINT `FKf00dp1wcfakwh8isgwe5ity4c` FOREIGN KEY (`public_key_id`) REFERENCES `tbl_rsa_key` (`id`);

--
-- Các ràng buộc cho bảng `tbl_user_room`
--
ALTER TABLE `tbl_user_room`
  ADD CONSTRAINT `FK13y2akkmkmg8jopbocob4c80a` FOREIGN KEY (`room_id`) REFERENCES `tbl_room` (`id`),
  ADD CONSTRAINT `FKcc01wixit56mh5dsg904xwome` FOREIGN KEY (`user_id`) REFERENCES `tbl_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
