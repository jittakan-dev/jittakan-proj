package dev.jittakan.proj.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import dev.jittakan.proj.domain.Project;
import dev.jittakan.proj.domain.ProjectRepository;
import dev.jittakan.proj.exception.ProjectNotFoundException;
import jakarta.validation.Valid;
import jakarta.validation.ValidationException;

@RestController
@RequestMapping("/projects")
public class ProjectController {

	private final ProjectRepository projectRepository;

	@Autowired
	public ProjectController(ProjectRepository projectRepository) {
		this.projectRepository = projectRepository;
	}

	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<List<Project>> getProjects() {
		List<Project> projects = projectRepository.findAll();
		return ResponseEntity.ok(projects);
	}

	@GetMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
		Project project = projectRepository.findById(id)
				.orElseThrow(() -> new ProjectNotFoundException("No project #" + id + " is present in any lists"));
		return ResponseEntity.ok(project);
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Project> addProject(@Valid @RequestBody Project project, BindingResult result)
			throws URISyntaxException {
		if (result.hasErrors()) {
			throw new ValidationException(result.toString());
		}
		Project savedProject = projectRepository.save(project);
		return ResponseEntity.created(new URI("/projects/" + savedProject.getId())).body(savedProject);
	}

	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.OK)
	public ResponseEntity<Project> updateProject(@PathVariable Long id, @Valid @RequestBody Project project,
			BindingResult result) {
		if (result.hasErrors()) {
			throw new ValidationException(result.toString());
		}
		Optional<Project> optionalProject = projectRepository.findById(id);
		if (optionalProject.isPresent()) {
			Project currentProject = optionalProject.get();
			currentProject.setProjectName(project.getProjectName());
			currentProject.setProblemDetail(project.getProblemDetail());
			currentProject.setProblemImageUrl(project.getProblemImageUrl());
			currentProject.setOperationDetail(project.getOperationDetail());
			currentProject.setBuildDetail(project.getBuildDetail());
			currentProject.setBuildImageUrl(project.getBuildImageUrl());
			currentProject.setChallengeDetail(project.getChallengeDetail());
			currentProject.setLink(project.getLink());
			currentProject.setProjectProgress(project.getProjectProgress());
			currentProject = projectRepository.save(currentProject);
			return ResponseEntity.ok(currentProject);

		}
		return ResponseEntity.notFound().build();

	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
		Project project = projectRepository.findById(id)
				.orElseThrow(() -> new ProjectNotFoundException("No project #" + id + " is not found"));

		projectRepository.deleteById(project.getId());
		return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

}
