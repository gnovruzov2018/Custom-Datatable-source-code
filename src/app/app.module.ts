import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PaginationModule, ModalModule, BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { PostsComponent } from './posts/posts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostService } from './_services/post.service';
import { HomeComponent } from './home/home.component';
import { AlertifyService } from './_services/alertify.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { CommentsModalComponent } from './posts/comments-modal/comments-modal.component';
import { AuthService } from './_services/auth.service';
import { AuthGuard } from './_guards/auth.guard';

@NgModule({
   declarations: [
      AppComponent,
      PostsComponent,
      NavbarComponent,
      HomeComponent,
      CommentsModalComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot(appRoutes),
      PaginationModule.forRoot(),
      ModalModule.forRoot(),
      BsDropdownModule.forRoot()
   ],
   providers: [
      PostService,
      AlertifyService,
      AuthService,
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
