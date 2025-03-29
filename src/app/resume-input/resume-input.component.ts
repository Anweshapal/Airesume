import { Component, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ResumeTemplateComponent } from '../resume-template/resume-template.component';

@Component({
  selector: 'app-resume-input',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ResumeTemplateComponent,
  ],
  templateUrl: './resume-input.component.html',
  styleUrls: ['./resume-input.component.css'],
})
export class ResumeInputComponent {
  description: string = '';
  resume: any = {}; // Store resume data here
  isGenerated: boolean = false;
  showTemplate: boolean = false; // Ensure boolean consistency
  @Output() resumeGenerated = new EventEmitter<any>();

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  /**
   * Sends user description to the backend and updates the resume form.
   */
  generateResume() {
    if (!this.description.trim()) {
      alert('Please enter a description.');
      return;
    }
  
    const requestBody = { userDescription: this.description };
  
    this.http.post<any>('http://localhost:8080/generate', requestBody).subscribe(
      (response) => {
        console.log('API Response:', response);
  
        // Properly format the resume data for the form
        this.resume = {
          fullName: response.personalInformation?.fullName || '',
          email: response.personalInformation?.email || '',
          phoneNumber: response.personalInformation?.phoneNumber || '',
          location: response.personalInformation?.location || '',
          linkedin: response.personalInformation?.linkedin || '',
          github: response.personalInformation?.github || '',
          
          education: response.education ?? [], // Ensure array is set
          experience: response.experience ?? [], // Ensure array is set
          projects: response.projects ?? [], // Ensure array is set
          
          summary: response.summary || '',
          languages: Object.values(response.languages || {}).join(', ') || '',
          
          certifications: response.certifications || [],
        };
  
        
  
        console.log('Resume to be submitted:', this.resume);
        this.resumeGenerated.emit(this.resume);
        this.isGenerated = true;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error generating resume:', error);
        alert('Failed to generate resume. Please try again.');
      }
    );
  }
  addEducation() {
    this.resume.education.push({ degree: '', institution: '', cgpa: '' });
  }
  
  /**
   * Removes an Education entry
   */
  removeEducation(index: number) {
    this.resume.education.splice(index, 1);
  }
  addExperience() {
    this.resume.experience.push({ title: '', company: '', description: '' });
  }
  
  /**
   * Removes an Experience entry
   */
  removeExperience(index: number) {
    this.resume.experience.splice(index, 1);
  }
  addProject() {
    this.resume.projects.push({ title: '', description: '' });
  }
  
  /**
   * Removes a Project entry
   */
  removeProject(index: number) {
    this.resume.projects.splice(index, 1);
  }
  /**
   * Clears the input and generated resume.
   */
  clearDescription() {
    this.description = '';
    this.resume = {};
    this.isGenerated = false;
    this.showTemplate = false;
  }

  /**
   * Submits the resume and triggers the resume template.
   */
  submitResume() {
    console.log('Resume Data:', this.resume);
    this.resumeGenerated.emit(this.resume);
    this.isGenerated = false;
    this.showTemplate = true; // Display the resume template
  }
  
  
}
