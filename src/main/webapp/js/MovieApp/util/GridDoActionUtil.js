Ext.define("MovieApp.util.GridDoActionUtil",{
	doDelete:function(grid){
		if(!grid){
			alert("传入 参数错误");
			return;
		}
		//得到数据集合
		var store=grid.getStore();
		//得到选中数据
		var records=grid.getSelectionModel().getSelection();
		var data=[];
		Ext.Array.each(records,function(model){
			data.push(Ext.JSON.encode(model.get("id")));
		});
			if(data.length>0){
				Ext.Ajax.request({
					url:store.getProxy().api["remove"],  //实现低耦合，url不能写固定，因为这个是工具类，需要在store配置api
					params:{ids:""+data.join(",")+""},
					method:"POST",
					timeout:4000,
					success:function(response,opts){
						if(Ext.JSON.decode(response.responseText).message=='success'){
							store.load(function(records, operation, success) {
							});
							Ext.Msg.alert("提示","删除成功！");
						}else{
							Ext.Msg.alert("提示","后台删除失败！");
						}
					}
				});
			}else{
				Ext.Msg.alert("提示","你没有选中数据，不能执行操作！");
			}
	},
	doSave:function(grid){
		if(!grid){
			alert("传入 参数错误");
			return;
		}
		//得到数据集合
		var store=grid.getStore();
		//records  被修改过的数据
		var records=store.getUpdatedRecords();
		//因为只用到data属性，遍历data并存到一个数组中
		var data=[];
		Ext.Array.each(records,function(model){
			//将对象编码成json字符串形式
			data.push(Ext.JSON.encode(model.data));
		});
		if(data.length>0){
			Ext.Ajax.request({
				url:store.getProxy().api["update"],  //实现低耦合，url不能写固定，因为这个是工具类，需要在store配置api
				params:{datas:"["+data.join(",")+"]"},
				method:"POST",
				timeout:4000,
				success:function(response,opts){
					if(Ext.JSON.decode(response.responseText).message=='success'){
						Ext.Array.each(records,function(model){
							//去掉表格修改的小箭头
							model.commit();
						});
						Ext.Msg.alert("提示","修改成功");
					}else{
						Ext.Msg.alert("提示","后台修改失败");
					}
				}
			});
				
		}else{
			Ext.Msg.alert("提示","你没有修改，不能保存!");	
		}
	},
	doInsert:function(grid,modelObj){
		if(!(grid && modelObj)){
			alert("参数传入错误");
			return;
		}
		//得到表格的集合
		var store=grid.getStore();
		//得到目前表格的数据集合长度
		//var storeCount=store.getCount();
		//得到编辑插件
		var edit=grid.editing;
		//得到数据模型
		var model=store.model;
		//初始化一个模型类
		var deptObj=new model(modelObj);
		edit.cancelEdit(); //取消其他插件的编辑活动
			store.insert(0,deptObj);
			edit.startEditByPosition({
				row:0,
				column:2
		});
	}
});