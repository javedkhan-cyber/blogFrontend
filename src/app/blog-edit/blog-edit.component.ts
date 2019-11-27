import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

//Importing route related code
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { BlogHttpService } from '../blog-http.service';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {

  public currentBlog;
  public possibleCategories = ['Comedy', 'Drama', 'Action', 'Technology'];

  constructor(private _route: ActivatedRoute, private router: Router, public blogService: BlogService, public blogHttpService:BlogHttpService,
    private toastr:ToastrService,
    vcr: ViewContainerRef) {

      // this.toastr.setRootViewContainerRef(vcr);

    }

  ngOnInit() {
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
  }

  //EditThisBlog Method
  public editThisBlog():any {
    this.blogHttpService.editBlog(this.currentBlog.blogId, this.currentBlog.subscribe(
      data=>{
        console.log("Blog created");
        console.log(data);
        this.toastr.success('blog Posted Successfully');
        setTimeout(() => {
        this.router.navigate(['/blog', this.currentBlog.blogId]);
        }, 2000);
         },
         error => {
         console.log("Some errr occured");
         console.log(error.errorMessage);
        this.toastr.error('Some error occured', 'Error');
        }
    ));
    }

}
