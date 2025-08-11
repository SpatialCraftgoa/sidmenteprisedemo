//Code to get the name of each layer in The Layers list
const map=$('#map').data('map');//map data
const mapLayers=map.getLayers();

 export function getLayerByName(layerName){
    let layer=null;

    mapLayers.forEach(lyr => {
        if(lyr.get('name')===layerName)
        layer=lyr;
    });
    return layer;
}

//Code to get the name of each layer in The Landmarks list
 export function getLandmarkByName(layerName){
    let layer=null;

    mapLayers.forEach(landmark => {
        if(landmark.get('name1')===layerName)
        layer=landmark;
    });
    return layer;
}