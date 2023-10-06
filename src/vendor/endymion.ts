
import { Subject } from 'rxjs';
import { primitive, position, rotation, scale, TransformType, TransformGreatness, Color } from './types';


class WebApi{
    vuplex:any;
    messageIn = new Subject();
    messageIn$ = this.messageIn.asObservable();
    objectId = 0;
    constructor(){
        this.vuplex = (window as any).vuplex;
        if (this.vuplex == undefined 
            || this.vuplex ==='' 
            || this.vuplex === null) console.log("vuplex is not setted");

        (window as any).vuplex.addEventListener('message', (event:any)=>{
            this.messageIn.next(event.data);
        });
               
    }

    createAction = (actName:string, actPayload:any):any =>{
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
    createObject = (objectId:number, primitive:primitive, position:position, rotation:rotation, scale:scale)=>{

        this.sendAction(
            'create-primitive',
            {
                id: objectId,
                primitive: primitive,
                position: position,
                rotation: rotation,
                scale: scale
            }
        );
    }
    importGltf = (source:string):{objectId:number, action:any}=>{
        this.objectId++;
        var action = this.createAction(
            'import-gltf',
            {
                id: this.objectId,
                url: source
            }
        );
        return {
            objectId: this.objectId,
            action: action
        };
    }
    //not usable because cannot set sigle greatness at time
    //we have must set all greatness at time
    updateTransform = (objectId: number, 
                        type: TransformType,
                        greatness: TransformGreatness, 
                        value: position|rotation|scale):{objectId:number, action:any} => {

        let request = { id:objectId, type: type };
        if(greatness === 'position') (request as any)['position'] = value;
        if(greatness === 'rotation') (request as any)['rotation'] = value;
        if(greatness === 'scale') (request as any)['scale'] = value;
        let action = this.createAction(
            'update-transform',
            request
        );
        return {
            objectId: objectId,
            action: action
        }
    }
    setColor = (objectId:number, color:Color):void=>{
        this.sendAction(
            'set-color',            
            {
                id: objectId,
                color: {
                    r: color.r/255,
                    g: color.g/255,
                    b: color.b/255,
                    a: color.a
                }
            });
    }
    playHaptic():void{
        this.sendAction(
            'play-haptic',
            {}
        );
    }
}
export default WebApi;