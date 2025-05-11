import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  // load all the categories
  public categories() {
    return this.http.get(`${baseUrl}/category/`);
  }

  // get single category
  public getCategory(cid: any) {
    return this.http.get(`${baseUrl}/category/${cid}`);
  }

  // add new category
  public addCategory(category: any) {
    return this.http.post(`${baseUrl}/category/`, category)
  }

  // delete category
  public deleteCategory(cid: any) {
    return this.http.delete(`${baseUrl}/category/${cid}`);
  }

  // update category
  public updateCategory(category: any) {
    return this.http.put(`${baseUrl}/category/`, category);
  }

}
