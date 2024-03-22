import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './service/data.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';

interface Post {
  albumId: number;
  id: number;
  title: string;
  url : string;
  thumbnailUrl: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule,MatExpansionModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ng-client';
  photos: Post[] = [];
  errorMessage!: string;
 // certo até aqui

totalItems = 5000;
pageSize = 10;
currentPage = 0;

constructor(private data_service: DataService) {}

items =  this.data_service.getAllPosts(this.currentPage, this.pageSize);

pageChanged(event: PageEvent) {

  this.currentPage = event.pageIndex ;
  console.log(this.currentPage);
  console.log((this.currentPage  * (this.pageSize) +" "+ this.pageSize));
  this.items = this.data_service.getAllPosts(this.currentPage * (this.pageSize), this.pageSize);


 // this.items = this.data_service.getAllPosts(this.currentPage, this.pageSize);
  this.items.subscribe({
    next: (photos) => {
      this.photos = photos;
      //console.log(this.photos);
    },
    error: (error) => {
      this.errorMessage = error;
    },
  });
 
 //console.log("pagina" + this.currentPage);
}

 

  ngOnInit() {
    this.items.subscribe(result => {console.log(result.length)});
    this.items.subscribe({
      next: (photos) => {
        this.photos = photos;
        console.log((this.currentPage + (this.pageSize -1) +" "+ this.pageSize));
      //  console.log(this.photos);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }
}