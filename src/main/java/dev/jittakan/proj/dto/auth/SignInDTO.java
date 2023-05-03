package dev.jittakan.proj.dto.auth;

import lombok.Data;

@Data
public class SignInDTO {
	private String usernameOrEmail;
	private String password;
}
