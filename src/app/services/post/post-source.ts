import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formatter } from '../util/formatter';
import { PostData } from '../../models/post/post-data';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostSource {
  postsIndex = "posts-index.json";

  constructor(private http: HttpClient, private formatter: Formatter) { }

  getPosts() {
    return this.http.get<PostData[]>(this.postsIndex);
  }

  getPostsByCategory(category: string | null) {
    return this.http.get<PostData[]>(this.postsIndex).pipe(
      // Filter posts by the normalized category name
      map(posts => posts.filter(post => this.formatter.normalize(post.category) == category))
    );
  }

  getPostsByTag(tag: string | null) {
    if (!tag) return;

    return this.http.get<PostData[]>(this.postsIndex).pipe(
      // Filter posts by the normalized tag name
      map(posts => posts.filter(post => post.tags.some(t =>
        this.formatter.normalize(t) === tag
      )))
    );
  }

  getPost(id: number) {
    return this.http.get<PostData[]>(this.postsIndex)
      .pipe(map(posts => posts.find(post => post.id == id)));
  }
}
