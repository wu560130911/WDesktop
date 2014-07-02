
var tiptpl = '名      称：{0}<br/>' +
			  '类      型：{1}<br/>' +
			 '大      小：{2}<br/>' + 
			 '修改时间：{3}<br/>';

var ddtip,view;
Ext.define('MovieApp.PhotoApp.view.PhotoView', {
	extend : 'Ext.view.View',
	store : 'PhotoStore',
	alias : "widget.photoview",
	tpl : [// 设置展示模板
	'<tpl for=".">', '<div class="thumb-wrap" id="{name}">',
			'<div class="upload-progress">0%</div>',
			'<div class="thumb"><img src="{src}"></div>',
			'<span>{name}</span></div>', '</tpl>',
			'<div class="x-clear"></div>' ],
	style : {
		backgroundColor : '#FFFFFF',
		fontFamily : '微软雅黑'
	},
	multiSelect : true,
	trackOver : true,
	overItemCls : 'x-item-over',
	itemSelector : 'div.thumb-wrap',
	emptyText : '没有显示的相片',
	autoScroll : true,
	listeners : {
		'afterrender' : function() {
			// 创建用户拖拽提示
			view = this;
			ddtip = view.el.createChild({
				tag : 'div',
				cls : 'dd-tip',
				html : '请将图片拖动到这里'
			});
			// 创建相片浮动提示
			Ext.create('Ext.tip.ToolTip', {
				target : view.el,
				delegate : view.itemSelector,
				trackMouse : true,
				renderTo : Ext.getBody(),
				anchor : 'right',
				listeners : {
					beforeshow : function(tip) {
						var record = view.getRecord(tip.triggerElement);
						tip.update(Ext.String.format(tiptpl,
								record.get('name'), record.get('type'), record
										.get('size'), Ext.Date.format(record
										.get('lastmod'), 'Y年m月d日 H时i分')));
					}
				}
			});
		}
	}
});

Ext.onReady(function(){
	//给body添加事件，如果有拖拽的话提示用户拖拽到指定区域
	Ext.getBody().on('dragover', function(e) {
				ddtip.show();
			});
	//当用户拖拽离开时隐藏提示信息
	Ext.getBody().on('dragleave', function(e) {
				ddtip.hide();
			});
	//当用户拖拽到指定区域时，隐藏提示信息
	view.el.on('dragenter', function(e) {
				e.stopPropagation();
				e.preventDefault();
				ddtip.hide();
				view.el.highlight();
			});

	//当用户拖拽离开指定区域时显示提示信息
	view.el.on('dragleave', function(e) {
				e.stopPropagation();
				e.preventDefault();
				ddtip.show();
			});

	//很关键！！当用户拖拽文件并放下的时候触发时间
	view.el.dom.ondrop = function(e) {
		e.stopPropagation();
		e.preventDefault();
		ddtip.hide();//隐藏提示信息
		//处理用户拖拽过来的文件
		process(e.dataTransfer.files);
	};
	function process(files) {
		var count = 0;
		for (var i = 0; i < files.length; i++) {
			var file = files[i];//这个一个File对象
			//创建一个相片数据实例，保存名称，大小，类型，修改日期，文件等信息
			var photo = Ext.ModelManager.create({
						name : file.fileName,
						size : file.fileSize,
						type : file.type,
						file : file,
						lastmod : file.lastModifiedDate
					}, PhotoModel);
			//添加到数据源中，这时候容易会发生相应的变化
			store.add(photo);
			//通过FileReader对象获取预览
			var reader = new FileReader();
			//当读取完成之后执行的回调
			reader.onload = (function(p) {
				return function() {
					count++;
					//将获取到的Base64格式的图片数据，存放起来
					p.data.src = this.result;
					if (count == files.length) {
						//当所有图片都加载完了之后，渲染图片
						view.refresh();
					}
				}
			})(photo);//这个地方利用了JS的闭包原理
			//读取图片
			reader.readAsDataURL(file);
		}
	}
	
});