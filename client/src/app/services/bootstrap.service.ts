import { Injectable } from "@angular/core";
import { Route } from "../interfaces/route";
import { environment } from "src/environments/environment";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BootstrapService {

  public routes: Route[];

  constructor(private http: HttpClient) {}

  load(): Promise<boolean> {

    return new Promise<boolean>((resolve) => {
        this.http.get(environment.urls.getRoute).subscribe((data:Route[]) => {
              this.routes = data;
              resolve(true);
          });
    });

  }

}