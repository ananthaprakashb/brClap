import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {
  //apiHost = 'http://192.168.1.12:8080';
  apiHost = 'http://35.227.255.85';
  apiPath = '/api/v1';

  //wsHost = "192.168.1.12:3000";
  wsHost = "35.227.255.85";
  wsPath = "/ws/v1/pubsub";

  sessionId = 'e8e3e767b4b3b8caa93a18aac989084cbf93ed25b1a03adf3593a80dc5f17f72';
  headers:HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + this.sessionId
  });

  options = { headers: this.headers, withCredentials: true };

  constructor(private http: HttpClient) {

  }

  public getEvents() {
    return this.http.get(this.apiHost + this.apiPath + "/events", this.options);
  }

  public createEvent() {
    return this.http.put(this.apiHost + this.apiPath + "/events", {
      name: "Tamil School Annual Day - 2018"
    }, this.options);
  }

  public getEvent(eventId:string) {
    return this.http.get(this.apiHost + this.apiPath + "/events/" + eventId, this.options);
  }

  public getQR(eventId:string) {
    return this.http.get(this.apiHost + this.apiPath + "/events/" + eventId + "/qr", this.options);
  }

  public getPerformance(eventId:string) {
    return this.http.get(this.apiHost + this.apiPath + "/events/" + eventId + "/performance", this.options);
  }

  public getPerformances(eventId:string) {
    return this.http.get(this.apiHost + this.apiPath + "/performances?eventId=" + eventId, this.options);
  }

  public createPerformance() {
    return this.http.put(this.apiHost + this.apiPath + "/events", {
      name: "basic1"
    }, this.options);
  }

  public claps(eventId:string, performance:Number, count:Number) {
    return this.http.put(this.apiHost + this.apiPath + "/events", {
      name: "testEvent"
    }, this.options);
  }

  ws: WebSocket;
  public connectWS(eventId:string, callback: Function) {
    this.ws= new WebSocket("ws://" + this.wsHost + this.wsPath, this.sessionId + "-" + eventId);

    this.ws.onopen = function() {
        console.log("connection opened");
    }
    this.ws.onmessage = function(packet) {
        //console.log("packet received: " + packet.data);
        callback(JSON.parse(packet.data));
    }
    this.ws.onclose = function() {
        console.log("connection closed");
    }
  }

  public disconnectWS() {
    this.ws.close();
  }
}
