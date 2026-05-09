import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostData } from '../../../../models/post/post-data';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PostSource } from '../../../../services/post/post-source';
import { PostPreview } from '../post-preview/post-preview';

@Component({
  selector: 'app-post-list',
  imports: [MatPaginatorModule, PostPreview],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})
export class PostList implements OnInit {
  posts: PostData[] = [];
  pageSize = 5;
  pageIndex = 0;
  showFirstLastButtons = true;

  constructor(private postSource: PostSource, private cdr: ChangeDetectorRef, private matPaginatorIntl: MatPaginatorIntl) { }

  ngOnInit(): void {
    this.setUpPaginator();
    this.getPosts();
  }

  setUpPaginator() {
    // Change paginator texts
    this.matPaginatorIntl.itemsPerPageLabel = "Artigos por página:";
    this.matPaginatorIntl.firstPageLabel = "Primeira página";
    this.matPaginatorIntl.previousPageLabel = "Página anterior";
    this.matPaginatorIntl.nextPageLabel = "Próxima página";
    this.matPaginatorIntl.lastPageLabel = "Última página";
  }

  getPosts() {
    this.postSource.getPosts().subscribe(posts => {
      this.posts = posts;
      this.cdr.detectChanges();
    });
  }

  getPagedPosts() {
    // Get the number of posts defined by the paginator
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;

    return this.posts.slice(start, end);
  }

  handlePageEvent(e: PageEvent) {
    // Change the page size and index when an event occurs
    // Page size and index must match the current state of the page
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }
}
