# Checklist

AR test Checklist
# Clone Repository

Clone this repository       
# Install

run `npm install` in terminal

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
## Build 

Run `npm run build` for a build and upload with Filezilla

## Customization 

In data folder there is lista.json file, it contain entity that application will render on executing.       
Entity are stored in an array and is like this:    

```javascript
{       
"id":1,         
"nome":"Mother Board",      
"checked":"--",     
"image":"../assets/images/placeholder.png",        
"olograms":[{    
                "ologramId":101,        
                "primitive":"cube",
                "colourable": true,     
                "position": { "x":0.00491, "y":-0.0379, "z":-0.0294},        
                "rotation": { "x":45, "y":0, "z":0},     
                "scale":    { "x":0.5, "y":0.5, "z":0.5}  
                "color":    { "r":255, "g":255, "b":255, "a":1}         
                },  
                {     
                "ologramId":102,        
                "primitive":"sphere",  
                "colourable": false,            
                "position": { "x":0.00491, "y":-0.0379, "z":-0.0294},        
                "rotation": { "x":45, "y":0, "z":0},     
                "scale":    { "x":0.5, "y":0.5, "z":0.5}  
                "color":    { "r":255, "g":255, "b":255, "a":1}         
                }
            ],  
}      
``
        
                   
- Id property must be unique, entity will rendered on id order.       
- In ologram property are stored parameter for entity generation.   
- colourable property is setted to true if can change state like 'checked' or 'missing', otherwise is setted to false
- Ever this file is modified you have to reload application with browser refresh.

For image path, load images in assets/images/folder and link it with path: "../assets/images/imagename.png"      
supported extension for image: all

WARNING
color standar is RGBA so value for red, green and blue is in 0-255 range



