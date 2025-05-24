package com.library.demo.service;

import com.library.demo.dao.MessageRepository;
import com.library.demo.entity.Message;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class MessageService {

    private MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void postMessage(Message messageRequest, String userEmail) {
        Message message = new Message(messageRequest.getTitle(), messageRequest.getQuestion());
        message.setUserEmail(userEmail);
        messageRepository.save(message);
    }
}
