// Importing the getLayerByName function from CustomFunctions.js
import { getLayerByName } from "./customFunctions";

// Retrieve map data and layers from the map
const map = $('#map').data('map');
const layers = map.getLayers();
const closer = $('#draggable-closer');

// Wait for the document to be fully loaded
$(document).ready(function () {
    // Select draggable elements and set initial configurations
    const layerdiv = $('#draggable');
    const layerDivTitle = $('#draggable-title');
    const layerDivContent = $('#draggable-content');
    layerDivTitle.html('Layers');
    layerDivContent.html('');

    // First, add the "Plots" layer
    layers.forEach(layer => {
        const layerName = layer.get('name');
        if (layerName === 'Plots') {
            addLayerCheckbox(layer, layerDivContent);
        }
    });

    // Then, add all other layers except "OSM" and "Google Satellite"
    layers.forEach(layer => {
        const layerName = layer.get('name');
        if (layerName !== 'OSM' && layerName !== 'Google Satellite' && layerName !== 'Plots') {
            addLayerCheckbox(layer, layerDivContent);
        }
    });

    // Add change event listener to each checkbox
    $('.form-check-input').change(function () {
        const checkbox = this;
        const layerName = $(this).attr('id'); // Use $(this).attr('id') to get the ID
        const layers = map.getLayers().getArray(); // Retrieve all layers from the map
        layers.forEach(layer => {
            if (layer.get('name') && layer.get('name').replace(/[.\s]+/g, '_') === layerName) {
                layer.setVisible(checkbox.checked); // Set the layer to Visible if the checkbox is clicked 
            }
        });
    });

    // Add click event listeners for displaying and closing draggable elements
    $('#layers').click(function () {
        layerdiv.css('display', 'block');
    });

    $('#closer').click(function () {
        $('#draggable').css('display', 'none');
    });
});

// Function to add layer checkbox with legend symbol to the layer div content
function addLayerCheckbox(layer, layerDivContent) {
    const layerName = layer.get('name');
    if (layerName) {
        const id = layerName.replace(/[.\s]+/g, '_'); // Replaces spaces with underscores

        // Get the legend URL or graphic attribute
        const legendUrl = layer.get('graphic');

        // Determine the class for the legend icon based on the layer name
        const iconClass = layerName === 'Map' ? 'map-icon' : 'legend-icon';

        // Create the checkbox and add legend symbol
        const element = `
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="${id}">
                <label class="form-check-label" for="${id}">
                    <img src="${legendUrl}" alt="${layerName} legend" class="${iconClass}"> 
                    ${layerName}
                </label>
            </div>`;
        
        layerDivContent.append(element);
        $(`#${id}`).prop('checked', layer.getVisible());
    }
}

