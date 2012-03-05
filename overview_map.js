/**
 * Copyright (c) 2008-2010 The Open Source Geospatial Foundation
 * 
 * Published under the BSD license.
 * See http://svn.geoext.org/core/trunk/geoext/license.txt for the full text
 * of the license.
 */

/**
 * @include GeoExt/widgets/MapPanel.js
 */

/** api: (define)
 *  module = GeoExt
 *  class = OverviewMap
 *  base_link = `Ext.Window <http://dev.sencha.com/deploy/dev/docs/?class=Ext.Window>`_
 */
Ext.namespace("GeoExt");

/** api: example
 *  Sample code to create a popup anchored to a feature:
 * 
 *  .. code-block:: javascript
 *
 *      var popup = new GeoExt.OverviewMap({
 *          title: "My Overview Map",
 *          width: 200,
 *          height: 200,
 *          collapsible: true
 *      });
 */

/** api: constructor
 *  .. class:: OverviewMap(config)
 *
 *      Popups are a specialized Window that supports anchoring
 *      to a particular location in a MapPanel.  When a popup
 *      is anchored to a location, that means that the popup
 *      will visibly point to the location on the map, and move
 *      accordingly when the map is panned or zoomed.
 */
GeoExt.OverviewMap = Ext.extend(Ext.Window, {

    /** api: config[map]
     *  ``OpenLayers.Map`` or :class:`GeoExt.MapPanel`
     *  The map this popup will be anchored to (only required if ``anchored``
     *  is set to true and the map cannot be derived from the ``location``'s
     *  layer.
     */
    map: null,

    /**
     * Some Ext.Window defaults need to be overriden here
     * because some Ext.Window behavior is not currently supported.
     */    

    /** private: config[animCollapse]
     *  ``Boolean`` Animate the transition when the panel is collapsed.
     *  Default is ``false``.  Collapsing animation is not supported yet for
     *  popups.
     */
    animCollapse: false,

    /** private: config[shadow]
     *  ``Boolean`` Give the popup window a shadow.  Defaults to ``false``
     *  because shadows are not supported yet for popups (the shadow does
     *  not look good with the anchor).
     */
    shadow: false,

    /** api: config[popupCls]
     *  ``String`` CSS class name for the popup DOM elements.  Default is
     *  "gx-overview_map".
     */
    popupCls: "gx-overview_map",

    /** api: config[ancCls]
     *  ``String``  CSS class name for the popup's anchor.
     */
    ancCls: null,

    controlOptions: {},

    layer: [],

    width: 200,

    height: 200,


    /** private: method[initComponent]
     *  Initializes the popup.
     */
    initComponent: function() {

        this.build()
        this.omc.div.style.display = 'none'

        Ext.apply(this,
          {
            listeners: {
              scope: this,
              resize: function(e){
                this.width = Ext.Element(e.body.dom).getWidth()
                this.height = Ext.Element(e.body.dom).getHeight()
                this.build()
              }
            }
          }
        )


        GeoExt.OverviewMap.superclass.initComponent.call(this)
    },

    build: function()
      {
        if(this.omc){
          this.map.removeControl(this.omc)
          this.omc.destroy()
        }

        this.controlOptions.layers = [new OpenLayers.Layer.WMS( "OV", this.layer[0], { layers: this.layer[1], wrapDateLine: true })]
        this.omc = new OpenLayers.Control.OverviewMap(this.controlOptions)
        this.omc.size = new OpenLayers.Size(this.width,this.height)
        this.map.addControl(this.omc)
        if(this.contentEl ){
          if(!this.parentNode) this.parentNode = this.contentEl.parentNode
          this.parentNode.removeChild( this.parentNode.firstChild )
          this.parentNode.appendChild( this.omc.div )
        } else {
          this.contentEl = this.omc.div
        }
        this.omc.div.style.position = 'static'
        this.omc.div.firstChild.style.padding = 0
        this.omc.minimizeDiv.style.display = 'none'
      },

    show: function()
      {
        this.omc.div.style.display = 'true'
        if(this.map.size.w != 1){
            var offset = Ext.fly(this.map.div).getBox()
            this.setPosition( offset.x, offset.y )
        }
        GeoExt.OverviewMap.superclass.show.apply( this, arguments )
      },

    setProjection: function(projection)
      {
        this.controlOptions.mapOptions = projection
        if(this.parentNode) this.build()
      },

    /** api: method[setSize]
     *  :param w: ``Integer``
     *  :param h: ``Integer``
     *
     *  Sets the size of the popup, taking into account the size of the anchor.
     */
    //setSize: function(w, h) {
        //GeoExt.OverviewMap.superclass.setSize.call(this, w, h);
        //this.omc.div.style.display = 'block'
        //this.omc.mapDiv.style.height = this.body.getHeight()
        //this.omc.mapDiv.style.width = this.body.getWidth()
        ////this.omc.div.style.display = 'none'
    //},

    /** private: method[beforeDestroy]
     *  Cleanup events before destroying the popup.
     */
    beforeDestroy: function() {
        this.omc.destroy()
        GeoExt.OverviewMap.superclass.beforeDestroy.call(this);
    }
})

/** api: xtype = gx_popup */
Ext.reg('gx-overview_map', GeoExt.OverviewMap)
