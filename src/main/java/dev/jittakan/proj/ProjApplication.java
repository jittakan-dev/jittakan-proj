package dev.jittakan.proj;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProjApplication  implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(ProjApplication.class, args);
	}
	@Override
	public void run(String... args) throws Exception {
	}
}