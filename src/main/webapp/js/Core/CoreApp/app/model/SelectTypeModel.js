/**
 * ClassName 查询字段的实体
 * text : 查询的显示文本
 * value: 查询的字段名
 */
 Ext.define("Core.app.model.SelectTypeModel",{
 	extend:"Ext.data.Model",
 	fields:[
 		{name:"text",type:"string",srotable:true},
 		{name:"value",type:"string",srotable:true}
 	]
 });