import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [ ApiService ]
})
export class EventComponent implements OnInit {
  id: string;
  events: any = {};
  performancesMap: any= {};
  performances: any= [];

  qr_src: string = "";

  private sub: any;

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.api.getEvent(this.id).subscribe((response)=>{
        this.events = response;
      });
      /*this.api.getQR(this.id).subscribe((response)=>{
        this.qr_src = response["url"];
      });*/
      this.api.getPerformances(this.id).subscribe((response)=>{
        this.performancesMap = response["performances"];
        let ids = Object.keys(this.performancesMap);
        this.performances = ids.map(id=>this.performancesMap[id]);
      });

      this.api.connectWS(this.id, (msg)=> {
         try {
           let obj = this.performancesMap[msg.performanceId];
           obj.claps = msg.claps;
           obj.likes = msg.likes;
         } catch(e) {

         }
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.api.disconnectWS();
  }
}
