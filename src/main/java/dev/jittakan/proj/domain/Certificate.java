package dev.jittakan.proj.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Table(name = "certificate")

public class Certificate {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "certificate_name", nullable = false)
	private String certificateName;
	
	@Column(name = "certificate_code", nullable = true)
	private String certificateCode;
	
	@Column(name = "certificate_year", nullable = true)
	private String certificateYear;
	
	@Column(name = "certificate_score", nullable = true)
	private String certificateScore;
	
	@Column(name = "certificate_award", nullable = true)
	private String  certificateAward;
	
	@Column(name = "certificate_progress", nullable = false)
	private int certificateProgress;

	
}
