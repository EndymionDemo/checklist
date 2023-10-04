import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { BehaviorSubject, Subscription, map, skip } from 'rxjs';
import * as EndymionWebApi from '../../vendor/endymion-web-api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  endy:any;
  data:any[] = [];
  currentStep = 1;
  treDId:number = -1;
  stepS = new BehaviorSubject(-1);
  step$ = this.stepS.asObservable();
  statusS = new BehaviorSubject<{id:number, status:any}>({} as {id:number, status:any});
  status$ = this.statusS.asObservable();
  subs:Subscription[] = [];

  statusSetted$ = this.status$.pipe(
    skip(1),
    map((status: {id:number, status:any})=>{
      this.data.forEach(e=>{
        e.checked = (e.id == status.id)?status.status : e.checked;
      });
      return this.data;
    })
  ).subscribe(r=>r);

  visibility$ = this.step$.pipe(
    skip(1),
    map((step)=>{
      this.data.forEach(e=>{
        ;
        e.visible = (e.id == step);

        if(e.visible){
          if(this.treDId != -1){
            this.endy.destroyObject(this.treDId);
          }
         this.treDId = this.endy.createObject(e.ologram.primitive, 
                                              e.ologram.position, 
                                              e.ologram.rotation, 
                                              e.ologram.scale);
        }
      })
      return step;
    })
  ).subscribe(r=>r);

  lista$ = this.apiService.lista$.pipe(
    map((lista)=>{
      var result:any = [];
      lista.forEach(e=>{
        result.push({
          ...e,
          visible:false
        });
      });
      return result;
    }),
    map((result:any)=>{
      this.data = result;
      this.stepS.next(this.currentStep);
    })
  )

  constructor(private apiService:HomeService){
    if(!(window as any).vuplex){
      (window as any).vuplex = {
        postMessage:()=>{},
        addEventListener:()=>{}
      };
    }
    this.endy = new EndymionWebApi.EndymionWebApi();
    this.subs.push(this.lista$.subscribe(r=>r));
  }
  ngOnInit(){

  }

  check = (compoId:number)=>{
    this.statusS.next({id:compoId, status:true});
    if(this.currentStep < this.data.length){
      this.currentStep++;
      this.stepS.next(this.currentStep);
    }
  }
  miss = (compoId:number)=>{
    this.statusS.next({id:compoId, status:false});
    if(this.currentStep < this.data.length){
      this.currentStep++;
      this.stepS.next(this.currentStep);
    }
  }
  back(compoId:number){
    if(this.currentStep >1){
        this.currentStep--;
        this.stepS.next(this.currentStep);
    }
  }
  ngOnDestroy(){
    this.visibility$.unsubscribe();
  }
}
