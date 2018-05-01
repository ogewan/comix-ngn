<?php
include 'writer_options.php';
$dir = scandir(dirname(__DIR__). '/json');
$cntr = 0;

function copt() {
    global $dir;
    global $cntr;
    //echo plugins_url( '/img/static-c-comixngn_16.ico', __FILE__ );
    add_menu_page('CNGN Options', 'Comix-ngn', 'manage_options', 'cngncore', 'cngncore_settings', plugins_url( '../img/static-c-comixngn_16.ico', __FILE__ ));
    add_submenu_page( 'cngncore', 'Default', 'Default', 'manage_options', 'writer_-1', 'writer_settings');
    for ($i = 0; $i < count($dir); $i++) {
        if(!stristr($dir[$i], ".json")) continue;
        add_submenu_page( 'cngncore', 'Page title', 'Default', 'manage_options', 'writer_'+$i, 'writer_settings');
        $cntr++;
    }
    //call register settings function
	add_action('admin_init','register');
}
add_action('admin_menu', 'copt' );

function register(){
    global $dir;
    global $cntr;
	//register our settings
	register_setting( 'core-group', 'some_other_option' );
    //echo $cntr;
    for ($i = -1; $i < $cntr; $i++) {
        register_setting( 'writer-group', "data_$i" );
    }
}

function cngncore_settings(){
?>
<div class="wrap">
<h2>Comix-ngn</h2>

<form method="post" action="options.php">
    <?php settings_fields( 'core-group' ); ?>
    <?php do_settings_sections( 'core-group' ); ?>
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