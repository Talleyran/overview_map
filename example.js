Ext.onReady(function() {
    Ext.QuickTips.init();

    var map = new OpenLayers.Map()
    var osm = new OpenLayers.Layer.OSM()
    map.addLayers([osm])
    
    var ctrl, toolbarItems = [], action, actions = {};

    // Navigation history - two "button" controls
    ctrl = new OpenLayers.Control.NavigationHistory();
    map.addControl(ctrl);

    action = new GeoExt.Action({
        text: "previous",
        control: ctrl.previous,
        disabled: true,
        tooltip: "previous in history"
    });
    actions["previous"] = action;
    toolbarItems.push(action);

    action = new GeoExt.Action({
        text: "next",
        control: ctrl.next,
        disabled: true,
        tooltip: "next in history"
    });
    actions["next"] = action;
    toolbarItems.push(action);
    toolbarItems.push("->");

    var win = new GeoExt.OverviewMap({
        title: 'Overview Map',
        closable:true,
        width:200,
        height:200,
        map: map
    })

    var mapPanel = new GeoExt.MapPanel({
        renderTo: "mappanel",
        height: 400,
        width: 600,
        map: map,
        center: new OpenLayers.LonLat(5, 45),
        zoom: 4,
        tbar: toolbarItems
    })

})
