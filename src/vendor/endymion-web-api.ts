
import { Subject } from 'rxjs';
class EndymionWebApi{
    vuplex:any;
    messageIn = new Subject();
    messageIn$ = this.messageIn.asObservable();
    objectId = 0;
    constructor(){
        this.vuplex = (window as any).vuplex;
        // if (this.vuplex == undefined 
        //     || this.vuplex ==='' 
        //     || this.vuplex === null) console.log("vuplex is not setted");

        (window as any).vuplex.addEventListener('message', (event:any)=>{
            this.messageIn.next(event.data);
        });
               
    }

    createAction = (actName:string, actPayload:any) =>{
        var act = {
            name: actName,
            payload: actPayload
        };
        return act;
    }

    sendAction = (name:string, payload:any)=>{
        let jsonAction = this.createAction(name, payload);
        (window as any).vuplex.postMessage(jsonAction);
    }
    
    sendActions = (actionArray:any[]) =>{
        var jsonAction = this.createAction('multi-action', actionArray);
        (window as any).vuplex.postMessage(jsonAction);
    }
    destroyObject = (objectId:number)=>{
        this.sendAction(
            'destroy-object',
            {
                id: objectId
            }
        );
    }
    createObject = (primitive:any, position:any, rotation:any, scale:any)=>{
        this.objectId++;
        this.sendAction(
            'create-primitive',
            {
                id: this.objectId,
                primitive: primitive,
                position: position,
                rotation: rotation,
                scale: scale
            }
        );
        return this.objectId;
    }

}
export { EndymionWebApi }