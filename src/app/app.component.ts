import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResumeComponent } from "./resume/resume.component";
import { ResumeInputComponent } from "./resume-input/resume-input.component";

import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ResumeComponent, ResumeInputComponent],
  templateUrl: './app.component.html',

  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Airesume';
  resume: any = {};
  
}
