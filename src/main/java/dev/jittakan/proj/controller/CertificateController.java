package dev.jittakan.proj.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import jakarta.validation.ValidationException;

import dev.jittakan.proj.domain.Certificate;
import dev.jittakan.proj.domain.CertificateRepository;
import dev.jittakan.proj.domain.Project;
import dev.jittakan.proj.exception.CertificationNotFoundException;

@RestController
@RequestMapping("/certificates")
public class CertificateController {

	private final CertificateRepository certificateRepository;

	@Autowired
	public CertificateController(CertificateRepository certificateRepository) {
		this.certificateRepository = certificateRepository;
	}

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Certificate> getCertifications() {
		return certificateRepository.findAll();
	}

	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Certificate> getCertification(@PathVariable Long id) {
		Optional<Certificate> certification = certificateRepository.findById(id);
		return certification.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Certificate> addCertification(@Valid @RequestBody Certificate certification,
			BindingResult result) throws URISyntaxException {
		if (result.hasErrors()) {
			throw new ValidationException(result.toString());
		}
		Certificate savedCertification = certificateRepository.save(certification);
		return ResponseEntity.created(new URI("/certifications/" + savedCertification.getId()))
				.body(savedCertification);
	}

	
	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Certificate> updateCertificate(@PathVariable Long id,
			@Valid @RequestBody Certificate certificate, BindingResult result) {
		if (result.hasErrors()) {
			throw new ValidationException(result.toString());
		}
		Optional<Certificate> optionalCertificate = certificateRepository.findById(id);
		if (optionalCertificate.isPresent()) {
			Certificate currentCertificate = optionalCertificate.get();
			currentCertificate.setCertificateName(certificate.getCertificateName());
			currentCertificate.setCertificateCode(certificate.getCertificateCode());
			currentCertificate.setCertificateYear(certificate.getCertificateYear());
			currentCertificate.setCertificateScore(certificate.getCertificateScore());
			currentCertificate.setCertificateAward(certificate.getCertificateAward());
			currentCertificate.setCertificateProgress(certificate.getCertificateProgress());
			currentCertificate = certificateRepository.save(currentCertificate);
			return ResponseEntity.ok(currentCertificate);
		}
		return ResponseEntity.notFound().build();
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<Void> deleteCertification(@PathVariable Long id) {
		Certificate certification = certificateRepository.findById(id)
				.orElseThrow(() -> new CertificationNotFoundException("No project #" + id + " is not found"));

		certificateRepository.deleteById(certification.getId());
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

}
