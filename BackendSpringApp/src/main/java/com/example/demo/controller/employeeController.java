package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.model.Employee;
import com.example.demo.repository.EmployeeRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/")
public class employeeController {
	@Autowired
	private EmployeeRepository employeeRepository;

	//get all employee
	@GetMapping("/employees")
	public List<Employee>GetAllEmployees(){
		return employeeRepository.findAll();
	}
	
	//get one employee
	@GetMapping("/employees/{id}")
	public ResponseEntity<Employee> getEmployeById(@PathVariable("id") long id) {
		Employee employee= employeeRepository.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("employee not exist with id :"+ id));
		return ResponseEntity.ok(employee);
	}
	
	//create employee
	@PostMapping("/employees")
	public Employee createEmployee(@RequestBody Employee employee) {
		return employeeRepository.save(employee);
	}
	
	//update employee
	@PutMapping("employees/{id}")
	public ResponseEntity<Employee> updatEmployee(@PathVariable long id, @RequestBody Employee employeeDetails) {
		Employee employee= employeeRepository.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("employee not exist with id :"+ id));
		
		employee.setFirstName(employeeDetails.getFirstName());
		employee.setLastName(employeeDetails.getLastName());
		employee.setEmailId(employeeDetails.getEmailId());
		
		Employee updEmployee=employeeRepository.save(employee);
		return ResponseEntity.ok(updEmployee);
	}

	
	//delete all employee
	@DeleteMapping("")
	public void DeleteAllEmployee() {
		employeeRepository.deleteAll();
	}
	//delete by id
	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteById(@PathVariable("id") long id){
		Employee employee= employeeRepository.findById(id)
				.orElseThrow(()->new ResourceNotFoundException("employee not exist with id :"+ id));
		
		employeeRepository.delete(employee);
		Map<String, Boolean>responseMap=new HashMap<>();
		responseMap.put("delete", Boolean.TRUE);
		return ResponseEntity.ok(responseMap);
	}
}
