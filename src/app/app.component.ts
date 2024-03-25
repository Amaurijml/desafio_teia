import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './service/data.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import _ from 'lodash';



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
  imports: [CommonModule, MatPaginatorModule,MatExpansionModule,MatFormFieldModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  title = 'ng-client';
  photos: Post[] = [];
  para_agrupar : Post[] = [];
  errorMessage!: string;
 // certo até aqui

 
totalItems = 5000;
pageSize = 10;
currentPage = 0;
grouped : any;
groupedId: any;
constructor(private data_service: DataService) {}

items =  this.data_service.getAllPosts(this.currentPage, this.pageSize);
item_todos = this.data_service.getTodos();

 

pageChanged(event: PageEvent) {

  this.currentPage = event.pageIndex ;
  console.log(this.currentPage);
  console.log((this.currentPage  * (this.pageSize) +" "+ this.pageSize));
  this.items = this.data_service.getAllPosts(this.currentPage * (this.pageSize), this.pageSize);

  this.items.subscribe({
    next: (photos) => {
      this.photos = photos;
      },
    error: (error) => {
      this.errorMessage = error;
    },
  });
 
}

buscaAlbum(album: string){
 let albumx = parseFloat(album)
  this.grouped =  this.para_agrupar.filter((x: { albumId: number; }) => x.albumId === albumx);
 // console.log( this.grouped[0].albumId)
}
 
buscaId(id: string){
  let albumy = parseFloat(id)
  this.groupedId =  this.para_agrupar.filter((x: {id: number; }) => x.id === albumy);
  console.log( this.grouped)
}
 

  ngOnInit() {

    this.item_todos.subscribe(
      {
        next: (para_agrupar) => {
          this.para_agrupar = para_agrupar;
       //   this.grouped = _.groupBy(this.para_agrupar, 'albumId');

       // console.log( this.grouped[2][0]);

   //     this.grouped =  this.para_agrupar.filter((x: { id: number; }) => x.id === 53);
   //     console.log( this.grouped);
    //    this.grouped =  this.para_agrupar.filter((x: { albumId: number; }) => x.albumId === 50);
   //     console.log( this.grouped);
        
       // this.grouped = this.grouped.filter((x: { id: number; }) => x.id === 2);
     //   console.log( this.grouped);
        
        },
        error: (error) => {
          this.errorMessage = error;
        },
        
      }
    );
      

    this.items.subscribe({
      next: (photos) => {
        this.photos = photos;
       // console.log((this.currentPage + (this.pageSize -1) +" "+ this.pageSize));

       // this.grouped = this.photos.filter((x: { id: number; }) => x.id === 3);
       // console.log( this.grouped);
       // console.log(  this.photos);
      },
      error: (error) => {
        this.errorMessage = error;
      },
    });
  }
}