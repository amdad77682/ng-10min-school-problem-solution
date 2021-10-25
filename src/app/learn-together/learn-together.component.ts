import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VIDEOS } from '../util/videos';
import { Ivideo } from '../util/video.model';
@Component({
  selector: 'app-learn-together',
  templateUrl: './learn-together.component.html',
  styleUrls: ['./learn-together.component.css'],
})
export class LearnTogetherComponent implements OnInit {
  results: Ivideo[] = VIDEOS;
  safeUrl: SafeResourceUrl = '';
  preview: Ivideo = VIDEOS[0];
  constructor(private http: HttpClient) {}

  ngOnInit() {}
  onClickVideo = (video: Ivideo) => {
    this.preview = video;
  };
}
