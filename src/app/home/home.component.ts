import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { BehaviorSubject, Subscription, from, map, mergeMap, of, skip } from 'rxjs';
import  {WebApi}  from '../../vendor/endymion';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  endy:any;
  data:any[] = [];
  message:any[] =[];
  currentStep = 1;
  currentOlogramId:number = -1;
  stepS = new BehaviorSubject(-1);
  step$ = this.stepS.asObservable();
  statusS = new BehaviorSubject<{id:number, status:any}>({} as {id:number, status:any});
  status$ = this.statusS.asObservable();
  dataRefresherS = new BehaviorSubject(0);
  dataRefresher$ = this.dataRefresherS.asObservable();
  subs:Subscription[] = [];
  constructor(private apiService:HomeService){
    if(!(window as any).vuplex){
      (window as any).vuplex = {
        postMessage:()=>{},
        addEventListener:()=>{}
      };
    }
    this.endy = new WebApi();
    this.dataRefresherS.next(0);
    this.subs.push(this.lista$.subscribe(r=>r));
  }

  statusSetted$ = this.status$.pipe(
    skip(1),
    map((el: {id:number, status:any})=>{
      this.data.forEach(e=>{
        if(e.id == el.id){
          e.checked = el.status;
          e.ologram.color = (el.status)? { r:29, g:242, b:40, a:0.4 } : { r:242, g:29, b:29, a:0.4 };
        }
      });
      return this.data;
    })
  ).subscribe(r=>r);

  visibility$ = this.step$.pipe(
    skip(1),
    map((step)=>{
      this.data.forEach(e=>{
        e.visible = (e.id == step);

        if(e.visible){
          if(this.currentOlogramId != -1){
            this.endy.destroyObject(this.currentOlogramId);
          }
         this.currentOlogramId = e.id;
         this.endy.createObject(e.id, 
                                e.ologram.primitive, 
                                e.ologram.position, 
                                e.ologram.rotation, 
                                e.ologram.scale);
          this.endy.setColor(e.id, e.ologram.color);

         }
      })
      return step;
    })
  ).subscribe(r=>r);

lista$ = this.dataRefresher$.pipe(
  map(()=> this.message.push('refreshing data')),
    mergeMap(()=>this.apiService.lista$),
    map((lista)=>{
      var result:any = [];
      lista.forEach((e:any)=>{
        result.push({
          ...e,
          visible:false
        });
      });
      return result;
    }),
    map((result:any)=>{
      this.data = result;
     this.message.push('data refreshed');
      this.message.push(this.data);
      this.stepS.next(this.currentStep);
    })
  )

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
  forward(compoId:number){
    if(this.currentStep < this.data.length){
        this.currentStep++;
        this.stepS.next(this.currentStep);
    }
  }
  ngOnDestroy(){
    this.visibility$.unsubscribe();
  }
}
