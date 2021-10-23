import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-learn-together',
  templateUrl: './learn-together.component.html',
  styleUrls: ['./learn-together.component.css'],
})
export class LearnTogetherComponent implements OnInit {
  results: any = [
    {
      title: 'RoboCop (1987) - First Mission (1080p) FULL HD',
      des: 'The Future of Law Enforcement | Richard Eden',
      vidoeUrl: 'https://www.youtube.com/embed/Z931XZ2wfpE',
    },
    {
      title: 'RoboCop (2014) - End This Nightmare Scene (2/10) | Movieclips',
      des: 'The Future of Law Enforcement | Richard Eden',
      vidoeUrl: 'https://www.youtube.com/embed/UFuxiZFwDPs',
    },
    {
      title:
        'RoboCop (1994) | Season 1 | Episode 1 &amp; 2 | The Future of Law Enforcement | Richard Eden',
      des: 'The Future of Law Enforcement | Richard Eden',
      vidoeUrl: 'https://www.youtube.com/embed/iaeTrqdbrwk',
    },
    {
      title: 'RoboCop (1/11) Movie CLIP - It&#39;s Only a Glitch (1987) HD',
      des: 'The Future of Law Enforcement | Richard Eden',
      vidoeUrl: 'https://www.youtube.com/embed/TstteJ1eIZg',
    },
    {
      title:
        'মানুষকে রোবটে রুপান্তর - Robocop 2016 movie review - random video channel - savage420',
      des: 'The Future of Law Enforcement | Richard Eden',
      vidoeUrl: 'https://www.youtube.com/embed/LpAMZ-pQk88',
    },
    {
      title: 'RoboCop (1987) - First Mission (1080p) FULL HD',
      des: 'The Future of Law Enforcement | Richard Eden',
      vidoeUrl: 'https://www.youtube.com/embed/Z931XZ2wfpE',
    },
    {
      title: 'RoboCop (2014) - End This Nightmare Scene (2/10) | Movieclips',
      des: 'The Future of Law Enforcement | Richard Eden',
      vidoeUrl: 'https://www.youtube.com/embed/UFuxiZFwDPs',
    },
    {
      title:
        'RoboCop (1994) | Season 1 | Episode 1 &amp; 2 | The Future of Law Enforcement | Richard Eden',
      des: 'The Future of Law Enforcement | Richard Eden',
      vidoeUrl: 'https://www.youtube.com/embed/iaeTrqdbrwk',
    },
    {
      title: 'RoboCop (1/11) Movie CLIP - It&#39;s Only a Glitch (1987) HD',
      des: 'The Future of Law Enforcement | Richard Eden',
      vidoeUrl: 'https://www.youtube.com/embed/TstteJ1eIZg',
    },
    {
      title:
        'মানুষকে রোবটে রুপান্তর - Robocop 2016 movie review - random video channel - savage420',
      des: 'The Future of Law Enforcement | Richard Eden',
      vidoeUrl: 'https://www.youtube.com/embed/LpAMZ-pQk88',
    },
  ];
  safeUrl: SafeResourceUrl = '';
  constructor(private http: HttpClient) {}

  ngOnInit() {}
}
