import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

//Importing route related code
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { BlogHttpService } from '../blog-http.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css'],
  providers: [Location]
})
export class BlogViewComponent implements OnInit, OnDestroy {

  //empty object
  public currentBlog;

  

  constructor(private _route: ActivatedRoute, private router: Router, public blogService: BlogService, public blogHttpService:BlogHttpService,
    private toastr:ToastrService,
    private vcr: ViewContainerRef,
    private location: Location) {
      // this.toastr.setRootViewContainerRef(vcr);
      
    console.log("blog-view constructor is called");
  }

  ngOnInit() {
    console.log("Blog-view OnInt called");
    //Getting the blog id from the route
    let myBlogId = this._route.snapshot.paramMap.get('blogId');
    console.log(myBlogId);
    //calling the function to get the blog with this blogId out of the overall array
    this.currentBlog = this.blogHttpService.getSingleBlogInformation(myBlogId).subscribe(
      data => {
        console.log(data);
        this.currentBlog = data["data"];
      },
      error => {
        console.log("some error occured");
        console.log(error.errorMessage);
      }
    );
    console.log(this.currentBlog);
  }

  ngOnDestroy() {
    console.log("blog-view Destroyed");
  }


  //DeleteThisblog method here
  public deleteThisBlog():any {
    this.blogHttpService.deleteBlog(this.currentBlog.blogId).subscribe(
      data=>{
        console.log("Blog created");
        console.log(data);
        this.toastr.success('blog Posted Successfully');
        setTimeout(() => {
        this.router.navigate(['/blog', data.data.blogId]);
        }, 2000);
         },
         error => {
         console.log("Some errr occured");
         console.log(error.errorMessage);
        this.toastr.error('Some error occured', 'Error');
        }
    )
  }

  //GoTo PreviousPage method
  public goBackToPreviousPage(): any {
    this.location.back();
  }

}
