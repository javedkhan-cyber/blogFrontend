import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { BlogHttpService } from '../blog-http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {

  constructor(private blogHttpService: BlogHttpService,
    public blogTitle: string,
    public blogBodyHtml: string,
    public blogDescription: string,
    public blogCategory: string,
    public possibleCategories = ['Comedy', 'Drama', 'Action', 'Technology'],
    private _route: ActivatedRoute, private router: Router,
    private toastr:ToastsManager,
    vcr: ViewContainerRef) {

      this.toastr.setRootViewContainerRef(vcr);
    
   }

  ngOnInit() {
  }

  //create blogData method
  public createBlog():any {
    let blogData = {
      title : this.blogTitle,
      description : this.blogDescription,
      blogBody : this.blogBodyHtml,
      category : this.blogCategory
    }
  //end blogData method

  console.log(blogData);


  //create blog method
  this.blogHttpService.createBlog(blogData).subscribe(

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
  }//end blogCreate method
}
