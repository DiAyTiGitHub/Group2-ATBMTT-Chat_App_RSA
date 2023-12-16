package com.chatapp.chat.service;

import com.chatapp.chat.model.MessageDTO;
import com.chatapp.chat.model.RSAKeyDTO;

import java.math.BigInteger;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface MessageService {
    public MessageDTO createMessage(MessageDTO dto);

    public List<MessageDTO> findTop10PreviousByMileStone(MessageDTO mileStone);

    public Set<MessageDTO> getAllMessagesByRoomId(UUID roomId);

    public List<MessageDTO> get20LatestMessagesByRoomId(UUID roomId);

    public MessageDTO handlerForNotification(MessageDTO dto);

    public void sendMessageTo(String destination, MessageDTO dto);

    public MessageDTO sendPrivateMessage(MessageDTO messageDTO);

    public String encryptMessage(String message, RSAKeyDTO publicKeyDto);

    public String decryptMessage(String message, RSAKeyDTO privateKeyDto);

    public BigInteger encryptMessage(BigInteger message, RSAKeyDTO publicKeyDto);

    public BigInteger decryptMessage(BigInteger message, RSAKeyDTO privateKeyDto);
}
