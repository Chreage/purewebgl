<?php
    $scriptURL=(array_key_exists('debug', $_GET) && $_GET['debug'])?'script.php':'packer/packed/script.js';
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Chreage</title>
        <script type="text/javascript" src="<?php echo $scriptURL; ?>"></script>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link rel="stylesheet" type="text/css" href="style/style.css"/>
    </head>
    <body onload="main()">
        <canvas id="mon_canvas" class="mainCanvas"></canvas>
        <div class="label" id="label"></div>
    </body>
</html>