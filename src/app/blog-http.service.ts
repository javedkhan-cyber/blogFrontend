import { Injectable } from '@angular/core';
//Importing Http client to make the requests

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
//import observables related code.
import { Observable } from "rxjs";
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';

@Injectable({
  providedIn: 'root'
})
export class BlogHttpService {

  public allBlogs;
  public currentBlogs;
  public baseUrl = "https://blogapp.edwisor.com/api/v1/blogs";
  public authToken = "MmIxZWYyMjIzMTFiMjY3ZDZkNGQ3OGNiM2JkYWNjZTkwMmRjNjFjMGIzNmVkNzdiZWQzZjY4OGM1YmY5OGY3Nzc0Zjc0NjVkN2E4ZmM5MjQ2MWRmNWNjNmFiMzhiNzYyODhlMWU4MjMzNzEwOGZlMWI4NjkzZWVjNjE1MzUwZWYxMw==";


  constructor(private _http:HttpClient) { 
    console.log("blog-http service called");
  }

  //create blog Method
  public createBlog(blogData): any {
    let myResponse = this._http.post(this.baseUrl+'/create'+'?authToken='+this.authToken, blogData);
    return myResponse;
  }//end create Blog

  //Delete blog method
  public deleteBlog(blogId): any {
    let data = {};
    let myResponse = this._http.post(this.baseUrl+'/'+blogId+'/delete'+'?authToken='+this.authToken, blogId);
    return myResponse;
  }//end delete method

  //edit blog method
  public editBlog(blogId, blogData): any {
    let myResponse = this._http.post(this.baseUrl+'/'+blogId+'/edit'+'?authToken='+this.authToken, blogData);
    return myResponse;
  }//end of edit method

  //method to return all the Blogs
  public getAllBlogs():any{
    let myResponse = this._http.get(this.baseUrl+'/all?authToken=MmIxZWYyMjIzMTFiMjY3ZDZkNGQ3OGNiM2JkYWNjZTkwMmRjNjFjMGIzNmVkNzdiZWQzZjY4OGM1YmY5OGY3Nzc0Zjc0NjVkN2E4ZmM5MjQ2MWRmNWNjNmFiMzhiNzYyODhlMWU4MjMzNzEwOGZlMWI4NjkzZWVjNjE1MzUwZWYxMw==');
    console.log(myResponse);
    return myResponse;
  }

  //method to get particular blog
  public getSingleBlogInformation(currentBlogId): any {
    let myResponse = this._http.get(this.baseUrl+ '/view' + '/' + currentBlogId + '?authToken=' + this.authToken);
    return myResponse;


  }//end get blog information function
}
