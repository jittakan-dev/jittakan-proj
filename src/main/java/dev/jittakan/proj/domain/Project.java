package dev.jittakan.proj.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.Accessors;

@Getter
@Setter
@Accessors(chain=true)
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "project")
public class Project {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@Column(name = "project_name", nullable = false)
	private String projectName;

	@Column(name = "problem_detail", nullable = false, columnDefinition = "TEXT")
	private String problemDetail; 

	@Column(name = "problem_image_url", nullable = true)
	private String problemImageUrl;

	@Column(name = "operation_detail", nullable = true, columnDefinition = "TEXT")
	private String operationDetail;  

	@Column(name = "build_detail", nullable = true, columnDefinition = "TEXT")
	private String buildDetail; 

	@Column(name = "build_image_url", nullable = true)
	private String buildImageUrl; 

	@Column(name = "challenge_detail", nullable = true, columnDefinition = "TEXT")
	private String challengeDetail; 

	@Column(name = "link", nullable = true)
	private String link;

	@Column(name = "project_progress", nullable = true)
	private byte projectProgress; 

	
}