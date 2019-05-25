import { Component, OnInit, TemplateRef } from '@angular/core';
import { PostService } from './../_services/post.service';
import { Post } from '../_models/post';
import { Comment } from '../_models/comment';
import { AlertifyService } from './../_services/alertify.service';
import { forEach } from '@angular/router/src/utils/collection';
import { Pagination, PaginatedResult } from './../_models/pagination';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[];
  comments: Comment[];
  keyword: string;
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 15;
  modalRef: BsModalRef;
  test: number;

  constructor(private postService: PostService,
              private alertify: AlertifyService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.loadPosts();
  }

  loadPosts() {
    const paginatedResult: PaginatedResult<Post[]> = new PaginatedResult<Post[]>();
    this.postService.getPosts()
      .subscribe(
    (posts: Post[]) => {
      this.posts = this.paginate(posts, this.pageNumber, this.pageSize).result;
      this.pagination = this.paginate(posts, this.pageNumber, this.pageSize).pagination;
    }, error => {
      console.log(error);
      this.alertify.error(error);
    });
  }
  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.loadPosts();
  }

  paginate (posts: Post[], page?: number, pageSize?: number) {
    const paginatedResult: PaginatedResult<Post[]> = new PaginatedResult<Post[]>();
    const pagin: Pagination = {
      currentPage: page,
      itemsPerPage: pageSize,
      totalItems: posts.length,
      totalPages: posts.length / pageSize
    };

    paginatedResult.pagination = pagin;
    this.pagination = paginatedResult.pagination;
    --page; // because pages logically start with 1, but technically with 0
    paginatedResult.result = posts.slice(page * pageSize, (page + 1) * pageSize);
    return paginatedResult;
  }

  onKeyUp(event: any) {
    this.keyword = event.target.value;
    if (!this.keyword.replace(/\s/g, '').length) {
      this.loadPosts();
    } else {
      this.globalSearch(this.keyword);
    }
    console.log(this.keyword);
  }

  onChangePageSize(deviceValue) {
    this.pageNumber = 1;
    this.pageSize = deviceValue;
    this.loadPosts();
}

  async globalSearch(keyword: string) {
    for (let i = 0; i < this.posts.length; i++) {
      if (!this.aContainsB(this.posts[i].id.toString(), keyword)
      && !this.aContainsB(this.posts[i].title, keyword)) {
        this.posts.splice(i, 1);
      }
    }
    console.log(this.posts.slice());
  }

  aContainsB (a, b) {
    return a.indexOf(b) >= 0;
  }

  loadComments(id) {
    alert(id);
  }

  openModal(template: TemplateRef<any>, id: number) {
    this.comments = [];
    this.postService.getComments(id).subscribe(
      (comments: Comment[]) => {
        this.comments = comments;
      }, error => {
        console.log(error);
        this.alertify.error(error);
      });
    this.modalRef = this.modalService.show(template,
      Object.assign({}, { class: 'gray modal-lg' }));
  }

}
