import { ChangeDetectorRef, Component } from '@angular/core';
import { PostData } from '../../../../models/post/post-data';
import { ActivatedRoute } from '@angular/router';
import { PostSource } from '../../../../services/post/post-source';
import { Formatter } from '../../../../services/util/formatter';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MarkdownComponent } from "ngx-markdown";
import { Toc } from '../../../ui/toc/toc';
import { BackArrow } from '../../../shared/back-arrow/back-arrow';
import { Scroller } from '../../../../services/util/scroller';

// PrismJS languages
import 'prismjs/prism.js';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-latex';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-properties';

// PrismJS plugins
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';

@Component({
  selector: 'app-post-content',
  imports: [DatePipe, MatChipsModule, MatIconModule, MarkdownComponent, Toc, BackArrow],
  templateUrl: './post-content.html',
  styleUrl: './post-content.scss',
})
export class PostContent {
  path = '';
  post: PostData | undefined;
  postContent = '';

  constructor(private route: ActivatedRoute, private postSource: PostSource, private formatter: Formatter,
    private http: HttpClient, private cdr: ChangeDetectorRef, private scroller: Scroller) { }

  setUp() {
    // Get post year, month, id and slug
    const year = this.route.snapshot.paramMap.get('year') ?? '';
    const month = this.route.snapshot.paramMap.get('month') ?? '';
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';

    this.getPostMetadata(id);
    this.getPostPath(year, month, id, slug)
    this.getPostContent();
    this.setHeadingsId();

    // After loading content, scroll to current fragment
    this.scroller.scrollToCurrentFragment();
  }

  getPostPath(year: string, month: string, id: string, slug: string) {
    this.path = `/posts/${year}/${month}/${id}_${slug}.md`;
  }

  getPostMetadata(id: string) {
    this.postSource.getPost(Number.parseInt(id)).subscribe(post => {
      // Create a PostData object with post metadata
      this.post = new PostData({
        year: post?.year, month: post?.month, id: post?.id, coverDiagram: post?.coverDiagram, slug: post?.slug, title: post?.title,
        category: post?.category, date: post?.date, description: post?.description, tags: post?.tags
      })
    })
  }

  getPostContent() {
    // Get post using its path
    this.http.get(this.path, { responseType: 'text' })
      .subscribe({
        next: (markdown) => {
          // Split markdown in two (frontmatter and content) and get content
          // If there isn't possible to split, get full markdown
          this.postContent = markdown.split('---').at(2) || markdown;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error while loading post: ', err)
      });
  }

  setHeadingsId() {
    const markdown = document.querySelector('markdown');
    if (!markdown) return;

    const headings = markdown.querySelectorAll('h2, h3, h4, h5, h6');

    for (let heading of headings) {
      // Normalize heading text and set as element ids
      // The ids must be the same as the corresponding fragments
      let id = this.formatter.normalize(heading.innerHTML);
      heading.setAttribute('id', id);
    }
  }
}
