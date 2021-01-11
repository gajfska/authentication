import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({providedIn: 'root'})
export class CatService {

    constructor(private http: HttpClient) { }

    apiURL: string = 'https://api.thecatapi.com/v1/images/search';
    selectedAPI: string = this.apiURL;
    link: any;
    myapikey="4626cec2-da01-481d-9b6d-6bb6727a4c46";

    headerDict = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': this.myapikey,
    };

    requestOptions = {
        headers: new HttpHeaders (this.headerDict),
    };

    getData(){
        let headers = new Headers;
        headers.append('x-api-key', '4626cec2-da01-481d-9b6d-6bb6727a4c46');

        return this.http.get(this.selectedAPI, this.requestOptions)
            .subscribe(
            data => {
                this.link = data[0].url;
            }
        );
    }
}