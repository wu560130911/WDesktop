Ext.define('MovieApp.MovieApp.view.MovieInfo', {
    extend: 'Ext.form.Panel',
    alias : "widget.movieinfo",
    frame: true,
    height: 420,
    width: 659,
    layout: {
        type: 'absolute'
    },
    title: '',
    titleAlign: 'center',
    closeAction:'destroy',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelWidth: 60
            },
            items: [{
                xtype: 'fieldset',
                x: 10,
                y: 0,
                height: 220,
                width: 310,
                defaults: {
                    labelWidth: 60
                },
                layout: {
                    type: 'absolute'
                },
                collapsible: true,
                title: '影片海报',
                items: [{
                    xtype: 'movieimage',
                    x: 0,
                    y: 0,
                    frame: false,
                    height: 185,
                    width: 285,
                    item:[{
                    	src:'video.png'
                    },{
                    	src:'相信未来.png'
                    }]
                }]
            },{
                xtype: 'fieldset',
                x: 0,
                y: 230,
                height: 175,
                width: 640,
                defaults: {
                    labelWidth: 60
                },
                layout: {
                    type: 'absolute'
                },
                collapsible: true,
                title: '影片描述',
                items: [{
                	xtype:'displayfield',
                    x: 0,
                    y: 0,
                    height: 135,
                    width: 615,
                    name:'description'
                 }]
                },{
                    xtype: 'fieldset',
                    x: 340,
                    y: 0,
                    height: 220,
                    width: 300,
                    defaults: {
                    	readOnly: true,
                        labelWidth: 60
                    },
                    layout: {
                        type: 'absolute'
                    },
                    collapsible: true,
                    title: '影片基本信息',
                    items: [{
                       xtype: 'textfield',
                       x: 20,
                       y: 0,
                       width: 250,
                       fieldLabel: '影片名称',
                       readOnly: true,
                       name:'title'
                    },{
                       xtype: 'textfield',
                       x: 20,
                       y: 30,
                       width: 250,
                       fieldLabel: '主演',
                       readOnly: true,
                       name:'actor'
                    },{
                       xtype: 'textfield',
                       x: 20,
                       y: 60,
                       width: 250,
                       fieldLabel: '导演',
                       readOnly: true,
                       name:'author'
                    },{
                       xtype: 'datefield',
                       x: 20,
                       y: 90,
                       width: 250,
                       fieldLabel: '出版时间',
                       readOnly: true,
                       name:'madetime',
                       format:'Y年m月d日'
                    },{
                       xtype: 'textfield',
                       x: 20,
                       y: 120,
                       width: 250,
                       fieldLabel: '影片类型',
                       readOnly: true,
                       name:'type'
                    },{
                       xtype: 'button',
                       x: 130,
                       y: 150,
                       height: 30,
                       width: 70,
                       text: '点播'
                    }]
                }]
        });
        me.callParent(arguments);
    }
});