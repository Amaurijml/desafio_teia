import { HttpClient , HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

interface Post {
  albumId: number;
  id: number;
  title: string;
  url : string;
  thumbnailUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = 'https://jsonplaceholder.typicode.com/photos/';

 

  constructor(private http: HttpClient) {}

  getAllPosts(offset?: number, pageSize?: number): Observable<Post[]> {
    const params = new HttpParams({
      fromObject: {
        _start: offset ?? 0,
        _limit: pageSize ?? 10,
      },
    });

    return this.http.get<Post[]>(this.apiUrl,{ params});
  }

  getTodos(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

}








// funcionando ate aqui 2
/*
this.currentPage, this.pageSize
getTodoItems(offset?: number, pageSize?: number): Observable<TodoItem[]> {
  const params = new HttpParams({
    fromObject: {
      _start: offset ?? 0,
      _limit: pageSize ?? 10,
    },
  });

  return this._http.get<TodoItem[]>(
    "https://jsonplaceholder.typicode.com/todos",
    { params }
*/