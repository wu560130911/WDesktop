Ext.define('MyDesktop.DesktopApp.LockWindow', {
    extend: 'Ext.window.Window',
    alias : "widget.lockwindow",
    draggable: false,
    height: 266,
    hidden: false,
    width: 344,
    layout: {
        type: 'absolute'
    },
    closable: false,
    title: '锁定系统',
    titleAlign: 'center',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textfield',
                    x: 50,
                    y: 60,
                    width: 230,
                    fieldLabel: '锁定密码',
                    labelWidth: 60,
                    name: 'user.password',
                    inputType: 'password',
                    allowBlank: false,
                    blankText: '请输入锁定密码',
                    emptyText: '请输入锁定密码',
                    maxLength: 20,
                    minLength: 5
                },
                {
                    xtype: 'label',
                    x: 30,
                    y: 200,
                    height: 20,
                    html: '<h1><p><font color=\'red\'>注:本密码将作为解锁使用，与登陆密码无关联</font></p></h1>',
                    width: 270,
                    text: ''
                },
                {
                    xtype: 'button',
                    x: 60,
                    y: 130,
                    height: 40,
                    width: 80,
                    text: '确认锁定'
                },
                {
                    xtype: 'button',
                    x: 180,
                    y: 130,
                    height: 40,
                    width: 80,
                    text: '取消锁定',
                    handler:function(btn){
                    	var win = btn.up('lockwindow');
                    	if(win){
                    		win.close();
                    	}
                    }
                }
            ]
        });

        me.callParent(arguments);
    }

});