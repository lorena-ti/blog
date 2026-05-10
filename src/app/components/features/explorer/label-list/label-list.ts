import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PostSource } from '../../../../services/post/post-source';
import { TitleCasePipe } from '@angular/common';
import { Formatter } from '../../../../services/util/formatter';

@Component({
  selector: 'app-label-list',
  imports: [MatButtonModule, MatChipsModule, MatIconModule, RouterLink, TitleCasePipe],
  templateUrl: './label-list.html',
  styleUrl: './label-list.scss',
})
export class LabelList {
  path: string = '';
  data: string[] = [];

  constructor(private activatedRoute: ActivatedRoute, private postSource: PostSource,
    private cdr: ChangeDetectorRef, public formatter: Formatter) { }

  ngOnInit(): void {
    this.getItemsByRouteType();
  }

  getItemsByRouteType() {
    this.activatedRoute.data.subscribe(routeData => {
      const type = routeData['type'];

      // Get categories or tags depending on route type
      if (type == 'category') {
        this.path = 'categorias';
        this.getCategories();
      } else {
        this.path = 'tags';
        this.getTags();
      };
    });
  }

  getCategories() {
    this.postSource.getPosts().subscribe(posts => {
      posts.forEach(post => {
        // Add category only if it wasn't added yet
        if (!this.data.includes(post.category)) {
          this.data.push(post.category);
          this.cdr.detectChanges();
        };
      })
    });
  }

  getTags() {
    this.postSource.getPosts().subscribe(posts => {
      posts.forEach(post => {
        // Iterate over each one of the tags of each post
        post.tags.map(tag => {
          // Add tag only if it wasn't added yet
          if (!this.data.includes(tag)) {
            this.data.push(tag);
            this.cdr.detectChanges();
          };
        })
      })
    });
  }
}
