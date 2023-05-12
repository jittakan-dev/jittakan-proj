package dev.jittakan.proj.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.jittakan.proj.domain.Email;
import dev.jittakan.proj.domain.EmailRepository;

@RestController
@RequestMapping("/emails")
public class EmailController {

	@Autowired
	private JavaMailSender javaMailSender;

	private final EmailRepository emailRepository;

	@Autowired
	public EmailController(EmailRepository emailRepository) {
		this.emailRepository = emailRepository;
	}

	@PostMapping
	public ResponseEntity<Email> sendEmail(@RequestBody Email email) {
		SimpleMailMessage mail = new SimpleMailMessage();
		mail.setTo("sn.jittakan@hotmail.com");//email.getEmail()
		mail.setSubject(email.getSubject());
		mail.setText(email.getMessage());
		javaMailSender.send(mail);
		
		Email savedEmail = emailRepository.save(email);
		return ResponseEntity.ok(savedEmail);
	}
}
