package dev.jittakan.proj.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ProjectNotFoundException extends RuntimeException{
   private static final long serialVersionUID = 1L;
   private String message;
   
   public ProjectNotFoundException( String message) {
	   super(message);
       this.message = message;
   }
}
