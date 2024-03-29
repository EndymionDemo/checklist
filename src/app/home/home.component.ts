import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { BehaviorSubject, Subscription, from, map, mergeMap, of, skip, tap } from 'rxjs';
import { En } from '../../vendor/lib/modules/endymion/en';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  endy: any;
  data: any[] = [];
  message: any[] = [];
  currentStep = 1;
  // currentObjectId:number = -1;
  // currentObjectArrayLength:number = 0;
  ologramIdWillBeDeleted: number[] = [];
  stepS = new BehaviorSubject(-1);
  step$ = this.stepS.asObservable();
  statusS = new BehaviorSubject<{ id: number, status: any }>({} as { id: number, status: any });
  status$ = this.statusS.asObservable();
  dataRefresherS = new BehaviorSubject(0);
  dataRefresher$ = this.dataRefresherS.asObservable();
  subs: Subscription[] = [];

  constructor(private apiService: HomeService) {
    this.endy = new En();
    this.dataRefresherS.next(0);
    this.subs.push(this.lista$.subscribe(r => r));
  }

  statusSetted$ = this.status$.pipe(
    skip(1),
    map((el: { id: number, status: any }) => {
      this.data.forEach(e => {
        if (e.id == el.id) {
          e.checked = el.status;
          e.olograms.forEach((ologram: any) => {
            if (ologram.colourable) {
              ologram.color = (el.status) ? { r: 29, g: 242, b: 40, a: 0.4 } : { r: 242, g: 29, b: 29, a: 0.4 };
            }
          });
        }
      });
      return this.data;
    })
  ).subscribe(r => r);

  visibility$ = this.step$.pipe(
    skip(1),
    map((step) => {
      this.data.forEach(e => {

        e.visible = (e.id == step);
        if (e.visible) {
          if (this.ologramIdWillBeDeleted.length > 0) {
            this.ologramIdWillBeDeleted.forEach((ologramId: any) => {
              this.endy.core.destroyObject(ologramId);
            });
            this.ologramIdWillBeDeleted = [];
          }
          e.olograms.forEach((ologram: any) => {
            let cube = this.endy.cube();

            cube.setId(ologram.ologramId)
              .setPos(ologram.position.x, ologram.position.y, ologram.position.z)
              .setRot(ologram.rotation.x, ologram.rotation.y, ologram.rotation.z)
              .setScale(ologram.scale.x, ologram.scale.y, ologram.scale.z)
              .setColor(ologram.color)
              .create();
            this.ologramIdWillBeDeleted.push(ologram.ologramId);
          });
        }
      })
      return step;
    })
  ).subscribe(r => r);

  lista$ = this.dataRefresher$.pipe(
    mergeMap(() => this.apiService.lista$),
    map((lista) => {
      var result: any = [];
      lista.forEach((e: any) => {
        result.push({
          ...e,
          visible: false
        });
      });
      return result;
    }),
    map((result: any) => {
      this.data = result;
      this.stepS.next(this.currentStep);
    })
  )

  check = (compoId: number) => {
    this.statusS.next({ id: compoId, status: true });
    if (this.currentStep < this.data.length) {
      this.currentStep++;
      this.stepS.next(this.currentStep);
    }
  }
  miss = (compoId: number) => {
    this.statusS.next({ id: compoId, status: false });
    if (this.currentStep < this.data.length) {
      this.currentStep++;
      this.stepS.next(this.currentStep);
    }
  }
  back(compoId: number) {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.stepS.next(this.currentStep);
    }
  }
  forward(compoId: number) {
    if (this.currentStep < this.data.length) {
      this.currentStep++;
      this.stepS.next(this.currentStep);
    }
  }
  ngOnDestroy() {
    this.visibility$.unsubscribe();
  }
}
