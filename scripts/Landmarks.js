
import { getLandmarkByName } from "./customFunctions";


const map=$('#map').data('map');//map data
const layers=map.getLayers();
const closer=$('#draggable-closer2');//closer

//On page load 
$(document).ready(function() {
  // Select draggable elements and set initial configurations
  const layerdiv=$('#draggable2');
  const layerDivTitle=$('#draggable-title2');
  const layerDivContent=$('#draggable-content2');
  layerDivTitle.html('Landmarks');
  layerDivContent.html('');
  
// Iterate through each layer, create checkboxes, and set initial visibility
  layers.forEach(layer => {
    const layerName = layer.get('name1');
    if(layerName) {
        const id = layerName.replace(/[.\s]+/g, '_'); // Replaces spaces with underscores
        //Checkbox 
        const element = `<div class="form-check">
            <input type="checkbox" class="form-check-input" id="${id}">
            <label class="form-check-label" for="${id}">${layerName}</label>
        </div>`;
        layerDivContent.append(element);
        $(`#${id}`).prop('checked', layer.getVisible());
    }
});


// Add click event listeners for displaying and closing draggable elements
$('.form-check-input').change(function() {
    const checkbox = this;
    const layerName = $(this).attr('id'); // Use $(this).attr('id') to get the ID
    const layers = map.getLayers().getArray(); // Retrieve all layers from the map
    layers.forEach(layer => {
        if (layer.get('name1') && layer.get('name1').replace(/[.\s]+/g, '_') === layerName) {
            // @ts-ignore
            layer.setVisible(checkbox.checked);//Set the layer to Visible if the checkbox is clicked 
        }
    });
});
/*
// Add click event listeners for displaying and closing draggable elements
  //All the landmarks will be dispalyed here by this functionaltiy
  $('#layers_starter').click(function() {
    if (layerdiv.css('display') === 'none') {
      layerdiv.css('display', 'block');
      $('#layers_starter').css('transform', 'rotate(360deg)');
    } else {
      layerdiv.css('display', 'none');
      $('#layers_starter').css('transform', 'rotate(180deg)');
    }
  });

  // Functionality to close the Landmarks List
  $('#draggable-closer2').click(function() {
    layerdiv.css('display', 'none');
    $('#layers_starter').css('transform', 'rotate(180deg)');
  });
  */
});























