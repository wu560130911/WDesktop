var comm = new Ext.util.MixedCollection();
var MainController = null;
comm.add('wallpaper_path', 'js/MyDesktop/wallpapers/blue.jpg');
comm.add('wallpaper_stretch', 'true');
if (localStorage['wallpaper_path'] != null) {
	comm.add('wallpaper_path', localStorage['wallpaper_path']);
}
if (localStorage['wallpaper_stretch'] != null) {
	comm.add('wallpaper_stretch', localStorage['wallpaper_stretch']);
}

if (localStorage['starthelpwindow'] != null) {
	comm.add('starthelpwindow', localStorage['starthelpwindow']);
} else {
	comm.add('starthelpwindow', 'true');
}
comm.add('user_id', sessionStorage['user_id']);
comm.add('user_name', sessionStorage['user_name']);
comm.add('user_creadit', sessionStorage['user_creadit']);