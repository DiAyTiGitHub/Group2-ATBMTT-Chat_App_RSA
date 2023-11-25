package com.chatapp.chat.service;

import com.chatapp.chat.entity.Room;
import com.chatapp.chat.model.RoomDTO;
import com.sun.source.tree.Tree;

import java.util.Set;
import java.util.TreeSet;

public interface RoomService {
    public TreeSet<RoomDTO> getAllJoinedRooms();

    public TreeSet<RoomDTO> getAllPrivateRooms();

    public TreeSet<RoomDTO> getAllPublicRooms();
}
