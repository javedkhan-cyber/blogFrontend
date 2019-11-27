import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';


//router module used for setting up the application level routing
import { RouterModule, Routes } from '@angular/router';


import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BlogViewComponent } from './blog-view/blog-view.component';
import { BlogCreateComponent } from './blog-create/blog-create.component';
import { BlogEditComponent } from './blog-edit/blog-edit.component';
//import statement for service
import { BlogService } from './blog.service';
import { BlogHttpService } from './blog-http.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';



//Decorators
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogViewComponent,
    BlogCreateComponent, 
    BlogEditComponent,
    AboutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    //routerModule forRoot nethod to declare the possible routes in application
    RouterModule.forRoot([
      {path: 'home', component:HomeComponent},
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'about', component:AboutComponent},
      {path: 'blog/:blogId', component:BlogViewComponent},
      {path: 'create', component:BlogCreateComponent},
      {path: 'edit/:blogId', component:BlogEditComponent},
      {path: '**', component:NotFoundComponent}
    ])
  ],
  providers: [BlogService, BlogHttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
  
}
