Ext.define("MovieApp.util.TreeDoActionUtil", {
			doDelete : function(grid, tree) {
				if (!(grid && tree)) {
					alert("参数传递错误");
				}
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
									store.load();
									treeStore=tree.getStore();
									Ext.Array.each(records,function(model){
										var node=treeStore.getNodeById(model.get("id"));
										if(node){
											node.remove(true);
										}
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
			/**
			 * 树形维护表格的插入操作
			 * 
			 * @param {}
			 *            grid
			 * @param {}
			 *            modelObj
			 * @param {}
			 *            treeObj
			 */
			doInsert : function(grid, tree) {
				if (!(grid && tree)) {
					alert("参数传入错误");
					return;
				}
				// 得到表格的集合
				var store = grid.getStore();
				// 得到表格选中的数据
				var records = grid.getSelectionModel().getSelection();
				if (records.length > 1) {
					Ext.Msg.alert("提示", "不能向多个类型中添加，请选择一项类型!");
				} else {
					var typeId = -1;
					if (records.length == 1) {
						typeId = records[0].data.id;
					} else {
						// 向根节点root中添加数据
					}
					Ext.Ajax.request({
								url : store.getProxy().api["insert"],
								params : {
									typeId : typeId
								},
								method : "POST",
								timeout : 4000,
								success : function(response, opts) {
									var modelObj = Ext.JSON
											.decode(response.responseText);
									// 表格添加完成
									var edit = grid.editing;
									// 得到数据模型
									var model = store.model;
									// 初始化一个模型类
									var typeObj = new model(modelObj);
									edit.cancelEdit(); // 取消其他插件的编辑活动
									store.insert(0, typeObj);
									edit.startEditByPosition({
												row : 0,
												column : 2
											});
									// 树形节点添加
									if (typeId == -1) {
										var rootNode = tree.getStore()
												.getRootNode(); // 得到根节点
										rootNode.appendChild({
													id : modelObj["id"],
													text : modelObj["text"],
													leaf : modelObj["leaf"]
												});
									} else {
										var parentNode = tree.getStore()
												.getNodeById(typeId);
										try {
											// 将leaf属性改变
											parentNode.data["leaf"] = false;
											parentNode.updateInfo();
											// 给它加一个孩子节点
											parentNode.appendChild({
														id : modelObj["id"], // id与表格一致
														text : modelObj["text"],
														leaf : modelObj["leaf"]
													});
											parentNode.expand(); // 打开父节点
										} catch (e) {
											alert(e);
										}
									}
								}
							});
				}
			},
			doSave:function(grid,tree){
			if(!grid){
				alert("传入 参数错误");
				return;
			}
			//得到数据集合
			var store=grid.getStore();
			//records  被修改过的数据
			var records=store.getUpdatedRecords();
			//因为只用到data属性，遍历data并存到一个数组中
			var data=new Array();
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
							//修改树形的节点信息
							var treeStore=tree.getStore();
							Ext.Array.each(records,function(model){
								var node=treeStore.getNodeById(model.data.id);
								node.data.text=model.data.name;
								node.updateInfo({text:model.data.name});
							});
							Ext.Msg.alert("提示","修改成功");
						}else{
							Ext.Msg.alert("提示","后台修改失败");
						}
					}
				});	
			}
		}
		});