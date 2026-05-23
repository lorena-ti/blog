import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { PostData } from '../../../../models/post/post-data';
import { Router } from '@angular/router';
import { MarkdownComponent } from "ngx-markdown";

@Component({
  selector: 'app-post-preview',
  imports: [DatePipe, MatCardModule, MatChipsModule, MarkdownComponent],
  templateUrl: './post-preview.html',
  styleUrl: './post-preview.scss',
})
export class PostPreview {
  @Input() post?: PostData;

  constructor(private router: Router) { }

  openPost() {
    // When a post is selected, change the route to /artigos/:year/:month/:id/:slug
    this.router.navigate(['artigos', this.post?.year, this.post?.month, this.post?.id, this.post?.slug]);
  }
}
