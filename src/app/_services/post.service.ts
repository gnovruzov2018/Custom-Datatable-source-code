import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../_models/post';
import { Comment } from '../_models/comment';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  posts: Post[];
  baseUrl = 'https://jsonplaceholder.typicode.com/';

  constructor(private http: HttpClient, private alertify: AlertifyService) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl + 'posts');
  }

  getComments(id): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.baseUrl + 'comments?postId=' + id);
  }
}
