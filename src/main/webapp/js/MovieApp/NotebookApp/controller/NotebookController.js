Ext.define('MovieApp.NotebookApp.controller.NotebookController', {
    extend: 'Ext.app.Controller',
    init: function () {
        this.control({
        	"notebookviewport treepanel":{
        		itemclick:function(tree,record, item, index, e, eOpts){
        			var id = record.data.id;
        			var tabpanel_main = Ext.getCmp('tabpanel_main');
        			if(id == 'notebook_view'){
        				var panel = Ext.ComponentQuery.query('notebooklistview');
        				if(panel== ''){
        					panel = Ext.widget('notebooklistview',{
        						closable:true
        					});
        					tabpanel_main.add(panel);
        				}else{
        					panel = panel[0];
        				}
        				tabpanel_main.setActiveTab(panel);
        			}else if(id == 'notebook_out'){
        				console.log(id);
        			}else if(id == 'notebook_write'){
        				if(Ext.getCmp('notepad_add')==null){
        					tabpanel_main.add(Ext.create('MovieApp.NotebookApp.view.Notepad',{
        						closable:true
        					}));
        				}
        				tabpanel_main.setActiveTab('notepad_add');
        			}
        		}
        	},
        	'notebookviewport button[id=note_save]':{
        		click:function(btn,e){
        			var form = btn.up('form').getForm();
        			if(!form.isValid()){
        				return;
        			}
        			Ext.Ajax.request({
        				url : "note_add.action",
        				method : "POST",
        				timeout : 10000,
        				params : {
							'note.description' : Ext.getCmp('notepad_editor').getValue(),
							'note.type' : Ext.getCmp('note_type').getValue(),
							'note.weather':Ext.getCmp('note_weather').getValue(),
							'note.mood':Ext.getCmp('note_mood').getValue(),
							'note.notedate':Ext.getCmp('note_date').getValue()
						},
						success : function(response, opts) {
							try {
								var message = Ext.JSON.decode(response.responseText).message;
								if (message == "success") {
									Ext.Msg.alert('成功','日记写入成功!');
									var panel = btn.up('panel');
									panel.saveSuccess=true;
									panel.close();
								}else{								
									Ext.Msg.alert("提示",Ext.JSON.decode(response.responseText).message);
								}
							} catch (e) {
								self.location.href='login.jsp';
							}
						}
        			});
        		}
        	},
        	'notebookviewport form':{
        		beforeclose:function(panel){
        			if('notepad_add'== panel.getId()){
        				if(panel.saveSuccess==true){
        					return true;
        				}
        				var content = panel.getForm().findField('notepad_editor').getValue();
        				var org = '<font face="华文楷体" size="5">写下生活、学习、工作的点点滴滴</font>';
        				if(content === org){}else{
        					Ext.MessageBox.confirm('提示','你的日记没有保存，确认离开吗？',function(optional){
        						if(optional == 'yes'){
        							panel.getForm().reset();
        							panel.close();
        						}
        					},this);
        					return false;
        				}
        			}
        		}
        	},'notebooklistview':{
        		containercontextmenu:function(panel,e,opts){
        			e.stopEvent();
        		},
        		itemcontextmenu:function(dataview, record, item, index, e, eOpts) {
        			e.stopEvent();
        		}
        	}
        });    
    },
    models: [
        'NotebookModel'
	],
    stores: [
        'NotebookStore','NoteListStore'
	],
    views: [
    	"NotebookViewport",'Notepad','NoteBookListView'
	]
});