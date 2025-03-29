import { Component, Input, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-resume-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume-template.component.html',
  styleUrls: ['./resume-template.component.css'],
})
export class ResumeTemplateComponent implements AfterViewInit {

  @Input() resume = {
    fullName: 'Anwesha Pal',
    email: 'anwesha@example.com',
    phoneNumber: '6296714722',
    location: 'Kolkata, India',
    linkedin: 'anweshapal02',
    github: 'anweshapal121',
    education: [
      {
        degree: 'B.Sc in Computer Science',
        institution: 'Netaji Subhash Engineering College',
        cgpa: '8.5',
      },
      {
        degree: 'M.Sc in Data Science',
        institution: 'ABC University',
        cgpa: '9.0',
      },
    ],
    summary:
      'Passionate Full-Stack Developer specializing in Java, Spring Boot, and Angular, eager to contribute to innovative projects and collaborate effectively in a team environment.',
    languages: 'Java, C++, Angular, Spring Boot, AI, Python, Docker',
    experience: [
      {
        title: 'AI Engineer',
        company: 'AI Solutions',
        location: 'Kolkata, India',
        duration: 'Jan 2022 - Present',
        description:
          'Developing AI-driven solutions using Spring Boot and Angular, optimizing performance, and implementing machine learning models.',
      },
      {
        title: 'Software Developer Intern',
        company: 'Tech Innovators',
        location: 'Remote',
        duration: 'Jun 2021 - Dec 2021',
        description:
          'Assisted in building web applications, improving code efficiency, and collaborating with cross-functional teams.',
      },
    ],
    certifications: 'Anudip Foundation - Java Full Stack Developer',
    projects: [
      {
        title: 'AI-Based Resume Screening System',
        description:
          'Built an intelligent resume screening platform using Spring Boot, Spring AI, and Angular to streamline candidate evaluation.',
      },
      {
        title: 'Machine Learning Pipeline',
        description:
          'Implemented a scalable ML pipeline for predictive analysis, improving data processing efficiency.',
      },
      {
        title: 'E-Commerce Platform',
        description:
          'Developed a comprehensive e-commerce platform with secure payment gateways and user authentication.',
      },
    ],
  };

  @ViewChild('resumeContainer', { static: false }) resumeContainer!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    console.log("Resume Template Initialized");
  }

  async downloadAsPDF() {
    if (!this.resumeContainer) {
      console.error('Error: Resume container is undefined!');
      return;
    }

    window.scrollTo(0, 0); // Ensure full content is visible

    const data = this.resumeContainer.nativeElement;

    // Apply styles before capturing
    this.renderer.setStyle(data, 'background', '#1e3c72'); 
    this.renderer.setStyle(data, 'color', 'white'); 
    this.renderer.setStyle(data, 'padding', '20px');
    this.renderer.setStyle(data, 'borderRadius', '16px');
    this.renderer.setStyle(data, 'overflow', 'visible');
    this.renderer.setStyle(data, 'min-height', '100vh'); // Ensures full-page color

    await new Promise(resolve => setTimeout(resolve, 500)); // Allow rendering time

    html2canvas(data, {
      backgroundColor: null, // Fixes background duplication issue
      scale: 2,  
      useCORS: true,
      logging: false,
      scrollX: 0,
      scrollY: 0,
      windowWidth: document.documentElement.scrollWidth,
      windowHeight: data.scrollHeight,
      height: data.scrollHeight 
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 297;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let yPosition = 0;
      let firstPage = true; // Ensure first page is added properly

      while (yPosition < imgHeight) {
        if (!firstPage) pdf.addPage();
        firstPage = false;

        pdf.setFillColor(30, 60, 114); // Set blue background
        pdf.rect(0, 0, imgWidth, pageHeight, 'F'); // Fill full page

        pdf.addImage(imgData, 'PNG', 0, -yPosition, imgWidth, imgHeight);
        yPosition += pageHeight;
      }

      pdf.save('resume.pdf');

      // Restore styles after PDF generation
      this.renderer.removeStyle(data, 'background');
      this.renderer.removeStyle(data, 'color');
      this.renderer.removeStyle(data, 'padding');
      this.renderer.removeStyle(data, 'borderRadius');
      this.renderer.removeStyle(data, 'overflow');
      this.renderer.removeStyle(data, 'min-height');
    }).catch((error) => {
      console.error('Error generating PDF:', error);
    });
  }
}
