<?php
include 'writer_options.php';
function copt() {
    //echo plugins_url( '/img/static-c-comixngn_16.ico', __FILE__ );
    add_menu_page('CNGN Options', 'Comix-ngn', 'manage_options', 'cngncore', 'cngncore_settings', plugins_url( '../img/static-c-comixngn_16.ico', __FILE__ ));
    add_submenu_page( 'cngncore', 'Page title', 'Sub-menu title', 'manage_options', 'writer_-1', 'writer_settings');
    $dir = scandir(dirname(__DIR__). '/json');
    for ($i = 0; $i < count($dir); $i++) {
        if(!stristr($dir[$i], ".json")) continue;
        add_submenu_page( 'cngncore', 'Page title', 'Sub-menu title', 'manage_options', 'writer_'+$i, 'writer_settings');
    }
    //call register settings function
	add_action('admin_init','register');
}
add_action('admin_menu', 'copt' );

function register(){
	//register our settings
	register_setting( 'my-cool-plugin-settings-group', 'new_option_name' );
	register_setting( 'my-cool-plugin-settings-group', 'some_other_option' );
	register_setting( 'my-cool-plugin-settings-group', 'option_etc' );
}

function cngncore_settings(){
?>
<div class="wrap">
<h2>Comix-ngn</h2>

<form method="post" action="options.php">
    <?php settings_fields( 'my-cool-plugin-settings-group' ); ?>
    <?php do_settings_sections( 'my-cool-plugin-settings-group' ); ?>
    <table class="form-table">
        <tr valign="top">
        <th scope="row">New Option Name</th>
        <td><input type="text" name="new_option_name" value="<?php echo esc_attr( get_option('new_option_name') ); ?>" /></td>
        </tr>
         
        <tr valign="top">
        <th scope="row">Some Other Option</th>
        <td><input type="text" name="some_other_option" value="<?php echo esc_attr( get_option('some_other_option') ); ?>" /></td>
        </tr>
        
        <tr valign="top">
        <th scope="row">Options, Etc.</th>
        <td><input type="text" name="option_etc" value="<?php echo esc_attr( get_option('option_etc') ); ?>" /></td>
        </tr>
    </table>
    
    <?php submit_button(); ?>

</form>
</div>
<?php }